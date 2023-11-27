import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
// @mui
import {
  Avatar,
  MenuItem,
  Card,
  Stack,
  Button,
  Container,
  Typography,
  Tooltip,
} from '@mui/material';
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
// hook
import useResponsive from '../../hooks/useResponsive';
// components
import Iconify from '../../components/iconify';
import ConfirmationDialog from '../../components/dialog/ConfirmationDialog';
import SkeletonProgress from '../../components/custom-progress/SkeletonProgress';
import StyledDataGrid from '../../components/dataGrid/StyledDataGrid';
// service
import { getUserDetails } from '../../services/storage-service';
import { doLogout } from '../../services';
// api
import { deleteUser, getAllUser } from '../../services/api-service/UserController';
import ActionMenu from '../../components/menu/ActionMenu';

export default function UserPage() {

  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [reload, setReload] = useState(false);
  const [userId, setUserId] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [userName, setUserName] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const mobileView = useResponsive('up', 'md');
  const VISIBLE_FIELDS = ['fullName', 'mobileNumber', 'email', 'role', 'Actions'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Admin block
        const data = await getAllUser();
        if (data.length === 0) {
          toast.warn("No Users Found");
        }
        setUsers(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
        setReload(false);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, [reload]);

  const handleAddUser = () => {
    navigate('manage-user');
  }

  const handleEdit = (row) => {
    navigate('manage-user', { state: row });
  }

  const handleDialog = (user) => {
    setUserId({ id: user.id });
    setUserName(user.fullName);
    setOpenDialog(true);
  }

  const handleConfirmation = async (confirmed) => {
    try {
      if (confirmed) {
        setIsLoading(true);
        await deleteUser(userId)
        toast.success("User Deleted Successfully");
        if (getUserDetails().id === userId.id) {
          doLogout();
          navigate('/login');
        }
      }
      setReload(true);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setOpenDialog(false);
      setIsLoading(false);
    }
  };

  const columns = [
    {
      field: 'fullName',
      headerName: 'Name',
      width: 303,
      renderCell: ({ row: { fullName } }) => {
        return (
          <Typography variant="subtitle2" noWrap style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {fullName}
          </Typography>
        );
      },
    },
    { field: 'mobileNumber', headerName: 'Mobile Number', width: 180 },
    { field: 'email', headerName: 'E-mail', width: 180 },
    {
      field: "role",
      headerName: "Role",
      width: 180,
      renderCell: ({ row: { role } }) => {
        return (
          <Stack direction="row" alignItems="center" spacing={1}>
            {role === "ADMIN" && <SecurityOutlinedIcon />}
            {role === "USER" && <PersonRoundedIcon />}
            <Typography variant="subtitle2" noWrap>
              {role}
            </Typography>
          </Stack>
        );
      },
    },
    {
      field: "Actions",
      width: 130,
      renderCell: (params) => {
        return (
          <>
            <MenuItem>
              <Tooltip title="Edit">
                <Iconify icon={'eva:edit-outline'} onClick={() => handleEdit(params.row)} />
              </Tooltip>
            </MenuItem>

            <MenuItem sx={{ color: 'error.main' }}>
              <Tooltip title="Delete">
                <Iconify icon={'eva:trash-2-outline'} onClick={() => handleDialog(params.row)} />
              </Tooltip>
            </MenuItem>
          </>
        )
      }
    }
  ];

  const mobileColumns = [
    {
      field: 'fullName',
      headerName: 'User Details',
      flex: 1, // Use flexGrow to make it responsive
      renderCell: ({ row: { fullName, mobileNumber, email } }) => {
        return (
          <>
            <Stack direction="column" ml={2}>
              <Typography
                variant="subtitle2"
                noWrap
                style={{
                  maxWidth: '100%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {fullName}
                <br />
                {mobileNumber}
                <br />
                {email}
              </Typography>
            </Stack>
          </>
        );
      },
    },
    {
      field: 'Actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params) => {
        return (
          <>
            <Stack ml={3}>
              <ActionMenu
                onClickEdit={() => handleEdit(params.row)}
                onClickDelete={() => handleDialog(params.row)}
                disableView
              />
            </Stack>
          </>
        )
      }
    }
  ];

  const desktopColumns = React.useMemo(
    () => columns.filter((column) => VISIBLE_FIELDS.includes(column.field)),
    [columns],
  );

  return (
    <>
      <Helmet>
        <title> Inspection | User </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Users
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleAddUser}>
            New User
          </Button>
        </Stack>
        {!isLoading ?
          <Card style={{ height: 522, width: '100%' }}>
            <StyledDataGrid
              rows={users}
              columns={mobileView ? desktopColumns : mobileColumns}
              getRowHeight={() => mobileView ? undefined : 100}
              checkboxSelection={mobileView}
            />
          </Card>
          :
          <SkeletonProgress />
        }
        {openDialog && (
          <ConfirmationDialog
            DialogContent={
              <div>
                Pressing 'Yes' will delete&nbsp;
                <Typography variant="subtitle1" display="inline">
                  {userName}
                </Typography>
                . Are you sure you want to proceed?
              </div>
            }
            onClose={handleConfirmation}
          />
        )}
      </Container>
    </>
  );
}

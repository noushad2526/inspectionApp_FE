import { useState, useEffect } from 'react';
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
import MoreTimeIcon from '@mui/icons-material/MoreTime';
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

export default function ManageBookingsPage() {

  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [reload, setReload] = useState(false);
  const [bookingId, setBookingId] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [userName, setUserName] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const mobileView = useResponsive('up', 'md');

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setIsLoading(true);
  //       // Admin block
  //       const data = await getAllUser();
  //       if (data.length === 0) {
  //         toast.warn("No bookings Found");
  //       }
  //       setBookings(data);
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setIsLoading(false);
  //       setReload(false);
  //     }
  //   };
  //   fetchData();
  //   // eslint-disable-next-line
  // }, [reload]);

  const handleAddUser = () => {
    navigate('add-booking');
  }

  const handleEdit = (row) => {
    navigate('edit-booking', { state: row });
  }

  const handleShare = (row) => {
    console.log(row);
  }

  const handleDialog = (user) => {
    // setBookingId({ id: user.id });
    // setUserName(user.fullName);
    setOpenDialog(true);
  }

  const handleConfirmation = async (confirmed) => {
    // try {
    //   if (confirmed) {
    //     setIsLoading(true);
    //     await deleteUser(bookingId)
    //     toast.success("User Deleted Successfully");
    //     if (getUserDetails().id === bookingId.id) {
    //       doLogout();
    //       navigate('/login');
    //     }
    //   }
    // } catch (error) {
    //   console.log(error);
    //   toast.error(error.response.data.message);
    // } finally {
    //   setReload(true);
    //   setOpenDialog(false);
    //   setIsLoading(false);
    // }
    setOpenDialog(false);
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

            <MenuItem sx={{ color: 'info.main' }}>
              <Tooltip title="Share Qr Code">
                <Iconify icon={'eva:paper-plane-outline'} onClick={() => handleShare(params.row)} />
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
                onClickShare={() => handleShare(params.row)}
              />
            </Stack>
          </>
        )
      }
    }
  ];

  return (
    <>
      <Helmet>
        <title> Inspection | Booking </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Manage Booking
          </Typography>
          <Button variant="contained" startIcon={<MoreTimeIcon />} onClick={handleAddUser}>
            New Booking
          </Button>
        </Stack>
        {!isLoading ?
          <Card style={{ height: 522, width: '100%' }}>
            <StyledDataGrid
              rows={bookings}
              columns={mobileView ? columns : mobileColumns}
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

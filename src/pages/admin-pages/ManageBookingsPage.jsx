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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
  Grid,
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
import { getAllBooking } from '../../services/api-service/BookingController';
import GenerateQR from '../../components/invoice/GenerateQR';
import GenerateInvoice from '../../components/invoice/GenerateInvoice';


export default function ManageBookingsPage() {

  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [reload, setReload] = useState(false);
  const [bookingId, setBookingId] = useState();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [userName, setUserName] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const mobileView = useResponsive('up', 'md');

  // view dialog
  const [openView, setOpenView] = useState(false);

  const Transition = React.forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const handleCancel = () => {
    setOpenView(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Admin block
        const data = await getAllBooking();

        if (data.length === 0) {
          toast.warn("No bookings Found");
        }
        setBookings(data);
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
    navigate('add-booking');
  }

  const handleEdit = (row) => {
    navigate('edit-booking', { state: row });
  }

  const handleView = (row) => {
    setOpenView(true);
    setBookingId(row.id);
  }

  const handleDialog = (user) => {
    // setBookingId({ id: user.id });
    // setUserName(user.fullName);
    setOpenDeleteDialog(true);
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
    //   setOpenDeleteDialog(false);
    //   setIsLoading(false);
    // }
    setOpenDeleteDialog(false);
  };

  const columns = [
    { field: 'id', headerName: 'Booking Id', width: 130 },
    { field: 'email', headerName: 'E-mail', width: 250 },
    {
      field: 'inspectionDateAndTime',
      headerName: 'Inspection Scheduled',
      width: 180,
      valueGetter: (params) => {
        const timestamp = params.row.inspectionDateAndTime;
        const formattedDate = new Date(timestamp).toLocaleString(undefined, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        });
        return formattedDate;
      },
    },
    {
      field: "Actions",
      width: 180,
      renderCell: (params) => {
        return (
          <>
            <MenuItem>
              <Tooltip title="Edit">
                <Iconify icon={'eva:edit-outline'} onClick={() => handleEdit(params.row)} />
              </Tooltip>
            </MenuItem>

            <MenuItem sx={{ color: 'info.main' }}>
              <Tooltip title="View Qr Code">
                <Iconify icon={'eva:eye-outline'} onClick={() => handleView(params.row)} />
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
      field: 'email',
      headerName: 'Inspections Details',
      flex: 1,
      renderCell: ({ row: { id, email, inspectionDateAndTime } }) => {
        const formattedDate = new Date(inspectionDateAndTime).toLocaleString(undefined, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        });

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
                {id}
                <br />
                {email}
                <br />
                {formattedDate}
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
                onClickView={() => handleView(params.row)}
              />
            </Stack>
          </>
        );
      },
    },
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
        {openDeleteDialog && (
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
        {openView && <Dialog maxWidth="xs" TransitionComponent={Transition} keepMounted open={openView}>
          <DialogTitle>Booking Id: {bookingId}</DialogTitle>
          <DialogContent dividers >{
            (<>
              <Grid style={{ textAlign: 'center' }}>
                <GenerateQR
                  invoiceDetails={{ bookingId }}
                  disabledGoBack
                  disabledTitle
                />
              </Grid>
            </>)
          }
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel}>Cancel</Button>
          </DialogActions>
        </Dialog>}
      </Container>
    </>
  );
}

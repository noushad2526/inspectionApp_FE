import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// @mui
import { alpha } from '@mui/material/styles';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import { Box, Divider, Typography, Stack, MenuItem, IconButton, Popover } from '@mui/material';
import ConfirmationDialog from '../../../components/dialog/ConfirmationDialog';
// service
import { doLogout } from '../../../services';
import { getTokenDetails, getUserDetails } from '../../../services/storage-service';

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const userRole = getTokenDetails().role;
  const profilePath = userRole ? `/${userRole.toLowerCase()}/profile` : "/home";
  const homePath = userRole ? `/${userRole.toLowerCase()}/home` : "/home";

  // ----------------------------------------------------------------------

  const MENU_OPTIONS = [
    {
      label: 'Home',
      icon: 'eva:home-fill',
      path: homePath,
    },
    {
      label: 'Profile',
      icon: 'eva:person-fill',
      path: profilePath,
    },
  ];

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const user = getUserDetails();

  const handleLogout = () => {
    doLogout();
    navigate('/');
    handleClose();
  };

  const handleConfirmation = (confirmed) => {
    if (confirmed) {
      handleLogout();
    } else {
      setOpenDialog(false);
    }
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[200], 0.8),
            },
          }),
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <ManageAccountsRoundedIcon fontSize='large' />
        </Stack>
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user.fullName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <Link to={option.path} key={option.label} style={{ textDecoration: 'none', color: 'inherit' }}>
              <MenuItem key={option.label} onClick={handleClose}>
                {option.label}
              </MenuItem>
            </Link>
          ))}
        </Stack>
        <Divider sx={{ borderStyle: 'dashed' }} />
        <MenuItem onClick={() => setOpenDialog(true)} sx={{ m: 1 }}>Logout</MenuItem>
      </Popover>
      {openDialog && (
        <ConfirmationDialog
          DialogContent={
            <div>
              Pressing 'Yes' will log you out. Are you sure you want to proceed?
            </div>
          }
          onClose={handleConfirmation}
        />
      )}

    </>
  );
}

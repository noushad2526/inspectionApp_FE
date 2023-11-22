import { useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import { Box, List, ListItemText } from '@mui/material';
import ConfirmationDialog from '../dialog/ConfirmationDialog';
//
import { StyledNavItem, StyledNavItemIcon } from './styles';
import { doLogout } from '../../services';

// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
};

export default function NavSection({ data = [], ...other }) {

  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item) => (
          <NavItem key={item.title} item={item} />
        ))}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
};

function NavItem({ item }) {
  const { title, path, icon, info } = item;
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const handleDialogOpen = () => {
    if (title === "Logout") {
      setOpenDialog(true);
    } else setOpenDialog(false);
  };

  const handleLogout = () => {
    setOpenDialog(false);
    doLogout();
    navigate('/');
  };

  const handleConfirmation = (confirmed) => {
    if (confirmed) {
      handleLogout();
    } else {
      setOpenDialog(false);
    }
  };

  return (
    <div>
      <StyledNavItem
        component={RouterLink}
        onClick={handleDialogOpen}
        to={path}
        sx={
          title !== "Logout"
            ? {
              '&.active': {
                color: 'text.primary',
                bgcolor: 'action.selected',
                fontWeight: 'fontWeightBold',
              },
            }
            : {}
        }
      >
        <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

        <ListItemText disableTypography primary={title} />

        {info && info}
      </StyledNavItem>
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
    </div>
  );
}

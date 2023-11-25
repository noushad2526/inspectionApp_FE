import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// @mui
import { styled, alpha } from '@mui/material/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { Box, Link, Drawer, Typography, Avatar, Stack } from '@mui/material';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// components
import Scrollbar from '../../../components/scrollbar';
import NavSection from '../../../components/nav-section';
//
import { getTokenDetails, getUserDetails } from '../../../services/storage-service';
import { generateNavConfig } from './config';

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1, 1),
  borderRadius: Number(theme.shape.borderRadius) * 1,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

// ----------------------------------------------------------------------

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {

  const { pathname } = useLocation();
  const userRole = getTokenDetails().role;
  const isDesktop = useResponsive('up', 'lg');
  const user = getUserDetails();
  const link = '/';

  const getNavItems = () => {
    const navItems = generateNavConfig();

    if (!isDesktop) {

      let pathh = "";

      if (userRole === "ADMIN") {
        pathh = "/admin/profile";
      } else if (userRole === "USER") {
        pathh = "/user/profile";
      }

      // Push the first item to the beginning of the array
      navItems.splice(1, 0, {
        title: 'Profile',
        path: pathh,
        icon: <AccountCircleIcon />,
      });

      // Push the last item to the end of the array
      navItems.push({
        title: 'Logout',
        icon: <LogoutIcon />,
      });
    }

    return navItems;
  }

  // ----------------------------------------------------------------------

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line
  }, [pathname]);

  // ----------------------------------------------------------------------

  const renderContent = (
    <Scrollbar sx={{ height: 1, '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' }, }}>

      <Box sx={{ mb: 1, mx: 1, mt: 1 }}>
        <Link to={link} underline="none">
          <StyledAccount>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar />
            </Stack>

            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                {user && user.fullName && user.fullName.length > 15
                  ? `${user.fullName.substring(0, 15)}...`
                  : user.fullName}
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {user.role}
              </Typography>
            </Box>
          </StyledAccount>
        </Link>
      </Box>

      <NavSection data={getNavItems()} />
    </Scrollbar>
  );
  // ----------------------------------------------------------------------

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: '#ffff',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
            bgcolor: '#ffff',
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

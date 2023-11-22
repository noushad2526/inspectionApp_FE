// component
import PersonIcon from '@mui/icons-material/Person';
import SpaceDashboardRoundedIcon from '@mui/icons-material/SpaceDashboardRounded';

import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import { getUserDetails } from '../../../services/storage-service';
import { ROLE_ADMIN, ROLE_USER } from '../../../services/constants';

// ----------------------------------------------------------------------

export const generateNavConfig = () => {

  const loggedInUser = getUserDetails();
  const userRole = loggedInUser.role;

  if (userRole === ROLE_ADMIN) {
    return [
      {
        title: 'dashboard',
        path: "/admin/home",
        icon: <SpaceDashboardRoundedIcon />,
      },
      {
        title: 'users',
        path: "/admin/user",
        icon: <PersonIcon />,
      },
      {
        title: 'manage bookings',
        path: "/admin/manage-bookings",
        icon: <ManageHistoryIcon />,
      },
    ];
  }

  if (userRole === ROLE_USER) {
    return [
      {
        title: 'dashboard',
        path: "/user/home",
        icon: <SpaceDashboardRoundedIcon />,
      },
      {
        title: 'manage bookings',
        path: "/user/manage-bookings",
        icon: <ManageHistoryIcon />,
      },
    ];
  }

  return [];
};

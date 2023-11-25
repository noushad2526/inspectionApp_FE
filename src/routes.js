import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import SimpleLayout from './layouts/simple';
import DashboardLayout from './layouts/admin-layout';
// pages
import UserPage from './pages/admin-pages/UserPage';
import LoginPage from './pages/auth-pages/LoginPage';
import Page404 from './pages/global-pages/Page404';
import DashboardAppPage from './pages/admin-pages/DashboardAppPage';
import ManageBookingsPage from './pages/admin-pages/ManageBookingsPage';
// sections
import { UserForm } from './sections/admin-section/user';
import { ProfileForm } from './sections/admin-section/profile/ProfileForm';
import { AddBookingForm, GenerateInvoice } from './sections/admin-section/booking';
import { ChildLayout } from './layouts/child-layout';
// service
import { getUserDetails, isUserPresent } from "./services/storage-service";
// constants
import { ROLE_ADMIN, ROLE_USER } from './services/constants';
import { verifyUser } from './services';
import InvoicePage from './pages/admin-pages/InvoicePage';

// ----------------------------------------------------------------------

export default function Router() {

  // logs in everytime, until user logs out.
  verifyUser();
  //
  const userPresent = isUserPresent();
  const loggedInUser = getUserDetails();
  const userRole = loggedInUser.role;
  const index = userRole ? `/${userRole.toLowerCase()}` : "/login";

  const routes = useRoutes([
    // admin route
    {
      path: '/admin',
      element: userPresent && userRole === ROLE_ADMIN ? (
        <DashboardLayout />
      ) : (
        <Navigate to="/login" replace />

      ),
      children: userPresent && userRole === ROLE_ADMIN ? [
        { element: <Navigate to="/admin/home" />, index: true },
        { path: 'home', element: <DashboardAppPage /> },
        { path: 'profile', element: <ProfileForm /> },
        // admin/user
        {
          path: 'user',
          element: <ChildLayout />,
          children: [
            { path: '', element: <UserPage /> },
            { path: 'manage-user', element: <UserForm /> },
          ]
        },
        // admin/manage-bookings
        {
          path: 'manage-bookings',
          element: <ChildLayout />,
          children: [
            { path: '', element: <ManageBookingsPage /> },
            { path: 'add-booking', element: <AddBookingForm /> },
          ]
        },
      ] : [],
    },

    // user route
    {
      path: '/user',
      element: userPresent && userRole === ROLE_USER ? (
        <DashboardLayout />
      ) : (
        <Navigate to="/login" replace />

      ),
      children: userPresent && userRole === ROLE_USER ? [
        { element: <Navigate to="/user/home" />, index: true },
        { path: 'home', element: <DashboardAppPage /> },
        { path: 'profile', element: <ProfileForm /> },

        // user/manage-bookings
        {
          path: 'manage-bookings',
          element: <ChildLayout />,
          children: [
            { path: '', element: <ManageBookingsPage /> },
            { path: 'add-booking', element: <AddBookingForm /> },
            { path: 'generate-invoice', element: <GenerateInvoice /> }
          ]
        },
      ] : [],
    },

    { path: 'invoice/:bookingId', element: <InvoicePage /> },

    // login route
    {
      path: '/login',
      element: userPresent && userRole ? (
        <Navigate to={index} replace />
      ) : (
        <LoginPage />
      ),
    },

    // mis - spelled route 404 page
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to={index} />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to='/404' /> },
      ],
    },
  ]);

  return routes;
}
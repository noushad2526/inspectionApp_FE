import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
// @mui
import { Grid, Container, Typography, Box, styled } from '@mui/material';
import CorporateFareRoundedIcon from '@mui/icons-material/CorporateFareRounded';
import GridOnRoundedIcon from '@mui/icons-material/GridOnRounded';
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';
import WidgetsRoundedIcon from '@mui/icons-material/WidgetsRounded';
// service
import { getUserDetails } from '../../services/storage-service';
// sections
import { AppWidgetSummary } from '../../sections/admin-section/home';
// componenet
import SkeletonProgress from '../../components/custom-progress/SkeletonProgress';
import { ROLE_ADMIN, ROLE_USER } from '../../services/constants';
import { countOfAllModules } from '../../services/api-service/UserController';
import { countOfBookings } from '../../services/api-service/BookingController';

// -------------------------------------------------------------------------------------------------------------------------------------------------------------

const linkStyle = {
  textDecoration: 'none',
  color: 'inherit',
};

const ResponsiveBox = styled(Box)(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(1, 1fr)',
  gap: '6px',
  '@media (min-width: 600px)': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  '@media (min-width: 960px)': {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
  '@media (min-width: 1280px)': {
    gridTemplateColumns: 'repeat(5, 1fr)',
  },
}));

export default function DashboardAppPage() {

  const loggedInUser = getUserDetails();
  const userRole = loggedInUser.role;
  const loggedInUserRoute = userRole ? userRole.toLowerCase() : "/login";

  const [isLoading, setIsLoading] = useState(false);
  const [cardValues, setCardValues] = useState([]);

  // -------------------------------------------------------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    const fetchData = async () => {

      try {
        setIsLoading(true);
        if (userRole === ROLE_ADMIN) {
          const adminCardValues = await countOfAllModules();
          setCardValues(adminCardValues);
        }
        else if (userRole === ROLE_USER) {
          const userCardValues = await countOfBookings();
          setCardValues(userCardValues);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, []);

  // -------------------------------------------------------------------------------------------------------------------------------------------------------------

  return (
    <>
      <Helmet>
        <title>Inspection | {loggedInUser.role}</title>
      </Helmet>

      <Container maxWidth="xl" sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Hi, Welcome {loggedInUser.fullName}
        </Typography>
        <ResponsiveBox >
          {userRole === ROLE_ADMIN && (
            <Grid item xs={12} sm={6} md={3} ml={2} >
              {!isLoading ? (
                <Link to={`/${loggedInUserRoute}/user`} style={linkStyle}>
                  <AppWidgetSummary
                    title="Users"
                    total={cardValues.users === 0 ? "0" : cardValues.users}
                    color="error"
                    icon={<CorporateFareRoundedIcon width={24} height={24} />}
                  />
                </Link>
              ) :
                (
                  <SkeletonProgress skeletonHeight={240} linearProgressWidth='120px' linearProgressMT="55%" />
                )}
            </Grid>
          )}

          {(userRole === ROLE_ADMIN || userRole === ROLE_USER) && (
            <Grid item xs={12} sm={6} md={3} ml={2} >
              {!isLoading ? (
                <Link to={`/${loggedInUserRoute}/manage-bookings`} style={linkStyle}>
                  <AppWidgetSummary title="Bookings"
                    total={cardValues.bookings === 0 ? "0" : cardValues.bookings}
                    color="info"
                    icon={<GridOnRoundedIcon width={24} height={24} />}
                  />
                </Link>
              ) :
                (
                  <SkeletonProgress skeletonHeight={240} linearProgressWidth='120px' linearProgressMT="55%" />
                )}
            </Grid>
          )}
        </ResponsiveBox>
      </Container>
    </>
  );
}

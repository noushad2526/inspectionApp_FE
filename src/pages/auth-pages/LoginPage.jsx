import { Helmet } from 'react-helmet-async';
import { lazy, useEffect } from 'react';
// @mui
import styled from '@mui/material/styles/styled';
import { Container, Typography, Divider } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';

const LoginForm = lazy(() => import('../../sections/auth-section/LoginForm'));
const Copyright = lazy(() => import('../../components/copyright/CopyRight'));

// ----------------------------------------------------------------------


const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {

  useEffect(() => {

    const disableBack = () => {
      window.history.pushState(null, null, window.location.href);
      window.addEventListener('popstate', disableBack);
    };

    disableBack();

    return () => {
      window.removeEventListener('popstate', disableBack);
    };
  }, []);

  const mdUp = useResponsive('up', 'md');

  return (
    <>
      <Helmet>
        <title> Login | </title>
      </Helmet>

      <StyledRoot>

        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Back
            </Typography>
            <img src={`${process.env.PUBLIC_URL}/assets/illustrations/illustration_login.png`} alt="login" />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Sign In
            </Typography>
            <Divider sx={{ my: 1 }} />

            <LoginForm />

            <style>
              {`
      input[type="password"]::-ms-reveal {
        display: none;
      }
    `}
            </style>

            <Typography component="h1" variant="h2" fontWeight="bold" align='center'>
              <Copyright sx={{ mt: 5, ml: 2 }} />
            </Typography>
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
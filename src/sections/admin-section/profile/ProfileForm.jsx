import { Helmet } from 'react-helmet-async';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { Formik } from "formik";
import { getUserDetails } from '../../../services/storage-service';

export const ProfileForm = () => {
  const user = getUserDetails();

  const handleFormSubmit = (values) => {
    console.log(values);
  }

  return (
    <>
      <Helmet>
        <title> Land | Profile </title>
      </Helmet>
      <Card sx={{ maxWidth: 600, height: 500, margin: '0 auto' }}>
        <CardHeader
          title={
            <Typography variant="h4" align="center" sx={{ fontWeight: 'bold' }}>
              Profile Details
            </Typography>
          }
        />
        <CardContent>
          <Formik
            onSubmit={handleFormSubmit}
          >
            {({ errors, touched, handleChange }) => (
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} sm={3} sx={{ textAlign: 'center', display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ height: "140px", width: "140px", margin: '0 auto' }} />
                </Grid>
                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                  <TextField
                    variant="standard"
                    label="Name"
                    name="Name"
                    value={user.fullName}
                    onChange={handleChange}
                    error={touched.Name && !!errors.Name}
                    helperText={touched.Name && errors.Name}
                    sx={{ width: '70%' }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                  <TextField
                    variant="standard"
                    label="E-mail"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    error={touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                    sx={{ width: '70%' }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                  <TextField
                    variant="standard"
                    label="Mobile Number"
                    name="mobileNumber"
                    value={user.mobileNumber}
                    onChange={handleChange}
                    error={touched.mobileNumber && !!errors.mobileNumber}
                    helperText={touched.mobileNumber && errors.mobileNumber}
                    sx={{ width: '70%' }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>

              </Grid>
            )}
          </Formik>
        </CardContent>
      </Card>
    </>
  );
};


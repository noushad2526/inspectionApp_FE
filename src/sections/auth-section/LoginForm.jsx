import { useNavigate } from 'react-router-dom';
import { lazy, useState } from 'react';
import { toast } from 'react-toastify'
// @mui
import { Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// @mui icons 
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// formik
import { Formik } from "formik";
import * as yup from "yup";
// service
import { saveToken } from '../../services/storage-service'
import { authenticateUser, loginUser } from '../../services/api-service';
import { doLogin } from '../../services';

// -------------------------------------------------------------------------------------------------------------------------------------------------------------

const LoadingLayer = lazy(() => import('../../components/custom-progress/global-progress/LoadingProgress'));

export default function LoginForm() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const initialValues = {
    email: "",
    password: "",
  };

  const handleFormSubmit = async (loginDetails) => {
    setIsLoading(true);
    try {
      const response = await loginUser(loginDetails);
      saveToken(response);
      const userDetails = await authenticateUser({ email: response.email });
      doLogin(userDetails);
      navigate("/");
      toast.success(response.message);
    } catch (error) {
      toast.warn(error.response.data.message);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  // -------------------------------------------------------------------------------------------------------------------------------------------------------------

  return (
    <>
      {isLoading && <LoadingLayer message="Logging In" />}
      <Stack spacing={3}>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema}
        >
          {({
            errors,
            touched,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit} id="logIn">

              <TextField
                required
                autoComplete='true'
                margin="normal"
                fullWidth
                id="email"
                label="Enter Email"
                name="email"
                variant="outlined"
                autoFocus
                onChange={handleChange}
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
              />
              <TextField
                required
                margin="normal"
                fullWidth
                name="password"
                label="Enter Password"
                type={showPassword ? "text" : "password"}
                id="password"
                variant="outlined"
                autoComplete="current-password"
                onChange={handleChange}
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}

                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />

              <LoadingButton fullWidth size="large" type="submit" variant="contained" sx={{ mt: 3 }}>
                Login
              </LoadingButton>
            </form>
          )}
        </Formik>
      </Stack>
    </>
  );
}

// -------------------------------------------------------------------------------------------------------------------------------------------------------------

const checkoutSchema = yup.object().shape({
  email: yup.string().required("required"),
  password: yup.string().required("required"),
});
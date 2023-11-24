import { toast } from "react-toastify";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// @mui
import {
    Card,
    Stack,
    InputAdornment,
    IconButton,
    Container,
    Typography,
    Box,
    Button,
    TextField,
    useMediaQuery,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PersonIcon from '@mui/icons-material/Person';
// formIk
import { Formik } from "formik";
import * as yup from "yup";
import { registerUser, updateUser } from "../../../services/api-service";
import LoadingLayer from "../../../components/custom-progress/global-progress/LoadingProgress";
import { ROLE_ADMIN, ROLE_USER } from "../../../services/constants";

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------

const role = [
    { role: ROLE_ADMIN, label: 'Admin' },
    { role: ROLE_USER, label: 'User' }
]

const StyledTypography = styled(Typography)(() => ({
    margin: "25px",
    fontSize: "1.2rem",
    backgroundColor: "rgb(145, 158, 171, 0.16)",
    padding: "10px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
}));

export default function UserForm() {

    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    const location = useLocation();

    const userData = location.state || false;
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------

    const isUpdateUser = () => {
        if (userData) return true;
        return false;
    }

    const initialValues = {
        id: userData.id || "",
        fullName: userData.fullName || "",
        email: userData.email || "",
        mobileNumber: userData.mobileNumber || "",
        role: userData.role || "",
        password: userData.password || "",
    };

    // modify request to make api call
    const getUserRequest = (formDetails) => {

        // removing unwanted variable for request
        if (!isUpdateUser()) delete formDetails.id;

        // validation for form values and existing values
        if (isUpdateUser() && !validateValues(formDetails)) return null;
        return formDetails;
    };

    // validation for update
    const validateValues = (formValues) => {
        if (
            initialValues.fullName === formValues.fullName
            && initialValues.mobileNumber === formValues.mobileNumber
            && initialValues.password === formValues.password
        ) {
            toast.warn("Nothing to Update")
            return false;
        }
        return true;
    }

    const handleFormSubmit = async (formDetails) => {

        //
        const userDetails = getUserRequest(formDetails);

        // api call
        try {
            if (userDetails.error) {
                toast.error(userDetails.error);
            } else {
                setIsLoading(true);
                // register user
                if (!isUpdateUser()) {
                    const userRegisterResponse = await registerUser(userDetails);
                    toast.success(userRegisterResponse.message);
                    // update user          
                } else if (isUpdateUser()) {
                    await updateUser(userDetails);
                    toast.success("User updated Successfully");
                }
                document.getElementById("userForm").reset(initialValues);
                navigate(-1);
            }
        } catch (error) {
            toast.warn(error.response.data.message);
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };



    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------

    return (
        <>
            {isLoading && <LoadingLayer message={isUpdateUser() ? "Updaing User " : "Registering User"} />}
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        {isUpdateUser() ? "Update User " : "Register User"}
                    </Typography>
                </Stack>
                <Stack spacing={3}>
                    <Formik
                        onSubmit={handleFormSubmit}
                        initialValues={initialValues}
                        validationSchema={isUpdateUser() ? updateValidation : createValidation}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                        }) => {
                            return (
                                <form onSubmit={handleSubmit} id="userForm">
                                    <Card>
                                        <StyledTypography variant="subtitle2" ><PersonIcon sx={{ marginRight: "8px" }} />Account Details</StyledTypography>
                                        <Box
                                            display="grid"
                                            gap="30px"
                                            gridTemplateColumns="repeat(3, minmax(0, 1fr))"
                                            sx={{
                                                "& > div": { gridColumn: isNonMobile ? undefined : "span 3" },
                                                margin: "25px",
                                            }}
                                        >
                                            <TextField
                                                required
                                                fullWidth
                                                variant="outlined"
                                                size="small"
                                                type="text"
                                                id="fullName"
                                                label="Full Name"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                name="fullName"
                                                value={values.fullName}
                                                error={!!touched.fullName && !!errors.fullName}
                                                helperText={touched.fullName && errors.fullName}
                                                sx={{ gridColumn: "span 1" }}
                                            />
                                            <TextField
                                                required
                                                fullWidth
                                                disabled={isUpdateUser()}
                                                autoComplete='true'
                                                variant="outlined"
                                                size="small"
                                                type="text"
                                                id="email"
                                                label="Email"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                name="email"
                                                value={values.email}
                                                error={!!touched.email && !!errors.email}
                                                helperText={touched.email && errors.email}
                                                sx={{ gridColumn: "span 1" }}
                                            />
                                            <TextField
                                                fullWidth
                                                required
                                                variant="outlined"
                                                size="small"
                                                type="text"
                                                id="mobileNumber"
                                                label="Mobile Number"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                name="mobileNumber"
                                                value={values.mobileNumber}
                                                error={!!touched.mobileNumber && !!errors.mobileNumber}
                                                helperText={touched.mobileNumber && errors.mobileNumber}
                                                sx={{ gridColumn: "span 1" }}
                                            />
                                            <FormControl variant="outlined" sx={{ gridColumn: "span 1" }} size="small">
                                                <InputLabel
                                                    sx={{ color: touched.role && errors.role ? 'red' : '' }}
                                                    id="role">
                                                    Select Role
                                                </InputLabel>
                                                <Select
                                                    fullWidth
                                                    required
                                                    disabled={isUpdateUser()}
                                                    labelId="role"
                                                    label="Select Role"
                                                    id="role"
                                                    onBlur={handleBlur}
                                                    onChange={(e) => { handleChange(e) }}
                                                    name="role"
                                                    value={values.role}
                                                    error={!!touched.role && !!errors.role}
                                                >
                                                    <MenuItem value="">
                                                        <em>None</em>
                                                    </MenuItem>
                                                    {role.map((option) => (
                                                        <MenuItem key={option.role} value={option.role}>
                                                            {option.label}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                                {touched.role && errors.role && (
                                                    <FormHelperText sx={{ color: 'red' }}>{errors.role}</FormHelperText>
                                                )}
                                            </FormControl>
                                            <TextField
                                                fullWidth
                                                required
                                                name="password"
                                                label="Password"
                                                type={showPassword ? "text" : "password"}
                                                id="password"
                                                variant="outlined"
                                                size="small"
                                                autoComplete="current-password"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.password}
                                                error={!!touched.password && !!errors.password}
                                                helperText={touched.password && errors.password}
                                                sx={{ gridColumn: "span 1" }}
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
                                        </Box>

                                    </Card>
                                    <Box display="flex" justifyContent="end" mt="20px">
                                        <Button type="submit" color="secondary" variant="contained">
                                            {isUpdateUser() ? "Update User " : "Register User"}
                                        </Button>
                                    </Box>

                                </form>
                            );
                        }}
                    </Formik>
                </Stack>
            </Container>
        </>
    );
};
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------
const phoneRegExp = "[6-9]{1}[0-9]{9}";
const NameRegex = "^[a-zA-Z]{2,40} [a-zA-Z]{2,40}$";
const EmailRegex = /^[a-zA-Z0-9]+([._%+-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;;

const updateValidation = yup.object().shape({
    fullName: yup.string().required("required").matches(NameRegex, "Name length is longer or contains invalid characters"),
    email: yup.string().email("invalid email").required("required").matches(EmailRegex, "Email is not valid"),
    mobileNumber: yup
        .string()
        .matches(phoneRegExp, "Phone number is not valid")
        .length(10, "Mobile number must be 10 digits long")
        .required("required"),
    role: yup.string()
        .required("Please Select Role"),
});

const createValidation = updateValidation.concat(
    yup.object().shape({
        password: yup.string()
            .required("required")
            .min(8, "Minimum length of 8 is required")
            .max(12, "Maximum length of 12 is required")
            .matches(/[a-zA-Z]/, "Must contain alphabet")
            .matches(/\d/, "Must contain a digit")
            .matches(/[!@#$%^&*]/, "Must contain a special character"),
    })
);
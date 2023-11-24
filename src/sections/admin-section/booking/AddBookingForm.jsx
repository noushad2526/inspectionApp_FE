import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// @mui
import {
    Card,
    Stack,
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
    ToggleButtonGroup,
    ToggleButton,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import DirectionsCarRoundedIcon from '@mui/icons-material/DirectionsCarRounded';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
// formIk
import { Formik } from "formik";
import * as yup from "yup";
import { registerUser, updateUser } from "../../../services/api-service";
import LoadingLayer from "../../../components/custom-progress/global-progress/LoadingProgress";
import { MenuProps, registrationCountry } from "./Data";

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------

const StyledTypography = styled(Typography)(() => ({
    margin: "25px",
    fontSize: "1.2rem",
    backgroundColor: "rgb(145, 158, 171, 0.16)",
    padding: "10px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
}));

export default function AddBookingForm() {

    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [isRegisteredVehicle, setIsRegisteredVehicle] = useState(true);

    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------

    const initialValues = {
        // personal information
        name: "",
        email: "",
        mobileNumber: "",
        // vehicale information
        registeredVhicle: true,
        registrationCountry: "",
        plateNumber: "",
        certificateNumber: "", // only for unregistere vehicle

    };

    // modify request to make api call
    const getBookingRequest = (formDetails) => {
        return formDetails;
    };

    const handleFormSubmit = async (formDetails) => {
        //
        const bookingDetails = getBookingRequest(formDetails);

        console.log(bookingDetails);

        // // api call
        // try {
        //     if (userDetails.error) {
        //         toast.error(userDetails.error);
        //     } else {
        //         setIsLoading(true);
        //         // register user
        //         if (!isUpdateUser()) {
        //             const userRegisterResponse = await registerUser(userDetails);
        //             toast.success(userRegisterResponse.message);
        //             // update user          
        //         } else if (isUpdateUser()) {
        //             await updateUser(userDetails);
        //             toast.success("User updated Successfully");
        //         }
        //         document.getElementById("bookingForm").reset(initialValues);
        //         navigate(-1);
        //     }
        // } catch (error) {
        //     toast.warn(error.response.data.message);
        //     console.log(error);
        // } finally {
        //     setIsLoading(false);
        // }
    };

    const handleLicenseStatus = (event, registeredVehicle) => {
        setIsRegisteredVehicle(registeredVehicle);
    };

    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------

    return (
        <>
            {isLoading && <LoadingLayer message={"Scheduling Booking"} />}
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Schedule Booking
                    </Typography>
                </Stack>
                <Stack spacing={3}>
                    <Formik
                        onSubmit={handleFormSubmit}
                        initialValues={initialValues}
                        validationSchema={checkoutSchema}
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
                                <form onSubmit={handleSubmit} id="bookingForm">
                                    <Card>
                                        <StyledTypography variant="subtitle2" ><PersonIcon sx={{ marginRight: "8px" }} />Personal Information</StyledTypography>
                                        <Box
                                            display="grid"
                                            gap="25px"
                                            gridTemplateColumns="repeat(3, minmax(0, 1fr))"
                                            sx={{
                                                "& > div": { gridColumn: isNonMobile ? undefined : "span 3" },
                                                margin: "25px",
                                            }}
                                        >
                                            <TextField
                                                required
                                                fullWidth
                                                size="small"
                                                variant="outlined"
                                                type="text"
                                                id="fullName"
                                                label="Name"
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
                                                size="small"
                                                autoComplete='true'
                                                variant="outlined"
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
                                                size="small"
                                                required
                                                variant="outlined"
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
                                        </Box>
                                        {/* Vehicle Information */}
                                        <StyledTypography variant="subtitle2" ><DirectionsCarRoundedIcon sx={{ marginRight: "8px" }} />Vehicle Information</StyledTypography>
                                        <Box sx={{ margin: "25px" }}>
                                            <Typography variant="subtitle1" marginLeft={1} >License Status*</Typography>
                                            <ToggleButtonGroup
                                                color="success"
                                                value={isRegisteredVehicle}
                                                exclusive
                                                onChange={handleLicenseStatus}
                                                aria-label="Platform"
                                            >
                                                {/* eslint-disable-next-line */}
                                                <ToggleButton sx={{ borderRadius: '8px' }} value={true}>Registered Vehicle</ToggleButton>
                                                <ToggleButton sx={{ borderRadius: '8px' }} value={false}>Unregistered Vehicle</ToggleButton>
                                            </ToggleButtonGroup>
                                        </Box>
                                        <Box
                                            display="grid"
                                            gap="25px"
                                            gridTemplateColumns="repeat(3, minmax(0, 1fr))"
                                            sx={{
                                                "& > div": { gridColumn: isNonMobile ? undefined : "span 3" },
                                                margin: "25px",
                                            }}
                                        >
                                            {isRegisteredVehicle &&
                                                <>
                                                    <FormControl variant="outlined" sx={{ gridColumn: "span 1" }} size="small">
                                                        <InputLabel
                                                            sx={{ color: touched.registrationCountry && errors.registrationCountry ? 'red' : '' }}
                                                            id="registrationCountry">
                                                            Registration Country
                                                        </InputLabel>
                                                        <Select
                                                            fullWidth
                                                            required
                                                            labelId="registrationCountry"
                                                            label="Registration Country"
                                                            id="registrationCountry"
                                                            onBlur={handleBlur}
                                                            onChange={(e) => { handleChange(e) }}
                                                            name="registrationCountry"
                                                            value={values.registrationCountry}
                                                            error={!!touched.registrationCountry && !!errors.registrationCountry}
                                                            MenuProps={MenuProps}
                                                        >
                                                            <MenuItem value="">
                                                                <em>None</em>
                                                            </MenuItem>
                                                            {registrationCountry.map((option) => (
                                                                <MenuItem key={option.value} value={option.value}>
                                                                    {option.value}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                        {touched.registrationCountry && errors.registrationCountry && (
                                                            <FormHelperText sx={{ color: 'red' }}>{errors.registrationCountry}</FormHelperText>
                                                        )}
                                                    </FormControl>
                                                    <TextField
                                                        fullWidth
                                                        size="small"
                                                        required
                                                        variant="outlined"
                                                        type="text"
                                                        id="plateNumber"
                                                        label="Plate Number"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        name="plateNumber"
                                                        value={values.plateNumber}
                                                        error={!!touched.plateNumber && !!errors.plateNumber}
                                                        helperText={touched.plateNumber && errors.plateNumber}
                                                        sx={{ gridColumn: "span 1" }}
                                                    />
                                                </>
                                            }
                                            {!isRegisteredVehicle &&
                                                <TextField
                                                    fullWidth
                                                    size="small"
                                                    required
                                                    variant="outlined"
                                                    type="text"
                                                    id="certificateNumber"
                                                    label="Custom Certificate Number"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    name="certificateNumber"
                                                    value={values.certificateNumber}
                                                    error={!!touched.certificateNumber && !!errors.certificateNumber}
                                                    helperText={touched.certificateNumber && errors.certificateNumber}
                                                    sx={{ gridColumn: "span 1" }}
                                                />
                                            }
                                        </Box>
                                        <StyledTypography variant="subtitle2" ><MoreTimeIcon sx={{ marginRight: "8px" }} />Inspection Time</StyledTypography>
                                        <Box
                                            display="grid"
                                            gap="25px"
                                            gridTemplateColumns="repeat(3, minmax(0, 1fr))"
                                            sx={{
                                                "& > div": { gridColumn: isNonMobile ? undefined : "span 3" },
                                                margin: "25px",
                                            }}
                                        >
                                            <TextField
                                                fullWidth
                                                size="small"
                                                required
                                                variant="outlined"
                                                type="text"
                                                id="certificateNumber"
                                                label="Custom Certificate Number"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                name="certificateNumber"
                                                value={values.certificateNumber}
                                                error={!!touched.certificateNumber && !!errors.certificateNumber}
                                                helperText={touched.certificateNumber && errors.certificateNumber}
                                                sx={{ gridColumn: "span 1" }}
                                            />
                                        </Box>
                                        <StyledTypography variant="subtitle2" ><CarRepairIcon sx={{ marginRight: "8px" }} />Service Center</StyledTypography>
                                        <Box
                                            display="grid"
                                            gap="25px"
                                            gridTemplateColumns="repeat(3, minmax(0, 1fr))"
                                            sx={{
                                                "& > div": { gridColumn: isNonMobile ? undefined : "span 3" },
                                                margin: "25px",
                                            }}
                                        >
                                            <FormControl variant="outlined" sx={{ gridColumn: "span 1" }} size="small">
                                                <InputLabel
                                                    sx={{ color: touched.registrationCountry && errors.registrationCountry ? 'red' : '' }}
                                                    id="registrationCountry">
                                                    Registration Country
                                                </InputLabel>
                                                <Select
                                                    fullWidth
                                                    required
                                                    labelId="registrationCountry"
                                                    label="Registration Country"
                                                    id="registrationCountry"
                                                    onBlur={handleBlur}
                                                    onChange={(e) => { handleChange(e) }}
                                                    name="registrationCountry"
                                                    value={values.registrationCountry}
                                                    error={!!touched.registrationCountry && !!errors.registrationCountry}
                                                    MenuProps={MenuProps}
                                                >
                                                    <MenuItem value="">
                                                        <em>None</em>
                                                    </MenuItem>
                                                    {registrationCountry.map((option) => (
                                                        <MenuItem key={option.value} value={option.value}>
                                                            {option.value}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                                {touched.registrationCountry && errors.registrationCountry && (
                                                    <FormHelperText sx={{ color: 'red' }}>{errors.registrationCountry}</FormHelperText>
                                                )}
                                            </FormControl>
                                            <FormControl variant="outlined" sx={{ gridColumn: "span 1" }} size="small">
                                                <InputLabel
                                                    sx={{ color: touched.registrationCountry && errors.registrationCountry ? 'red' : '' }}
                                                    id="registrationCountry">
                                                    Registration Country
                                                </InputLabel>
                                                <Select
                                                    fullWidth
                                                    required
                                                    labelId="registrationCountry"
                                                    label="Registration Country"
                                                    id="registrationCountry"
                                                    onBlur={handleBlur}
                                                    onChange={(e) => { handleChange(e) }}
                                                    name="registrationCountry"
                                                    value={values.registrationCountry}
                                                    error={!!touched.registrationCountry && !!errors.registrationCountry}
                                                    MenuProps={MenuProps}
                                                >
                                                    <MenuItem value="">
                                                        <em>None</em>
                                                    </MenuItem>
                                                    {registrationCountry.map((option) => (
                                                        <MenuItem key={option.value} value={option.value}>
                                                            {option.value}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                                {touched.registrationCountry && errors.registrationCountry && (
                                                    <FormHelperText sx={{ color: 'red' }}>{errors.registrationCountry}</FormHelperText>
                                                )}
                                            </FormControl>
                                            <FormControl variant="outlined" sx={{ gridColumn: "span 1" }} size="small">
                                                <InputLabel
                                                    sx={{ color: touched.registrationCountry && errors.registrationCountry ? 'red' : '' }}
                                                    id="registrationCountry">
                                                    Registration Country
                                                </InputLabel>
                                                <Select
                                                    fullWidth
                                                    required
                                                    labelId="registrationCountry"
                                                    label="Registration Country"
                                                    id="registrationCountry"
                                                    onBlur={handleBlur}
                                                    onChange={(e) => { handleChange(e) }}
                                                    name="registrationCountry"
                                                    value={values.registrationCountry}
                                                    error={!!touched.registrationCountry && !!errors.registrationCountry}
                                                    MenuProps={MenuProps}
                                                >
                                                    <MenuItem value="">
                                                        <em>None</em>
                                                    </MenuItem>
                                                    {registrationCountry.map((option) => (
                                                        <MenuItem key={option.value} value={option.value}>
                                                            {option.value}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                                {touched.registrationCountry && errors.registrationCountry && (
                                                    <FormHelperText sx={{ color: 'red' }}>{errors.registrationCountry}</FormHelperText>
                                                )}
                                            </FormControl>
                                            <FormControl variant="outlined" sx={{ gridColumn: "span 1" }} size="small">
                                                <InputLabel
                                                    sx={{ color: touched.registrationCountry && errors.registrationCountry ? 'red' : '' }}
                                                    id="registrationCountry">
                                                    Registration Country
                                                </InputLabel>
                                                <Select
                                                    fullWidth
                                                    required
                                                    labelId="registrationCountry"
                                                    label="Registration Country"
                                                    id="registrationCountry"
                                                    onBlur={handleBlur}
                                                    onChange={(e) => { handleChange(e) }}
                                                    name="registrationCountry"
                                                    value={values.registrationCountry}
                                                    error={!!touched.registrationCountry && !!errors.registrationCountry}
                                                    MenuProps={MenuProps}
                                                >
                                                    <MenuItem value="">
                                                        <em>None</em>
                                                    </MenuItem>
                                                    {registrationCountry.map((option) => (
                                                        <MenuItem key={option.value} value={option.value}>
                                                            {option.value}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                                {touched.registrationCountry && errors.registrationCountry && (
                                                    <FormHelperText sx={{ color: 'red' }}>{errors.registrationCountry}</FormHelperText>
                                                )}
                                            </FormControl>
                                        </Box>
                                    </Card>
                                    <Box display="flex" justifyContent="end" mt="20px">
                                        <Button type="submit" color="secondary" variant="contained">
                                            Submit
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

const checkoutSchema = yup.object().shape({
    fullName: yup.string().required("required").matches(NameRegex, "Name length is longer or contains invalid characters"),
    email: yup.string().email("invalid email").required("required").matches(EmailRegex, "Email is not valid"),
    mobileNumber: yup
        .string()
        .matches(phoneRegExp, "Phone number is not valid")
        .length(10, "Mobile number must be 10 digits long")
        .required("required"),
    registrationCountry: yup.string()
        .required("Please Select registrationCountry"),
});

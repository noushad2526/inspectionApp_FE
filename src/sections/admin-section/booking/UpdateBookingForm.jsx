import { toast } from "react-toastify";
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
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
// datepicker
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
// formIk
import { Formik } from "formik";
import * as yup from "yup";
//
import { updateBooking, updateUser } from "../../../services/api-service";
import LoadingLayer from "../../../components/custom-progress/global-progress/LoadingProgress";
import { MenuProps, inspectionServiceType, registrationCountry, registrationType } from "./Data";

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

export default function UpdateBookingForm() {

    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    const location = useLocation();
    const bookingData = location.state;

    const [isLoading, setIsLoading] = useState(false);
    const [reload, setReload] = useState(false);

    const [isRegisteredVehicle, setIsRegisteredVehicle] = useState(bookingData.registeredVehicle);
    const [inspectionTime, setInspectionTime] = useState(dayjs(bookingData.inspectionDateAndTime));

    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------

    useEffect(() => {
        console.log(bookingData);
      }, []);

    const initialValues = {
        // personal information
        id: bookingData.id,
        fullName: bookingData.fullName,
        email: bookingData.email,
        mobileNumber: bookingData.mobileNumber,
        // vehicale information
        registeredVehicle: bookingData.isRegisteredVehicle,
        registrationCountry: bookingData?.registrationCountry || "Saudi Arabia",
        plateNumber: bookingData?.plateNumber || "",
        registrationType: bookingData?.registrationType || "Private Vehicle",
        certificateNumber: bookingData?.certificateNumber || "",
        // inspection time
        inspectionDateAndTime: inspectionTime,
        // service center
        vehicleType: "Private Vehicle",
        inspectionServiceType: bookingData.inspectionServiceType,
        region: "Riyadh",
        inspectionCenter: "Sahara Inspection Center"
    };

    // modify request to make api call
    const getBookingRequest = (formDetails) => {
        if (isRegisteredVehicle) {
            formDetails.registeredVehicle = true;
            delete formDetails.certificateNumber;
        } else {
            formDetails.registeredVehicle = false;
            delete formDetails.registrationCountry;
            delete formDetails.plateNumber;
            delete formDetails.registrationType;
        }
        const inspectionDate = dayjs(formDetails.inspectionDateAndTime);

        // Now you can format it
        const formattedDate = inspectionDate.format('ddd MMM D YYYY HH:mm:ss [GMT]ZZ (IST)');
        formDetails.inspectionDateAndTime = formattedDate;
        if (!validateValues(formDetails)) return null;
        return formDetails;
    };

    // validation for update
    const validateValues = (formValues) => {
        if (registeredVehicleSchema) {
            if (
                initialValues.fullName === formValues.fullName
                && initialValues.mobileNumber === formValues.mobileNumber
                && initialValues.registeredVehicle === formValues.registeredVehicle
                && initialValues.registrationCountry === formValues.registeredVehicle
                && initialValues.plateNumber === formValues.plateNumber
                && initialValues.registrationType === formValues.registrationType
                // && dayjs(initialValues.inspectionDateAndTime) === dayjs(formValues.inspectionDateAndTime)
                && initialValues.inspectionServiceType === formValues.inspectionServiceType
            ) {
                toast.warn("Nothing to Update")
                return false;
            }
        } else if (
            initialValues.fullName === formValues.fullName
            && initialValues.mobileNumber === formValues.mobileNumber
            && initialValues.registeredVehicle === formValues.registeredVehicle
            && initialValues.plateNumber === formValues.plateNumber
            // && dayjs(initialValues.inspectionDateAndTime) === dayjs(formValues.inspectionDateAndTime)
            && initialValues.inspectionServiceType === formValues.inspectionServiceType
        ) {
            toast.warn("Nothing to Update")
            return false;
        }

        return true;
    }

    const handleFormSubmit = async (formDetails) => {
        //
        const bookingDetails = getBookingRequest(formDetails);

        console.log(bookingDetails);

        // api call
        try {
            if (bookingDetails.error) {
                toast.error(bookingDetails.error);
            } else {
                setIsLoading(true);
                // register user
                const scheduleBookingResponse = await updateBooking(bookingDetails);
                console.log(scheduleBookingResponse);
                toast.success(scheduleBookingResponse.message);
                document.getElementById("bookingForm").reset(initialValues);
                navigate(-1);
            }
        } catch (error) {
            toast.warn(error.response.data.message);
            console.log(error);
        } finally {
            setIsLoading(false);
        }
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
                        Update Booking
                    </Typography>
                </Stack>
                <Stack spacing={3}>
                    <Formik
                        onSubmit={handleFormSubmit}
                        initialValues={initialValues}
                        validationSchema={isRegisteredVehicle ? registeredVehicleSchema : unregisteredVehicleSchema}
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
                                                disabled
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
                                                    <FormControl variant="outlined" sx={{ gridColumn: "span 1" }} size="small">
                                                        <InputLabel
                                                            sx={{ color: touched.registrationType && errors.registrationType ? 'red' : '' }}
                                                            id="registrationType">
                                                            Registration Type
                                                        </InputLabel>
                                                        <Select
                                                            fullWidth
                                                            required
                                                            labelId="registrationType"
                                                            label="Registration Type"
                                                            id="registrationType"
                                                            onBlur={handleBlur}
                                                            onChange={(e) => { handleChange(e) }}
                                                            name="registrationType"
                                                            value={values.registrationType}
                                                            error={!!touched.registrationType && !!errors.registrationType}
                                                            MenuProps={MenuProps}
                                                        >
                                                            <MenuItem value="">
                                                                <em>None</em>
                                                            </MenuItem>
                                                            {registrationType.map((option) => (
                                                                <MenuItem key={option.value} value={option.value}>
                                                                    {option.value}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                        {touched.registrationType && errors.registrationType && (
                                                            <FormHelperText sx={{ color: 'red' }}>{errors.registrationType}</FormHelperText>
                                                        )}
                                                    </FormControl>
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
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DemoContainer components={['MobileDateTimePicker']}>
                                                    <MobileDateTimePicker
                                                        label="Inspection Date and Time"
                                                        value={inspectionTime}
                                                        name="inspectionDateAndTime"
                                                        onBlur={handleBlur}
                                                        onChange={(date) => setInspectionTime(date)}
                                                        // format="DD MM YYYY HH:mm A"
                                                        disablePast
                                                        error={!!touched.inspectionDateAndTime && !!errors.inspectionDateAndTime}
                                                        helperText={touched.inspectionDateAndTime && errors.inspectionDateAndTime}
                                                    />
                                                </DemoContainer>
                                            </LocalizationProvider>
                                        </Box>
                                        {/* Service Center */}
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
                                                    id="vehicleType">
                                                    Vehicle Type
                                                </InputLabel>
                                                <Select
                                                    fullWidth
                                                    required
                                                    disabled
                                                    labelId="vehicleType"
                                                    label="Vehicle Type"
                                                    id="vehicleType"
                                                    onBlur={handleBlur}
                                                    onChange={(e) => { handleChange(e) }}
                                                    name="vehicleType"
                                                    value={values.vehicleType}
                                                    error={!!touched.vehicleType && !!errors.vehicleType}
                                                    MenuProps={MenuProps}
                                                >
                                                    <MenuItem value="Private Vehicle">
                                                        Private Vehicle
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>
                                            <FormControl variant="outlined" sx={{ gridColumn: "span 1" }} size="small">
                                                <InputLabel
                                                    sx={{ color: touched.inspectionServiceType && errors.inspectionServiceType ? 'red' : '' }}
                                                    id="inspectionServiceType">
                                                    Inspection Service Type
                                                </InputLabel>
                                                <Select
                                                    fullWidth
                                                    required
                                                    labelId="inspectionServiceType"
                                                    label="Inspection Service Type"
                                                    id="inspectionServiceType"
                                                    onBlur={handleBlur}
                                                    onChange={(e) => { handleChange(e) }}
                                                    name="inspectionServiceType"
                                                    value={values.inspectionServiceType}
                                                    error={!!touched.inspectionServiceType && !!errors.inspectionServiceType}
                                                    MenuProps={MenuProps}
                                                >
                                                    <MenuItem value="">
                                                        <em>None</em>
                                                    </MenuItem>
                                                    {inspectionServiceType.map((option) => (
                                                        <MenuItem key={option.value} value={option.value}>
                                                            {option.value}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                                {touched.inspectionServiceType && errors.inspectionServiceType && (
                                                    <FormHelperText sx={{ color: 'red' }}>{errors.inspectionServiceType}</FormHelperText>
                                                )}
                                            </FormControl>
                                            <FormControl variant="outlined" sx={{ gridColumn: "span 1" }} size="small">
                                                <InputLabel
                                                    id="region">
                                                    Region
                                                </InputLabel>
                                                <Select
                                                    fullWidth
                                                    required
                                                    disabled
                                                    labelId="region"
                                                    label="Region"
                                                    id="region"
                                                    onBlur={handleBlur}
                                                    onChange={(e) => { handleChange(e) }}
                                                    name="region"
                                                    value={values.region}
                                                    error={!!touched.region && !!errors.region}
                                                    MenuProps={MenuProps}
                                                >
                                                    <MenuItem value="Riyadh">
                                                        Riyadh
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>
                                            <FormControl variant="outlined" sx={{ gridColumn: "span 1" }} size="small">
                                                <InputLabel
                                                    id="inspectionCenter">
                                                    Inspection Center
                                                </InputLabel>
                                                <Select
                                                    fullWidth
                                                    required
                                                    disabled
                                                    labelId="inspectionCenter"
                                                    label="inspectionCenter"
                                                    id="inspectionCenter"
                                                    onBlur={handleBlur}
                                                    onChange={(e) => { handleChange(e) }}
                                                    name="inspectionCenter"
                                                    value={values.inspectionCenter}
                                                    error={!!touched.inspectionCenter && !!errors.inspectionCenter}
                                                    MenuProps={MenuProps}
                                                >
                                                    <MenuItem value="Sahara Inspection Center">
                                                        Sahara Inspection Center
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Box>
                                        <Container maxWidth="md" style={{ padding: '20px', marginTop: "-10px" }}>
                                            <iframe
                                                title="Sahara Inspection Center"
                                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3621.2926757388304!2d46.783730999999996!3d24.8196628!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2effab5302ddb9%3A0x27f0a7712a2faef9!2zUkZZQTMwODgsIDMwODggTmFxYWgsIDgxNDbYjCDYrdmKINin2YTZitix2YXZiNmD2IwgUml5YWRoIDEzMjUxLCBTYXVkaSBBcmFiaWE!5e0!3m2!1sen!2sin!4v1700853076613!5m2!1sen!2sin"
                                                width="100%"
                                                height="300"
                                                allowFullScreen=""
                                                loading="lazy"
                                            />
                                        </Container>
                                    </Card>
                                    <Box display="flex" justifyContent="end" mt="20px">
                                        <Button type="submit" color="secondary" variant="contained">
                                            Update
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
const EmailRegex = /^[a-zA-Z0-9]+([._%+-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;;

const registeredVehicleSchema = yup.object().shape({
    fullName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required").matches(EmailRegex, "Email is not valid"),
    mobileNumber: yup.string().required("required"),
    registrationCountry: yup.string()
        .required("Please Select Registration Country"),
    plateNumber: yup.string().required("required"),
    registrationType: yup.string()
        .required("Please Select Registration Type"),
    inspectionDateAndTime: yup.string()
        .required("Please Select Inspection Date and Time"),
    vehicleType: yup.string()
        .required("Please Select Vehicle Type"),
    inspectionServiceType: yup.string()
        .required("Please Select Service Type"),
    region: yup.string()
        .required("Please Select Region"),
    inspectionCenter: yup.string()
        .required("Please Select Inspection Center"),
});

const unregisteredVehicleSchema = yup.object().shape({
    fullName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required").matches(EmailRegex, "Email is not valid"),
    mobileNumber: yup.string().required("required"),
    certificateNumber: yup.string().required("required"),
    inspectionDateAndTime: yup.string()
        .required("Please Select Inspection Date and Time"),
    vehicleType: yup.string()
        .required("Please Select Vehicle Type"),
    inspectionServiceType: yup.string()
        .required("Please Select Service Type"),
    region: yup.string()
        .required("Please Select Region"),
    inspectionCenter: yup.string()
        .required("Please Select Inspection Center"),
});



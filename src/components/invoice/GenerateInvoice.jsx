import React, { useEffect } from 'react';
import { Card, CardHeader, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Grid } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import FormatListNumberedRtlIcon from '@mui/icons-material/FormatListNumberedRtl';

const GenerateInvoice = ({ invoiceDetails }) => {

    const { registeredVehicle } = invoiceDetails;

    useEffect(() => {
        // Disable scrolling when the component mounts
        document.body.style.overflow = 'hidden';

        // Enable scrolling when the component unmounts
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <Box style={{ height: '100vh', overflowY: 'auto', overflowX: 'hidden' }}>
            <Card sx={{ maxWidth: "600px", margin: "auto" }}>
                <CardHeader
                    title={
                        <Box textAlign="center">
                            <Typography variant="h3">
                                Inspection Appointment Information
                            </Typography>
                        </Box>
                    }
                />
                <CardContent>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Booking Information</TableCell>
                                    <TableCell align="right" />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {/* fullName */}
                                <TableRow>
                                    <TableCell>
                                        <Box display="flex" alignItems="center">
                                            <PersonIcon fontSize='small' />
                                            <Typography variant="caption" component="div">
                                                <Box fontWeight="fontWeightBold" ml={1}>
                                                    Alias Name
                                                </Box>
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="right">Your Name</TableCell>
                                </TableRow>
                                {/* vehicleType */}
                                <TableRow>
                                    <TableCell>
                                        <Box display="flex" alignItems="center">
                                            <DirectionsCarIcon fontSize='small' />
                                            <Typography variant="caption" component="div">
                                                <Box fontWeight="fontWeightBold" ml={1}>
                                                    Vehicle Type
                                                </Box>
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="right">Private Vehicle</TableCell>
                                </TableRow>
                                {/* inspectionServiceType */}
                                <TableRow>
                                    <TableCell>
                                        <Box display="flex" alignItems="center">
                                            <MiscellaneousServicesIcon fontSize='small' />
                                            <Typography variant="caption" component="div">
                                                <Box fontWeight="fontWeightBold" ml={1}>
                                                    Inspection Servcie Type
                                                </Box>
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="right">Inspection Servcie Type</TableCell>
                                </TableRow>
                                {/* plateNumber */}
                                {registeredVehicle &&
                                    <TableRow>
                                        <TableCell>
                                            <Box display="flex" alignItems="center">
                                                <FormatListNumberedRtlIcon fontSize='small' />
                                                <Typography variant="caption" component="div">
                                                    <Box fontWeight="fontWeightBold" ml={1}>
                                                        Plate Number
                                                    </Box>
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell align="right">Plate Number</TableCell>
                                    </TableRow>}
                                {/* certificateNumber */}
                                {!registeredVehicle &&
                                    <TableRow>
                                        <TableCell>
                                            <Box display="flex" alignItems="center">
                                                <FormatListNumberedRtlIcon fontSize='small' />
                                                <Typography variant="caption" component="div">
                                                    <Box fontWeight="fontWeightBold" ml={1}>
                                                        Certificate Number
                                                    </Box>
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell align="right">Certificate Number</TableCell>
                                    </TableRow>}
                                {/* inspectionCenter */}
                                <TableRow>
                                    <TableCell>
                                        <Box display="flex" alignItems="center">
                                            <LocationOnRoundedIcon fontSize='small' />
                                            <Typography variant="caption" component="div">
                                                <Box fontWeight="fontWeightBold" ml={1}>
                                                    Inspection Center
                                                </Box>
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="right">Sahara Inspection Center</TableCell>
                                </TableRow>
                                {/* inspectionDateAndTime */}
                                <TableRow>
                                    <TableCell>
                                        <Box display="flex" alignItems="center">
                                            <CalendarMonthRoundedIcon fontSize='small' />
                                            <Typography variant="caption" component="div">
                                                <Box fontWeight="fontWeightBold" ml={1}>
                                                    Inspection Date & Time
                                                </Box>
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="right">Inspection Date & Time</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
            <Grid style={{ textAlign: 'center', marginTop: '50px' }}>
                <TaskAltRoundedIcon sx={{ fontSize: '3rem', marginRight: 2, color: '#00FF00' }} />
                <Typography variant="h6" sx={{ mb: 3 }}>
                    Verified Booking
                </Typography>
            </Grid>
        </Box>
    );
};

export default GenerateInvoice;

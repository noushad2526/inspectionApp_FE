// MovieTicket.js
import React, { useRef } from 'react';
import QRCode from 'qrcode.react';
import { Link } from 'react-router-dom';
import { Typography, Grid, IconButton, Card, Button } from '@mui/material';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import GetAppIcon from '@mui/icons-material/GetApp';
import ShareIcon from '@mui/icons-material/Share';
//
import html2canvas from 'html2canvas';
// service
import { getUserDetails } from '../../services/storage-service';

const Invoice = ({ invoiceDetails }) => {

    const userRole = getUserDetails().role;
    const linkTo = `/${userRole.toLowerCase()}/manage-bookings`;

    const { bookingId } = invoiceDetails;
    const invoiceRef = useRef(null);


    const downloadInvoice = () => {
        html2canvas(invoiceRef.current).then((canvas) => {
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = 'movie_invoice.png';
            link.click();
        });
    };

    const shareInvoice = () => {
        html2canvas(invoiceRef.current).then((canvas) => {
            canvas.toBlob((blob) => {
                const file = new File([blob], 'movie_invoice.png', { type: 'image/png' });
                navigator.share({ files: [file] });
            }, 'image/png');
        });
    };

    return (
        <>
            <TaskAltRoundedIcon sx={{ fontSize: '3rem', marginRight: 2, color: '#00FF00' }} />
            <Typography variant="h6" sx={{ mb: 3 }}>
                Appointment was successfully booked
            </Typography>
            <Card ref={invoiceRef} elevation={3} style={{ padding: '15px', maxWidth: '250px', margin: 'auto', backgroundColor: '#fff' }}>
                {/* QR Code */}
                <Grid style={{ textAlign: 'center', marginTop: '20px' }}>
                    <QRCode value={window.location.href} size={180} />
                </Grid>
                <Grid container spacing={2} style={{ marginTop: '2px' }}>
                    <Grid item xs={12}>
                        <Typography variant="h6" style={{ color: '#2065D1' }}>
                            <span style={{ color: 'black' }}>Booking Id:</span> {bookingId}
                        </Typography>
                    </Grid>
                </Grid>
            </Card>

            <Grid style={{ textAlign: 'center', marginTop: '15px' }}>
                <IconButton onClick={downloadInvoice} aria-label="download">
                    <GetAppIcon />
                </IconButton>
                <IconButton onClick={shareInvoice} aria-label="share">
                    <ShareIcon />
                </IconButton>
            </Grid>
            <Link to={linkTo}>
                <Button sx={{ mt: "15px" }} variant="contained" startIcon={<ArrowBackRoundedIcon />}>
                    Manage Booking
                </Button>
            </Link>
        </>
    );
};

export default Invoice;

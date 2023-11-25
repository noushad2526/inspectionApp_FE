import React from 'react';
// component
import { Grid } from '@mui/material';
import { useLocation } from 'react-router';
import GenerateQR from '../../../components/invoice/GenerateQR';

const GenerateInvoice = () => {

    const location = useLocation();

    const bookingDetails = location.state || false;

    return (
        <Grid style={{ textAlign: 'center' }}>
            <GenerateQR invoiceDetails={bookingDetails} />
        </Grid>
    );
};

export default GenerateInvoice;

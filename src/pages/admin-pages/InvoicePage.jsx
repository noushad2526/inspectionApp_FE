import React, { useState } from 'react';
import { useParams } from 'react-router';
import { Grid } from '@mui/material';
import GenerateInvoice from '../../components/invoice/GenerateInvoice';

const InvoicePage = () => {
    const { bookingId } = useParams();
    const bookingDetails = {
        serviceCenter: "Sahara service center"
    }
    return (
        <Grid >
            <GenerateInvoice invoiceDetails={{ registeredVehicle: false }} />
        </Grid>
    );
};

export default InvoicePage;

import React from 'react';
// component
import { Grid } from '@mui/material';
import { useLocation } from 'react-router';
import Invoice from '../../../components/invoice/GenerateQR';

const GenerateInvoice = () => {

    const location = useLocation();

    const bookingDetails = location.state || false;
    // example
    // const bookingDetails = {
    //     bookingId: 'BKG000001',
    // };

    return (
        <Grid style={{ textAlign: 'center', marginTop: '50px' }}>
            <Invoice invoiceDetails={bookingDetails} />
        </Grid>
    );
};

export default GenerateInvoice;

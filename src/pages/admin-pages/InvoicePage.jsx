import React, { useState } from 'react';
import { Grid } from '@mui/material';
import Invoice from '../../components/invoice/GenerateQR';

const InvoicePage = () => {

    // create a page which verify the scanner find by id from path and display values
    const [invoice, setInvoice] = useState();

    const bookingDetails = {
        bookingId: 'BKG000001',
    };

    return (
        <Grid style={{ textAlign: 'center', marginTop: '50px' }}>
            <Invoice invoiceDetails={bookingDetails} />
        </Grid>
    );
};

export default InvoicePage;

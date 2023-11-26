import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router';
import { Grid } from '@mui/material';
//
import Page404 from '../global-pages/Page404';
import GenerateInvoice from '../../components/invoice/GenerateInvoice';
import LoadingLayer from '../../components/custom-progress/global-progress/LoadingProgress';
import { getBookingDetailsById } from '../../services/api-service';

const InvoicePage = () => {
    const { bookingId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [vehicleDetails, setVehicleDetails] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                // Admin block
                const data = await getBookingDetailsById(bookingId);

                if (data.length === 0) {
                    toast.error("No booking Found");
                }
                setVehicleDetails(data);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
        // eslint-disable-next-line
    }, []);

    return (
        <>
            {isLoading && <LoadingLayer message="Fetching Booking Details" />}
            {vehicleDetails !== null ?
                <Grid >
                    <GenerateInvoice invoiceDetails={vehicleDetails} />
                </Grid > :
                <Page404 />
            }
        </>
    );
};

export default InvoicePage;

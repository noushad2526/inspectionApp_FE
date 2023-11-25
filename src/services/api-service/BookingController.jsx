import axios from "axios";

// service
import { getHeader, getHeaderWithoutToken } from "..";

export const scheduleBooking = (bookingDetails) => {
    return axios.post("/land-auth/scheduleBooking", JSON.stringify(bookingDetails), getHeader()).then((response) => response.data);
};

export const getAllBooking = () => {
    return axios.get("/land-auth/getAllBooking", getHeader()).then((response) => response.data);
};
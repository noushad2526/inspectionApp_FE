import axios from "axios";

// service
import { getHeader, getHeaderWithoutToken } from "..";

export const scheduleBooking = (bookingDetails) => {
    return axios.post("/land-auth/scheduleBooking", JSON.stringify(bookingDetails)).then((response) => response.data);
};
import axios from "axios";

// service
import { getHeader, getHeaderWithoutToken } from "..";

export const scheduleBooking = (bookingDetails) => {
    return axios.post("/vehicle/scheduleBooking", JSON.stringify(bookingDetails), getHeader()).then((response) => response.data);
};

export const getAllBooking = () => {
    return axios.get("/vehicle/getAllBooking", getHeader()).then((response) => response.data);
};

export const getBooking = (bookingId) => {
    return axios.get(`/vehicle/getBookingDetailsById/${bookingId}`, getHeader()).then((response) => response.data);
};

export const updateBooking = (bookingDetails) => {
    return axios.post("/vehicle/updateBooking", JSON.stringify(bookingDetails), getHeader()).then((response) => response.data);
}

export const deleteBooking = (bookingId) => {
    return axios.post("/vehicle/deleteBooking", JSON.stringify(bookingId), getHeader()).then((response) => response.data);
}

export const countOfBookings = () => {
    return axios.get("/vehicle/countOfBookings", getHeader()).then((response) => response.data);
};

export const getBookingDetailsById = (bookingId) => {
    return axios.get(`/vehicle/getBookingDetailsById/${bookingId}`, getHeaderWithoutToken()).then((response) => response.data);
};
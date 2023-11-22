import axios from "axios";

// service
import { getHeader, getHeaderWithoutToken } from "..";

export const loginUser = (loginDetails) => {
    return axios.post("/land-auth/loginUser", loginDetails).then((response) => response.data);
};

export const authenticateUser = (authDetails) => {
    return axios.post("/land-auth/getConfig", JSON.stringify(authDetails), getHeader()).then((response) => response.data);
};

export const getUserToken = (userDetails) => {
    return axios.post("/land-auth/getUserToken", JSON.stringify(userDetails), getHeaderWithoutToken()).then((response) => response.data);
};

export const getAllUser = () => {
    return axios.get("/land-auth/getallusers", getHeader()).then((response) => response.data);
};

export const registerUser = (userDetails) => {
    return axios.post("/land-auth/registerUser", JSON.stringify(userDetails)).then((response) => response.data);
};

export const updateUser = (userDetails) => {
    return axios.post("/land-auth/updateUser", JSON.stringify(userDetails), getHeader()).then((response) => response.data);
}

export const deleteUser = (userId) => {
    return axios.post("/land-auth/deleteAdminUser", JSON.stringify(userId), getHeader()).then((response) => response.data);
}

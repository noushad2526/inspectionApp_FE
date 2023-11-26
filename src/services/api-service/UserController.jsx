import axios from "axios";

// service
import { getHeader, getHeaderWithoutToken } from "..";

export const loginUser = (loginDetails) => {
    return axios.post("/vehicle/loginUser", loginDetails).then((response) => response.data);
};

export const authenticateUser = (authDetails) => {
    return axios.post("/vehicle/getConfig", JSON.stringify(authDetails), getHeader()).then((response) => response.data);
};

export const getUserToken = (userDetails) => {
    return axios.post("/vehicle/getUserToken", JSON.stringify(userDetails), getHeaderWithoutToken()).then((response) => response.data);
};

export const getAllUser = () => {
    return axios.get("/vehicle/getallusers", getHeader()).then((response) => response.data);
};

export const registerUser = (userDetails) => {
    return axios.post("/vehicle/registerUser", JSON.stringify(userDetails)).then((response) => response.data);
};

export const updateUser = (userDetails) => {
    return axios.post("/vehicle/updateUser", JSON.stringify(userDetails), getHeader()).then((response) => response.data);
}

export const deleteUser = (userId) => {
    return axios.post("/vehicle/deleteAdminUser", JSON.stringify(userId), getHeader()).then((response) => response.data);
}

export const countOfAllModules = () => {
    return axios.get("/vehicle/countOfAllModules", getHeader()).then((response) => response.data);
};

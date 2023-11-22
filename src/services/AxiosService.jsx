import axios from "axios";
// service
import { getTokenDetails } from "./storage-service";

export const getHeader = () => {
    const tokenDetails = getTokenDetails();

    const myHeader = {
        headers: {
            Authorization: `Bearer ${tokenDetails.jwt}`,
            "Content-Type": "application/json",
        },
    };
    return myHeader;
};

export const updateHeader = () => {
    const tokenDetails = getTokenDetails();

    if (tokenDetails) {
        axios.defaults.headers = getHeader().headers;
    } else {
        delete axios.defaults.headers;
    }

};

export const getHeaderWithoutToken = () => {
    const myHeader = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    return myHeader;
};

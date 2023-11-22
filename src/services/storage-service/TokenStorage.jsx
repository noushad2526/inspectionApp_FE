import CryptoJS from "crypto-js";
// service
import { updateHeader } from "../AxiosService";

// ----------------------------------------------------------------------

export const isTokenPresent = () => {
    const token = sessionStorage.getItem('token');
    if (token !== null) {
        return true;
    }
    return false;
};

export const saveToken = (data) => {
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), 'noushad&saif').toString();
    sessionStorage.setItem('token', encryptedData);
    updateHeader();
};

export const removeToken = () => {
    sessionStorage.removeItem('token');
    updateHeader();
};

export const getTokenDetails = () => {
    if (isTokenPresent()) {
        const bytes = CryptoJS.AES.decrypt(sessionStorage.getItem('token'), 'noushad&saif');
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return decryptedData;
    }
    return false;
};
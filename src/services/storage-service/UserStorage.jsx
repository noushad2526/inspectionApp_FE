import CryptoJS from "crypto-js";

// ----------------------------------------------------------------------

export const isUserPresent = () => {
    const user = localStorage.getItem('user');
    if (user !== null) {
        return true;
    }
    return false;
};

export const saveUser = (data) => {
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), 'noushad&saif').toString();
    localStorage.setItem('user', encryptedData);
};

export const removeUser = () => {
    localStorage.removeItem('user');
};

export const getUserDetails = () => {
    if (isUserPresent()) {
        const bytes = CryptoJS.AES.decrypt(localStorage.getItem('user'), 'noushad&saif');
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return decryptedData;
    }
    return false;
};

export const getUserRole = () => {
    if (isUserPresent()) {
        return getUserDetails().role;
    }
    return false;
}


// service
import { getUserDetails, isTokenPresent, isUserPresent, saveToken, saveUser } from "./storage-service";
// api-service
import { getUserToken } from "./api-service";
import { updateHeader } from "./AxiosService";

export const doLogin = (data) => {
    saveUser(data);
};

export const doLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    updateHeader();
};

export const verifyUser = async () => {

    const userPresence = isUserPresent();
    const userDetails = getUserDetails();
    const tokenPresence = isTokenPresent();

    try {
        // save token if user present and its token not present
        if (userPresence && !tokenPresence) {
            const response = await getUserToken({ email: userDetails.email })
            saveToken(response);
        }
    } catch (error) {
        console.log(error);
        doLogout();
    }
}

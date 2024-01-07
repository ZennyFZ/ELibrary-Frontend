import axios from "axios";
import { USER_API_URL } from "./APIConfig";

const login = (email, password) => {
    return axios.post(`${USER_API_URL}/login`, { email, password }, { withCredentials: true });
}

const getCurrentUser = () => {
    return axios.get(`${USER_API_URL}/get-current-user`, { withCredentials: true });
}

export { login, getCurrentUser }
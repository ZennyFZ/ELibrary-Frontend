import axios from "axios";
import { USER_API_URL } from "./APIConfig";

const login = (email, password) => {
    return axios.post(`${USER_API_URL}/login`, { email, password }, { withCredentials: true });
}

const register = (email, password) => {
    return axios.post(`${USER_API_URL}/register`, { email, password }, { withCredentials: true });
}

const getCurrentUser = () => {
    return axios.get(`${USER_API_URL}/get-current-user`, { withCredentials: true });
}

const updateProfile = (name, email, dob, phone) => {
    return axios.put(`${USER_API_URL}/update-profile`, { name, email, dob, phone }, { withCredentials: true });
}

const changePassword = (oldPassword, newPassword) => {
    return axios.put(`${USER_API_URL}/change-password`, { oldPassword, newPassword }, { withCredentials: true });
}

const updateUserRole = (id, role) => {
    return axios.post(`${USER_API_URL}/update-user-role`, { id, role }, { withCredentials: true });
}

export { login, register, getCurrentUser, updateProfile, changePassword, updateUserRole }
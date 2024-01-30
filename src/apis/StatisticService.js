import axios from "axios";
import { STATISTIC_API_URL } from "./APIConfig";

const getTotalBooksSold = () => {
    return axios.get(`${STATISTIC_API_URL}/books-sold`, { withCredentials: true });
}

const getTotalCustomers = () => {
    return axios.get(`${STATISTIC_API_URL}/total-customer`, { withCredentials: true });
}

const getTotalRevenue = (year) => {
    return axios.get(`${STATISTIC_API_URL}/total-revenue/?year=${year}`, { withCredentials: true });
}

export { getTotalBooksSold, getTotalCustomers, getTotalRevenue }
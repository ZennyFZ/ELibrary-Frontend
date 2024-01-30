import axios from "axios";
import { STATISTIC_API_URL } from "./APIConfig";

const getTotalBooksSold = () => {
    return axios.get(`${STATISTIC_API_URL}/books-sold`, { withCredentials: true });
}

const getTotalCustomers = () => {
    return axios.get(`${STATISTIC_API_URL}/total-customer`, { withCredentials: true });
}

const getTotalRevenue = () => {
    return axios.get(`${STATISTIC_API_URL}/total-revenue`, { withCredentials: true });
}

export { getTotalBooksSold, getTotalCustomers, getTotalRevenue }
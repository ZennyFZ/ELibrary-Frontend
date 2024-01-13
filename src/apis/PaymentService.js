import axios from "axios";
import { PAYMENT_API_URL } from "./APIConfig";

const makePayment = (amount, methodType) => {
    return axios.post(`${PAYMENT_API_URL}/payment`, {
        amount,
        methodType
    }, { withCredentials: true });
}

export { makePayment}
import axios from 'axios';
import { ORDER_API_URL } from './APIConfig';

const createOrder = (userId, totalPrice, paymentMethod, bookList) => {
    return axios.post(`${ORDER_API_URL}/create-order`, { userId, totalPrice, paymentMethod, bookList }, { withCredentials: true });
}

const getAllOrders = () => {
    return axios.get(`${ORDER_API_URL}/get-all-orders`, { withCredentials: true });
}

const getOrderByUserId = (userId) => {
    console.log(userId);
    return axios.get(`${ORDER_API_URL}/get-order/${userId}`, { withCredentials: true });
}

const getOrderDetail = (orderId) => {
    return axios.get(`${ORDER_API_URL}/get-order-detail/${orderId}`, { withCredentials: true });
}

export { createOrder, getAllOrders, getOrderByUserId, getOrderDetail }
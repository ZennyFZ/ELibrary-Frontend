import axios from "axios";
import { BOOK_API_URL } from "./APIConfig";

const getBooks = () => {
    return axios.get(`${BOOK_API_URL}/get-all-books`);
}

const getBook = (id) => {
    return axios.get(`${BOOK_API_URL}/${id}`);
}

const getCategories = () => {
    return axios.get(`${BOOK_API_URL}/get-all-categories`);
}

export { getBooks, getBook, getCategories}

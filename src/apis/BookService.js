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

//CRUD (admin only)
const addBook = (title, author, publisher, publishDate, pages, language, price, image, description, category, file) => {
    return axios.post(`${BOOK_API_URL}/add-book`, {
        title,
        author,
        publisher,
        publishDate,
        pages,
        language,
        price,
        image,
        description,
        isDeleted: false,
        category,
        file
    }, { withCredentials: true });
}

const uploadBookImage = (formData) => {
    return axios.post(`${BOOK_API_URL}/upload-book-image`, formData, { withCredentials: true });
}

const uploadBookFile = (formData) => {
    return axios.post(`${BOOK_API_URL}/upload-book-file`, formData, {  withCredentials: true });
}

const updateBook = (id, title, author, publisher, publishDate, pages, language, price, image, description, category, file) => {
    return axios.put(`${BOOK_API_URL}/update-book/${id}`, {
        title,
        author,
        publisher,
        publishDate,
        pages,
        language,
        price,
        image,
        description,
        category,
        file
    }, { withCredentials: true });
}

const deleteBook = (id) => {
    return axios.delete(`${BOOK_API_URL}/delete-book/${id}`, { withCredentials: true });
}

//filter
const filterBookByCategory = (category) => {
    return axios.get(`${BOOK_API_URL}/filter-book?category=${category}`);
}

//suggest
const suggestBookForUser = (userId) => {
    return axios.get(`${BOOK_API_URL}/suggest-book`, {id : userId}, { withCredentials: true });
}

export { getBooks, getBook, getCategories, addBook, uploadBookImage, uploadBookFile , updateBook, deleteBook, filterBookByCategory, suggestBookForUser }

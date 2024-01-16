import axios from "axios";
import { CATEGORY_API_URL } from "./APIConfig";

const getCategories = () => {
    return axios.get(`${CATEGORY_API_URL}/get-all-categories`);
}

const addCategory = (name) => {
    return axios.post(`${CATEGORY_API_URL}/add-category`, {
        name
    }, { withCredentials: true });
}

const updateCategory = (id, name) => {
        return axios.put(`${CATEGORY_API_URL}/update-category/`, {
        id,
        name
    }, { withCredentials: true });
}

const deleteCategory = (id) => {
    return axios.delete(`${CATEGORY_API_URL}/delete-category/${id}`, { withCredentials: true });
}

export { getCategories, addCategory, updateCategory, deleteCategory };
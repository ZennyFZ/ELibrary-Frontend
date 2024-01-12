let host = '';
console.log(import.meta.env.VITE_ENVIROMENT);
import.meta.env.VITE_ENVIROMENT == 'production' ? host = 'https://e-library-backend-pi.vercel.app/api/v1' : host = 'http://localhost:8000/api/v1';

export const USER_API_URL = `${host}/user`;
export const BOOK_API_URL = `${host}/book`;
export const CATEGORY_API_URL = `${host}/category`;
export const TRANSLATION_API_URL = `${host}/translate`;
export const SUMMARIZATION_API_URL = `${host}/summarize`;
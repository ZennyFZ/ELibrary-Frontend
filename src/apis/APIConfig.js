let host = '';
console.log(import.meta.env.VITE_ENVIROMENT);
import.meta.env.VITE_ENVIROMENT == 'production' ? host = 'e-library-backend-pi.vercel.app/api/v1' : host = 'localhost:8000/api/v1';

export const USER_API_URL = `http://${host}/users`;
export const BOOK_API_URL = `http://${host}/book`;
export const TRANSLATION_API_URL = `http://${host}/translate`;
export const SUMMARIZATION_API_URL = `http://${host}/summarize`;
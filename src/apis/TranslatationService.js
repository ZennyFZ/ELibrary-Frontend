import axios from 'axios';
import { TRANSLATION_API_URL } from './APIConfig';

const translate = (text) => {
    return axios.post(`${TRANSLATION_API_URL}`, {
        text
    })
}

export { translate };
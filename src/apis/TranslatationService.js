import axios from 'axios';
import { TRANSLATION_API_URL } from './APIConfig';

const translate = (text, targetLang) => {
    return axios.post(`${TRANSLATION_API_URL}`, {
        text: [
            text
        ],
        target_lang: targetLang
    }, {
        headers: {
            Authorization: `DeepL-Auth-Key 6882f556-63d5-4f43-8080-e1a2ab7e5586:fx`
        }
    })
}

export { translate };
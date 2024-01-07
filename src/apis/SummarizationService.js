import axios from 'axios'
import { SUMMARIZATION_API_URL } from './APIConfig'

const summarize = (text) => {
    return axios.post(`${SUMMARIZATION_API_URL}`, {
        text
    })
}

export { summarize };
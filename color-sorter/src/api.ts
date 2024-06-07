import axios from 'axios';
import dotenv from "dotenv";
dotenv.config();

let baseURL = process.env.URL;

const api = axios.create({
    baseURL: 'http://' + baseURL + ':3001',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
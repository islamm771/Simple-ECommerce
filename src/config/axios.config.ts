import axios from "axios";

export const axiosInstance = axios.create({
    // baseURL: 'http://localhost:1337/api',
    baseURL: 'http://localhost:3000',
    timeout: 1000,
})
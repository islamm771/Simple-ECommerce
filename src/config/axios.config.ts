import axios from "axios";

export const axiosInstance = axios.create({
    // baseURL: 'http://localhost:3030',
    baseURL: 'https://simple-api-ecommerce-production.up.railway.app/',
    timeout: 1000,
})

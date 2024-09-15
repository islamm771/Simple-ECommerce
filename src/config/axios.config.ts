import axios from "axios";

export const axiosInstance = axios.create({
    // baseURL: 'http://localhost:1337/api',
    baseURL: 'https://simple-api-ecommerce.vercel.app',
    // baseURL: 'https://sevenasad.onrender.com',
    timeout: 1000,
})

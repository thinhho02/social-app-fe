import axios from "axios";

const API = axios.create({ baseURL: process.env.ORIGIN_PATH_BACKEND, withCredentials: true });

API.interceptors.response.use(
    (response) => response,
    (error) => {
        const { status, data } = error.response
        return Promise.reject({ status, ...data })
    }
);

export default API

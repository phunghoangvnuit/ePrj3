import axios from 'axios';
import config from './config';

const instance = axios.create({
    baseURL: config.api.API_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

instance.interceptors.request.use((config) => {
    const info = JSON.parse(localStorage.getItem("persist:auth"));
    const token = info.token.replace(/"/g, '')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})


instance.interceptors.response.use(
    (response) => {
        const { data } = response;
        return response.data;
    }
);

export default instance;

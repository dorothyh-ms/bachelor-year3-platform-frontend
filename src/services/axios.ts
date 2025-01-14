import axios from 'axios';

const axiosApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

axiosApi.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error.response?.data || error.message);
        throw error;
    }
);

export default axiosApi;





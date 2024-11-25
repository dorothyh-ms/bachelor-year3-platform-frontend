import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
});

export function addAuthHeader(token: string) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export function removeAuthHeader() {
    delete api.defaults.headers.common['Authorization'];
}

export default api;

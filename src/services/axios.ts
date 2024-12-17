import axios from 'axios';
import keycloak from '../keycloak';

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
});

// Attach an interceptor to always include the token
api.interceptors.request.use(
    async (config) => {
        // Ensure token is updated or retrieved before every request
        if (keycloak.token) {
            const isTokenUpdated = await keycloak.updateToken(30); // Refresh token if expiring within 30 seconds
            if (isTokenUpdated) {
                console.log('Token refreshed:', keycloak.token);
            }
        }

        // Add the Authorization header
        config.headers.Authorization = `Bearer ${keycloak.token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export function addAuthHeader(token: string) {
    keycloak.token = `Bearer ${token}`;
}

export function removeAuthHeader() {
    delete api.defaults.headers.common['Authorization'];
}

export default api;

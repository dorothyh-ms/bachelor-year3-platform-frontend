import axios from "axios";

const axiosApi = axios.create({
    // e.g. http://localhost:8092/api
    baseURL: import.meta.env.VITE_API_URL,
});

// Attach/refresh Keycloak token on every request
axiosApi.interceptors.request.use(async (config) => {
    const kc = window.kc; // <-- uses the global type from window.d.ts
    if (kc) {
        try {
            // refresh if token expires in <30s
            await kc.updateToken(30);
        } catch {
            kc.login();
        }
        if (kc.token) {
            config.headers = config.headers ?? {};
            (config.headers as Record<string, string>).Authorization = `Bearer ${kc.token}`;
        }
    }
    return config;
});

export default axiosApi;

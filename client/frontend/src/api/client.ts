import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle global errors like 401 logout
        if (error.response?.status === 401) {
            // Optional: Redirect to login or clear state
        }
        return Promise.reject(error);
    }
);

export default api;

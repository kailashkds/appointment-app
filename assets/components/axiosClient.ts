import axios from 'axios';

const axiosClient = axios.create({
    baseURL: '/api',
});

// Attach token to every request
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosClient.interceptors.response.use(
    response => response,
    error => {
        const status = error.response?.status;

        if (status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }

        if (status === 404) {
            alert('Page not found');
            window.history.back();
        }

        return Promise.reject(error);
    }
);

export default axiosClient;

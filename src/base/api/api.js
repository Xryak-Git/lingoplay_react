/** @format */

import axios from 'axios';
import { queryClient } from './utils';

export const API_URL = 'http://127.0.0.1:8000';

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
    transformRequest: [
        (data, headers) => {
            if (data && typeof data === 'object') {
                return JSON.stringify(data);
            }
            return data;
        },
    ],
});

api.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
        if (!config.headers) {
            config.headers = {};
        }
        console.log('Adding Authorization header:', accessToken);
        config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._isRetry) {
            originalRequest._isRetry = true;
            try {
                const response = await axios.get(`${API_URL}/auth/refresh`, {
                    withCredentials: true,
                });

                const newAccessToken = response.data.access_token;
                localStorage.setItem('access_token', newAccessToken);

                return api.request(originalRequest);
            } catch (e) {
                console.warn(
                    'Не удалось обновить токен, пользователь не авторизован'
                );
                localStorage.removeItem('access_token');
            }
        }

        throw error;
    }
);

function getCSRFToken() {
    const match = document.cookie.match(/(^| )csrftoken=([^;]+)/);
    return match ? match[2] : '';
}

export const post = (url, body) => api.post(url, body).then((res) => res.data);

export const get = (url, params) =>
    api.get(url, { params }).then((res) => res.data);

export const put = (url, body) => api.put(url, body).then((res) => res.data);

export const del = (url) => api.delete(url).then((res) => res.data);

export const invalidate =
    (...keys) =>
    async () => {
        for (const key of keys)
            await queryClient.invalidateQueries({ queryKey: key });
    };

export default api;

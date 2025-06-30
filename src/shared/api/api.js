/** @format */

import axios from 'axios';

export const API_URL = 'http://127.0.0.1:8000';

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    transformRequest: [
        (data, headers) => {
            if (data instanceof FormData) {
                let hasFile = false;

                for (const [key, value] of data.entries()) {
                    if (value instanceof File || value instanceof Blob) {
                        hasFile = true;
                        break;
                    }
                }

                if (!hasFile) {
                    const jsonObj = {};
                    for (const [key, value] of data.entries()) {
                        jsonObj[key] = value;
                    }
                    headers['Content-Type'] = 'application/json';
                    return JSON.stringify(jsonObj);
                }

                delete headers['Content-Type'];
                return data;
            }
            headers['Content-Type'] = 'application/json';
            return JSON.stringify(data);
        },
    ],
});

api.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem('token');
    if (accessToken) {
        if (!config.headers) {
            config.headers = {};
        }
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
                const response = await axios.post(
                    `${API_URL}/auth/refresh`,
                    null,
                    {
                        withCredentials: true,
                    }
                );

                const newAccessToken = response.data.token;
                localStorage.setItem('token', newAccessToken);

                return api.request(originalRequest);
            } catch (e) {
                console.warn(
                    'Не удалось обновить токен, пользователь не авторизован'
                );
                localStorage.removeItem('token');
                return Promise.reject(e);
            }
        }

        return Promise.reject(error);
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

export default api;

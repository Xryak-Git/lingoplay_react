/** @format */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { App } from 'antd';
import { post, get } from '../../../shared/api/api';
import { useAuth } from '../../../features/auth/model/AuthContext';

export function useLogin() {
    const { message } = App.useApp();
    const { setUser } = useAuth();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => post(apiUrls.login(), data),

        onError: async () => {
            message.error('Неверный адрес электронной почты или пароль');
        },

        onSuccess: (data) => {
            if (data?.token) {
                localStorage.setItem('token', data.token);
            }
            setUser(data.user);
        },
    });
}

export function useRegistrate() {
    const { message } = App.useApp();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => post(apiUrls.registrate(), data),

        onError: async () => {
            message.error('Неверный адрес электронной почты или пароль');
        },

        onSuccess: (data) => {
            message.success('Вы успешно зарегистрированы');
        },
    });
}

export function useLogout() {
    const { setUser } = useAuth();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => post(apiUrls.logout()),
        onSettled: () => {
            localStorage.removeItem('token');
            setUser(null);
        },
    });
}

const keys = {
    currentUser: ['current'],
};

export const apiUrls = {
    login: () => '/auth/login',
    registrate: () => '/auth/registrate',
    logout: () => '/auth/logout',
    currentUser: () => `/users/current`,
};

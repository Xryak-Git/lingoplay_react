/** @format */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { App } from 'antd';
import { invalidate, post, get } from '../../../base/api/api';

export function useLogin() {
    const { message } = App.useApp();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => post(apiUrls.login(), data),
        onSettled: invalidate(keys.login),

        onError: async () => {
            message.error('Произошла ошибка');
        },

        onSuccess: (data) => {
            if (data?.token) {
                localStorage.setItem('token', data.token);
            }

            queryClient.invalidateQueries({
                queryKey: [keys.login],
            });
        },
    });
}

export function useUser() {
    return useQuery({
        queryKey: [...keys.currentUser],
        queryFn: () => get(apiUrls.currentUser()),
    });
}

const keys = {
    login: ['login'],
    currentUser: ['current'],
};

export const apiUrls = {
    login: () => '/auth/login',
    currentUser: () => `/users/current`,
};

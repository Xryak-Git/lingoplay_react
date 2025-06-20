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

            message.success('Файл успешно загружен');
            queryClient.invalidateQueries({
                queryKey: [keys.login],
            });
        },
    });
}

export function useUser(id) {
    return useQuery({
        queryKey: [keys.user, id],
        queryFn: () => get(apiUrls.user(id)).then((res) => res.data),
    });
}

const keys = {
    login: ['login'],
    user: ['me'],
};

export const apiUrls = {
    login: () => '/auth/login',
    user: (id) => `auth/${id}`,
};

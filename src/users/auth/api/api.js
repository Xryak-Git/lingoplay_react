/** @format */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { App } from 'antd';
import { post, get } from '../../../base/api/api';

export function useLogin() {
    const { message } = App.useApp();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => post(apiUrls.login(), data),

        onError: async () => {
            message.error('Произошла ошибка');
        },

        onSuccess: (data) => {
            if (data?.token) {
                localStorage.setItem('token', data.token);
            }
            queryClient.invalidateQueries([keys.currentUser]);
        },
    });
}

export function useUser() {
    return useQuery({
        queryKey: [keys.currentUser],
        queryFn: async () => {
            try {
                return await get(apiUrls.currentUser());
            } catch (err) {
                if (err?.response?.status === 403) {
                    return null;
                }
                throw err;
            }
        },
        retry: false,
        staleTime: 0,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
    });
}

export function useLogout() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => post(apiUrls.logout()),
        onSettled: () => {
            localStorage.removeItem('token');
            queryClient.invalidateQueries([keys.currentUser]);
        },
    });
}

const keys = {
    currentUser: ['current'],
};

export const apiUrls = {
    login: () => '/auth/login',
    logout: () => '/auth/logout',
    currentUser: () => `/users/current`,
};

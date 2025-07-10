/** @format */

import { useAuth } from '../../../features/auth/model/AuthContext';


import { useMutation } from '@tanstack/react-query';
import { App } from 'antd';
import { post } from '../../../shared/api/api';


export function useUpdateUser(id) {
    const { message } = App.useApp();
    const { setUser } = useAuth();

    return useMutation({
        mutationFn: (data) => post(apiUrls.userDetail(id), data),

        onError: async () => {
            message.error('Не удалось обновить данные пользователя');
        },

        onSuccess: (data) => {
            message.success('Данные обновлены');
            setUser(data.user);
        },
    });
}

export function useUser() {
    const { user, loading } = useAuth();
    return { user, isLoading: loading };
}


export const apiUrls = {
    userDetail: (id) => `/users/${id}`,

};

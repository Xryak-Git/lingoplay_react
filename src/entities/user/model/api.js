/** @format */

import { useAuth } from '../../../features/auth/model/AuthContext';

import { useMutation } from '@tanstack/react-query';
import { App } from 'antd';
import { post } from '../../../shared/api/api';

export function useUpdateUser() {
    const { message } = App.useApp();
    const { setUser } = useAuth();

    return useMutation({
        mutationFn: ({ id, data }) => post(apiUrls.userDetail(id), data),

        onError: async (e) => {
            message.error(e.response.data.detail[0].msg);
        },

        onSuccess: (data) => {
            message.success('Данные обновлены');
            setUser(data);
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

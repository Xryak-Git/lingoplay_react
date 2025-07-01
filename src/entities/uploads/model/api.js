/** @format */

import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { App } from 'antd';
import { get, post } from '../../../shared/api/api';

export function useGetGames(filters) {
    const { message } = App.useApp();
    const queryClient = useQueryClient();
    console.log(filters);

    return useQuery({
        queryKey: [keys.allVideos, filters],
        queryFn: () => get(apiUrls.gamesList(), filters),
    });
}

export function useGetVideosList() {
    return useQuery({
        queryKey: keys.allVideos,
        queryFn: () => get(apiUrls.videosList()),
    });
}

export function useUploadVideo() {
    const { message } = App.useApp();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => post(apiUrls.videosList(), data),

        onError: async (e) => {
            message.error(e.response.data.detail[0].msg);
        },

        onSuccess: (data) => {
            message.success(data?.message);
            queryClient.invalidateQueries({
                queryKey: keys.allVideos,
            });
        },
    });
}

const keys = {
    allVideos: ['uploads', 'videos'],
    detailVideo: (id) => [...keys.allVideos, id],

    allGames: ['uploads', 'games'],
    detailGames: (id) => [...keys.allGames, id],
};

export const apiUrls = {
    videosList: () => '/uploads/videos',
    videoDetail: (id) => `${apiUrls.videosList}/${id}`,

    gamesList: () => '/uploads/games',
    gameDetail: (id) => `${apiUrls.gamesList}/${id}`,
};

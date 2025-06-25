/** @format */

import React, { useState, useEffect } from 'react';
import { Typography, Upload, Button, List, Modal, Grid, Divider } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useUser } from '../../entities/user/model/api';
import { VideoListWithHoverPreview } from './VideoListWithHoverPreview';

const { Title } = Typography;

export const VideoUpload = () => {
    const { user } = useUser();

    // Пример данных видео, которые могут приходить с сервера
    const [videos, setVideos] = useState([
        {
            id: 1,
            url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            title: 'Video 1',
        },
        {
            id: 2,
            url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            title: 'Video 2',
        },
    ]);

    const [selectedVideo, setSelectedVideo] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    // Обработчик загрузки (тут просто заглушка)
    const handleUpload = (file) => {
        // Здесь нужно реализовать логику загрузки файла на сервер
        // Для примера добавим видео в список с фиктивным url
        const newVideo = {
            id: videos.length + 1,
            url: URL.createObjectURL(file),
            title: file.name,
        };
        setVideos([...videos, newVideo]);
        return false; // отменяем автоматическую загрузку, чтобы контролировать процесс сами
    };

    // Открыть видео в модальном окне
    const openVideo = (video) => {
        setSelectedVideo(video);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
        setSelectedVideo(null);
    };

    return (
        <>
            <Title level={2}>Видео пользователя: {user?.name || 'Гость'}</Title>

            <Upload
                beforeUpload={handleUpload}
                accept="video/*"
                showUploadList={false} // скрыть дефолтный список файлов
            >
                <Button icon={<UploadOutlined />}>Загрузить видео</Button>
            </Upload>
            <Divider />

            <VideoListWithHoverPreview videos={videos} openVideo={openVideo} />

            <Modal
                visible={isModalVisible}
                title={selectedVideo?.title}
                footer={null}
                onCancel={closeModal}
                width="60%"
            >
                {selectedVideo && (
                    <video
                        controls
                        style={{ width: '100%' }}
                        src={selectedVideo.url}
                    />
                )}
            </Modal>
        </>
    );
};

/** @format */

import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Modal, Select, Typography } from 'antd';
import { useState } from 'react';
import { useUser } from '../../entities/user/model/api';
import { VideoListWithHoverPreview } from './VideoListWithHoverPreview';
import { VideoUplodaModal } from './VideoUploadModal';

const { Title } = Typography;
const { Option } = Select;

export const VideoUpload = () => {
    const { user } = useUser();
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
        {
            id: 12,
            url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            title: 'Video 1',
        },
        {
            id: 22,
            url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            title: 'Video 2',
        },
        {
            id: 13,
            url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            title: 'Video 1',
        },
        {
            id: 23,
            url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            title: 'Video 2',
        },
    ]);
    const [uploadModalOpen, setUploadModalOpen] = useState(false);
    const [previewModalVisible, setPreviewModalVisible] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);

    const openUploadModal = () => {
        setUploadModalOpen(true);
    };

    const openPreview = (video) => {
        setSelectedVideo(video);
        setPreviewModalVisible(true);
    };

    return (
        <>
            <Title level={2}>Видео пользователя: {user?.name || 'Гость'}</Title>

            <Button icon={<PlusOutlined />} onClick={openUploadModal}>
                Добавить видео
            </Button>
            <Divider />

            <VideoListWithHoverPreview
                videos={videos}
                openVideo={openPreview}
            />

            <Modal
                visible={previewModalVisible}
                title={selectedVideo?.title}
                footer={null}
                onCancel={() => setPreviewModalVisible(false)}
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
            <VideoUplodaModal
                uploadModalOpen={uploadModalOpen}
                setUploadModalOpen={setUploadModalOpen}
            />
        </>
    );
};

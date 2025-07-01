/** @format */

import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Modal, Select, Skeleton, Typography } from 'antd';
import { useState } from 'react';
import { useUser } from '../../entities/user/model/api';
import { VideoListWithHoverPreview } from './VideoListWithHoverPreview';
import { VideoUplodaModal } from './VideoUploadModal';
import { useGetVideosList } from '../../entities/uploads/model/api';

const { Title } = Typography;
const { Option } = Select;

export const VideoUploadPage = () => {
    const { user } = useUser();
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

    const { data, isLoading } = useGetVideosList();

    return (
        <>
            <Title level={2}>Загруженные видео</Title>

            <Button icon={<PlusOutlined />} onClick={openUploadModal}>
                Добавить видео
            </Button>
            <Divider />

            <VideoListWithHoverPreview
                videos={data?.list}
                openVideo={openPreview}
                loading={isLoading}
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
                        src={selectedVideo.path}
                        autoPlay={true}
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

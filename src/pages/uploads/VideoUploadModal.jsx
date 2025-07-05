/** @format */

import { UploadOutlined } from '@ant-design/icons';
import {
    Button,
    Form,
    Input,
    Modal,
    Select,
    Skeleton,
    Typography,
    Upload,
} from 'antd';
import { useState } from 'react';
import { GameSelect } from './GameSelect';
import { useUploadVideo } from '../../entities/uploads/model/api';

export const VideoUplodaModal = ({ uploadModalOpen, setUploadModalOpen }) => {
    const [form] = Form.useForm();
    const [file, setFile] = useState(null);

    const uploadMutation = useUploadVideo();

    const handleUpload = () => {
        form.validateFields()
            .then((values) => {
                if (!file) {
                    message.error('Пожалуйста, выберите видеофайл.');
                    return;
                }

                const formData = new FormData();
                formData.append('video', file);
                formData.append('title', values.title);
                formData.append('game_id', values.game_id);

                uploadMutation.mutate(formData);
            })
            .catch(() => {
                message.error('Пожалуйста, заполните все поля.');
            });
    };

    return (
        <Modal
            open={uploadModalOpen}
            title="Загрузить видео"
            onCancel={() => setUploadModalOpen(false)}
            onOk={handleUpload}
            okText="Загрузить"
        >
            <Skeleton loading={uploadMutation.isPending}>
                <Form layout="vertical" form={form}>
                    <Form.Item
                        name="title"
                        label="Название видео"
                        rules={[
                            { required: true, message: 'Введите название' },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <GameSelect />

                    <Form.Item label="Файл видео">
                        <Upload
                            accept="video/*"
                            beforeUpload={(file) => {
                                setFile(file);
                                return false;
                            }}
                            maxCount={1}
                            showUploadList={{ showRemoveIcon: true }}
                            onRemove={() => setFile(null)}
                        >
                            <Button icon={<UploadOutlined />}>
                                Выбрать файл
                            </Button>
                        </Upload>
                    </Form.Item>
                </Form>
            </Skeleton>
        </Modal>
    );
};

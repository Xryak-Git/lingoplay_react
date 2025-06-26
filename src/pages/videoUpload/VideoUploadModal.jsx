/** @format */

import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Select, Typography, Upload } from 'antd';
import { useState } from 'react';

const { Title } = Typography;
const { Option } = Select;

export const VideoUplodaModal = ({ uploadModalOpen, setUploadModalOpen }) => {
    const [form] = Form.useForm();
    const [file, setFile] = useState(null);

    console.log(uploadModalOpen);

    const handleUpload = () => {
        form.validateFields()
            .then((values) => {
                if (!file) {
                    message.error('Пожалуйста, выберите видеофайл.');
                    return;
                }

                const newVideo = {
                    id: videos.length + 1,
                    url: URL.createObjectURL(file),
                    title: values.title,
                    type: values.type,
                };

                setVideos([...videos, newVideo]);
                form.resetFields();
                setFile(null);
                setUploadModalOpen(false);
                message.success('Видео успешно добавлено!');
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
            <Form layout="vertical" form={form}>
                <Form.Item
                    name="title"
                    label="Название видео"
                    rules={[{ required: true, message: 'Введите название' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="type"
                    label="Тип видео"
                    rules={[{ required: true, message: 'Выберите тип' }]}
                >
                    <Select placeholder="Выберите тип">
                        <Option value="lecture">Лекция</Option>
                        <Option value="interview">Интервью</Option>
                        <Option value="other">Другое</Option>
                    </Select>
                </Form.Item>

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
                        <Button icon={<UploadOutlined />}>Выбрать файл</Button>
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    );
};

/** @format */

import {
    Card,
    Typography,
    Avatar,
    Button,
    Space,
    Divider,
    Skeleton,
    Form,
    Input,
    message,
} from 'antd';
import { useState } from 'react';
import { useUpdateUser, useUser } from '../../entities/user/model/api';
import {
    EditOutlined,
    SaveOutlined,
    LogoutOutlined,
    UserOutlined,
    MailOutlined,
    IdcardOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

export const ProfilePage = () => {
    const { user, isLoading } = useUser();
    const [form] = Form.useForm();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    const { mutate } = useUpdateUser();

    if (isLoading || !user) return <Skeleton active />;

    const handleEditToggle = () => {
        form.setFieldsValue({ username: user.username });
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            const data = await form.validateFields();
            mutate({ id: user.id, data });
            setIsEditing(false);
        } catch (err) {
            console.error('Validation failed:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card
            style={{
                maxWidth: 600,
                margin: '40px auto',
                width: '100%',
                borderRadius: 12,
            }}
            bodyStyle={{ padding: 24 }}
        >
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <Space align="center" size="middle">
                    <Avatar
                        size={64}
                        icon={<UserOutlined />}
                        style={{ backgroundColor: '#87d068' }}
                    />
                    <div>
                        <Title level={3} style={{ margin: 0 }}>
                            {user.username}
                        </Title>
                        <Text type="secondary">
                            Добро пожаловать в LingoPlay!
                        </Text>
                    </div>
                </Space>

                <Divider />

                <Space direction="vertical" style={{ width: '100%' }}>
                    <Text>
                        <IdcardOutlined /> <strong>ID:</strong> {user.id}
                    </Text>
                    <Text>
                        <MailOutlined /> <strong>Email:</strong> {user.email}
                    </Text>
                </Space>

                <Divider />

                <Form form={form} layout="vertical" style={{ width: '100%' }}>
                    <Form.Item
                        name="username"
                        label="Имя пользователя"
                        initialValue={user.username}
                        rules={[
                            {
                                required: true,
                                message: 'Введите имя пользователя',
                            },
                        ]}
                    >
                        <Input
                            disabled={!isEditing}
                            placeholder="Имя пользователя"
                        />
                    </Form.Item>

                    <Space>
                        {isEditing ? (
                            <Button
                                type="primary"
                                icon={<SaveOutlined />}
                                loading={loading}
                                onClick={handleSave}
                            >
                                Сохранить
                            </Button>
                        ) : (
                            <Button
                                type="default"
                                icon={<EditOutlined />}
                                onClick={handleEditToggle}
                            >
                                Редактировать
                            </Button>
                        )}
                    </Space>
                </Form>
            </Space>
        </Card>
    );
};

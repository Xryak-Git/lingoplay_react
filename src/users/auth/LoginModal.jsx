/** @format */

import { Button, Flex, Form, Input, Modal, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useLogin } from './api/api';

const { Text } = Typography;

export const LoginModal = ({ visibleModalLogin, setVisibleModalLogin }) => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const { mutate, isLoading } = useLogin();

    const onFinish = (values) => {
        mutate(values);
        setVisibleModalLogin(false);
    };

    return (
        <Modal
            title="Вход"
            open={visibleModalLogin}
            onCancel={() => setVisibleModalLogin(false)}
            footer={null}
        >
            <Form
                form={form}
                onFinish={onFinish}
                layout="vertical"
                style={{ width: '100%' }}
            >
                <Flex vertical gap="middle">
                    <Form.Item
                        name="email"
                        label="Почта"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста, введите адрес почты',
                            },
                        ]}
                    >
                        <Input
                            size="large"
                            placeholder="Логин..."
                            allowClear
                            suffix={
                                <UserOutlined
                                    style={{ color: 'rgba(0,0,0,.45)' }}
                                />
                            }
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Пароль"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста, введите пароль',
                            },
                        ]}
                    >
                        <Input.Password
                            size="large"
                            allowClear
                            placeholder="Пароль..."
                        />
                    </Form.Item>

                    <Button
                        type="primary"
                        size="large"
                        onClick={() => {
                            form.submit();
                        }}
                    >
                        Войти
                    </Button>
                </Flex>
            </Form>
        </Modal>
    );
};

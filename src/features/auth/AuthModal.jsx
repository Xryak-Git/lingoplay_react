/** @format */

import { Button, Flex, Form, Input, Modal, Typography } from 'antd';
import { UserOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useLogin, useRegistrate } from './model/api';

const { Text } = Typography;

export const AuthModal = ({
    visibleAuthModal,
    setVisibleAuthModal,
    isRegister,
    setIsRegister,
}) => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const loginMutation = useLogin();
    const registerMutation = useRegistrate();

    const onFinish = (values) => {
        const mutation = isRegister ? registerMutation : loginMutation;

        mutation.mutate(values, {
            onSuccess: () => {
                setVisibleAuthModal(false);
                form.resetFields();
            },
        });
    };

    return (
        <Modal
            title={isRegister ? 'Регистрация' : 'Вход'}
            open={visibleAuthModal}
            onCancel={() => {
                setVisibleAuthModal(false);
                form.resetFields();
                setIsRegister(false);
            }}
            footer={null}
        >
            <Form
                form={form}
                onFinish={onFinish}
                layout="vertical"
                style={{ width: '100%' }}
            >
                <Flex vertical>
                    {isRegister && (
                        <Form.Item
                            name="username"
                            label="Имя пользователя"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Пожалуйста, введите имя пользователя латиницей',
                                },
                            ]}
                        >
                            <Input
                                size="large"
                                placeholder="Имя пользователя..."
                                allowClear
                                suffix={<UserOutlined />}
                            />
                        </Form.Item>
                    )}
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
                            placeholder="Почта..."
                            allowClear
                            suffix={<MailOutlined />}
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

                    {isRegister && (
                        <Form.Item
                            name="confirm"
                            label="Повторите пароль"
                            dependencies={['password']}
                            rules={[
                                {
                                    required: true,
                                    message: 'Повторите пароль',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (
                                            !value ||
                                            getFieldValue('password') === value
                                        ) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(
                                            new Error('Пароли не совпадают')
                                        );
                                    },
                                }),
                            ]}
                        >
                            <Input.Password
                                size="large"
                                allowClear
                                placeholder="Повтор пароля..."
                            />
                        </Form.Item>
                    )}

                    <Button
                        type="primary"
                        size="large"
                        loading={
                            loginMutation.isPending ||
                            registerMutation.isPending
                        }
                        onClick={() => form.submit()}
                    >
                        {isRegister ? 'Зарегистрироваться' : 'Войти'}
                    </Button>
                </Flex>
            </Form>
        </Modal>
    );
};

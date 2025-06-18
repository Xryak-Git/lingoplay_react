/** @format */

import { Button, Col, Form, Input, Modal, Row, Spin } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

export const LoginModal = ({ visibleModalLogin, setVisibleModalLogin }) => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = (value) => {};

    return (
        <>
            <Modal
                title="Вход"
                open={visibleModalLogin}
                onCancel={() => setVisibleModalLogin(false)}
                footer={null}
            >
                {/* <Spin size="large" spinning={loading}> */}
                <Form form={form} onFinish={onFinish}>
                    <Row type="flex" justify="center">
                        <Col span={18}>
                            <br />
                            <Row>
                                <Col span={24}>
                                    <Form.Item
                                        name={'username'}
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Пожалуйста, введите логин',
                                            },
                                        ]}
                                    >
                                        <Input
                                            size="large"
                                            placeholder="Логин..."
                                            allowClear
                                            suffix={
                                                <UserOutlined
                                                    style={{
                                                        color: 'rgba(0,0,0,.45)',
                                                    }}
                                                />
                                            }
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col span={24}>
                                    <Form.Item
                                        name={'password'}
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Пожалуйста, введите пароль!',
                                            },
                                        ]}
                                    >
                                        <Input.Password
                                            size="large"
                                            allowClear
                                            placeholder="Пароль..."
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <br />
                            <Row gutter={[16, 16]}>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                    <Button
                                        size="large"
                                        type="primary"
                                        htmlType="submit"
                                        style={{
                                            width: '100%',
                                        }}
                                    >
                                        Войти
                                    </Button>
                                </Col>
                            </Row>
                            <br />
                        </Col>
                    </Row>
                    <p />
                </Form>
                {/* </Spin> */}
            </Modal>
        </>
    );
};

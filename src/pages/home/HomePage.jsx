/** @format */

import { Button, Typography, Card, Space } from 'antd';
import { useUser } from '../../entities/user/model/api';
import { SmileOutlined, PlayCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

export const HomePage = () => {
    const { user } = useUser();

    return (
        <Card>
            <SmileOutlined style={{ fontSize: 48, color: '#52c41a' }} />
            <Title level={2}>Добро пожаловать в LingoPlay!</Title>
            <Paragraph>
                Улучшайте свой словарный запас с помощью мини-игр, челленджей и
                достижений. Начните своё языковое приключение прямо сейчас!
            </Paragraph>
            <Space direction="vertical" size="middle">
                <Button
                    type="primary"
                    icon={<PlayCircleOutlined />}
                    size="large"
                    onClick={() => console.log(user)}
                >
                    Начать игру
                </Button>
                <Button type="default" size="large">
                    Профиль
                </Button>
            </Space>
        </Card>
    );
};

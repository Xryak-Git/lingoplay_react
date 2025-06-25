/** @format */

import { Button, Typography, Card, Space, Flex } from 'antd';
import { useUser } from '../../entities/user/model/api';
import { motion } from 'framer-motion';
import { SmileOutlined, PlayCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

export const Profile = () => {
    const { user } = useUser();

    return (
        <>
            <SmileOutlined style={{ fontSize: 48, color: '#52c41a' }} />
            <Title level={2}>Добро пожаловать в LingoPlay!</Title>
            <Paragraph>
                Улучшайте свой словарный запас с помощью мини-игр, челленджей и
                достижений. Начните своё языковое приключение прямо сейчас!
            </Paragraph>
        </>
    );
};

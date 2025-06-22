/** @format */

import { Button, Typography, Layout } from 'antd';
import { useUser } from '../users/auth/api/api';
const { Title, Paragraph } = Typography;

const Home = () => {
    const { user } = useUser();
    return (
        <>
            <Title>Добро пожаловать!</Title>
            <Paragraph>
                Это ваша первая страница на React с Ant Design.
            </Paragraph>
            <Button
                type="primary"
                onClick={() => {
                    console.log(user);
                }}
            >
                Нажми меня
            </Button>
        </>
    );
};
export default Home;

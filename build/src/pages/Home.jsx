import { Button, Typography, Layout } from 'antd';
const { Title, Paragraph } = Typography;
const Home = () => {
    return (<>
        <Title>Добро пожаловать!</Title>
        <Paragraph>Это ваша первая страница на React с Ant Design.</Paragraph>
        <Button type="primary">Нажми меня</Button>
    </>);
};
export default Home;

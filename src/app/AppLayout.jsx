/** @format */

import { Flex, Layout } from 'antd';

import HeaderTop from '../widgets/SiteHeader/HeaderTop';

/** @format */

const { Footer, Content } = Layout;
export default function AppLayout({ children }) {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <HeaderTop />
            <Content>
                <Container>{children}</Container>
            </Content>
            <Footer></Footer>
        </Layout>
    );
}

const Container = ({ children, style }) => (
    <Flex
        vertical
        justify="center"
        align="center"
        style={{
            width: '100%',
            maxWidth: 1500,
            padding: '0 16px',
            margin: '0 auto',
            minHeight: '100vh',
            ...style,
        }}
    >
        <div style={{ flex: 1, width: '100%' }}>{children}</div>
    </Flex>
);

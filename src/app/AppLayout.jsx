/** @format */

import { Layout } from 'antd';

import HeaderTop from '../widgets/SiteHeader/HeaderTop';

/** @format */

const { Footer, Content } = Layout;
export default function AppLayout({ children }) {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <HeaderTop />
            {/* <Navbar /> */}
            <Content>{children}</Content>
            <Footer></Footer>
        </Layout>
    );
}

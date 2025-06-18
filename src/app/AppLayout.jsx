/** @format */

import { FloatButton, Layout } from 'antd';
import { UpOutlined } from '@ant-design/icons';

import Navbar from '../base/Navbar';
import HeaderTop from '../base/HeaderTop';

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

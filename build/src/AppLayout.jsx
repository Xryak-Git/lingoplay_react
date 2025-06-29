/** @format */
import { FloatButton, Layout } from 'antd';
import { UpOutlined } from '@ant-design/icons';
import Navbar from './Navbar';
import HeaderTop from './HeaderTop';
/** @format */
const { Footer, Content } = Layout;
export default function AppLayout({ children }) {
    return (<Layout style={{ minHeight: '100vh' }}>
            <FloatButton.BackTop visibilityHeight="100" icon={<UpOutlined />} className="components-back-top-demo-custom ant-back-top-inner"/>
            <HeaderTop />
            <Navbar />
            <Content>{children}</Content>
            <Footer></Footer>
        </Layout>);
}

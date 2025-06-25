/** @format */

import { Link } from 'react-router-dom';
import { Space } from 'antd';
import logo from '../../static/lingoplay.png';

export const Logo = () => (
    <Link to="/">
        <Space align="center">
            <img alt="?" src={logo} style={{ height: '80px' }} />
        </Space>
    </Link>
);

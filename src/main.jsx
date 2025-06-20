/** @format */

import { App as AntdApp } from 'antd';
import 'antd/dist/reset.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AntdApp>
            <App />
        </AntdApp>
    </StrictMode>
);

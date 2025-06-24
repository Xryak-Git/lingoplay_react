/** @format */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ConfigProvider } from 'antd';
import 'antd/dist/reset.css';
import './index.css';

import App from './app/App.jsx';
import { ThemeProvider, useTheme } from './themeContext.jsx';
import { ThemeVars } from './ThemeVars';

function Root() {
    const { themeConfig, isDarkMode } = useTheme();
    return (
        <ConfigProvider theme={themeConfig}>
            <ThemeVars isDarkMode={isDarkMode} />
            <App />
        </ConfigProvider>
    );
}

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ThemeProvider>
            <Root />
        </ThemeProvider>
    </StrictMode>
);

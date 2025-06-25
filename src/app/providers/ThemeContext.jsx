/** @format */

import { createContext, useContext, useState } from 'react';
import { theme } from 'antd';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [isDarkMode, setIsDarkMode] = useState(true);

    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    const themeConfig = {
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
            colorPrimary: '#C2B280',
            colorText: isDarkMode ? '#D2B48C' : '#1C1E26',
            colorIcon: isDarkMode ? '#E5D8A8' : '#1C1E26',
            colorIconHover: isDarkMode ? '#FFF2B2' : '#5C3B00',
            colorBgBase: isDarkMode ? '#0F0F0F' : '#ffffff',
            colorBgContainer: isDarkMode ? '#1A1A1A' : '#f0f2f5',
            fontFamily: "'Courier New', monospace",
            borderRadius: 2,
        },
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme, themeConfig }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);

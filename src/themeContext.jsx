/** @format */

// src/themeContext.jsx
import { createContext, useContext, useState } from 'react';
import { theme } from 'antd';
import { ThemeVars } from './ThemeVars';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [isDarkMode, setIsDarkMode] = useState(true);

    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    const themeConfig = {
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
            colorPrimary: '#5EEAD4',
            colorText: isDarkMode ? '#AAB2C5' : '#1C1E26',
            colorBgBase: isDarkMode ? '#1C1E26' : '#ffffff',
            colorBgContainer: isDarkMode ? '#2E3440' : '#f0f2f5',
            fontFamily: "'Inter', sans-serif",
            borderRadius: 8,
        },
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme, themeConfig }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);

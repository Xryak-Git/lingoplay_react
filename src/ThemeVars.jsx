/** @format */

import { useEffect } from 'react';

export function ThemeVars({ isDarkMode }) {
    useEffect(() => {
        const root = document.documentElement;

        root.style.setProperty(
            '--header-bg',
            isDarkMode ? '#1C1E26' : '#ffffff'
        );
        root.style.setProperty(
            '--header-border',
            isDarkMode ? '#2E3440' : '#e8e8e8'
        );
        root.style.setProperty(
            '--header-text',
            isDarkMode ? '#AAB2C5' : '#1C1E26'
        );
    }, [isDarkMode]);

    return null;
}

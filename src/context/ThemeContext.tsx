import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { useColorScheme, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightTheme, darkTheme, Theme } from '../themes';

interface ThemeContextType {
    theme: Theme;
    isDarkMode: boolean;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = '@TaskApp:theme';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const systemColorScheme = useColorScheme();
    const [currentTheme, setCurrentTheme] = useState<Theme>(lightTheme);
    const [isDarkMode, setIsDarkMode] = useState<boolean>(systemColorScheme === 'dark');

    useEffect(() => {
        const loadTheme = async () => {
            try {
                const storedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
                if (storedTheme !== null) {
                    const isDark = storedTheme === 'dark';
                    setIsDarkMode(isDark);
                    setCurrentTheme(isDark ? darkTheme : lightTheme);
                } else {
                    // Use system preference if no user preference is stored
                    setIsDarkMode(systemColorScheme === 'dark');
                    setCurrentTheme(systemColorScheme === 'dark' ? darkTheme : lightTheme);
                }
            } catch (error) {
                console.error('Failed to load theme from storage:', error);
            }
        };

        loadTheme();
    }, [systemColorScheme]);

    const toggleTheme = async () => {
        const newIsDarkMode = !isDarkMode;
        setIsDarkMode(newIsDarkMode);
        setCurrentTheme(newIsDarkMode ? darkTheme : lightTheme);
        try {
            await AsyncStorage.setItem(THEME_STORAGE_KEY, newIsDarkMode ? 'dark' : 'light');
        } catch (error) {
            console.error('Failed to save theme to storage:', error);
        }
    };

    useEffect(() => {
        StatusBar.setBarStyle(currentTheme.statusBarStyle, true);
    }, [currentTheme]);

    return (
        <ThemeContext.Provider value={{ theme: currentTheme, isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
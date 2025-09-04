import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
    const { isDarkMode, toggleTheme, theme } = useTheme();

    return (
        <TouchableOpacity style={styles.button} onPress={toggleTheme}>
            <Icon
                name={isDarkMode ? 'white-balance-sunny' : 'moon-waning-crescent'}
                size={24}
                color={theme.colors.primaryText}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 10,
        marginRight: 10,
    },
});

export default ThemeToggle;
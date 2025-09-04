export const lightTheme = {
    colors: {
        background: '#f0f4f7',
        surface: '#ffffff',
        text: '#1a202c',
        textMuted: '#4a5568',
        inputBackground: '#ffffff',
        inputBorder: '#e2e8f0',
        cardBackground: '#ffffff',
        cardCompletedBackground: '#e2e8f0',
        primary: '#4c51bf',
        primaryText: '#ffffff',
        secondary: '#e2e8f0',
        secondaryText: '#4a5568',
        icon: '#757575',
        completedIcon: '#4CAF50',
        deleteIcon: '#F44336',
        skeletalBackground: '#e0e0e0'
    },
    statusBarStyle: 'dark-content' as 'dark-content' | 'light-content',
};

export const darkTheme = {
    colors: {
        background: '#121212',
        surface: '#1e1e1e',
        text: '#e0e0e0',
        textMuted: '#a0a0a0',
        inputBackground: '#2d2d2d',
        inputBorder: '#4a4a4a',
        cardBackground: '#1e1e1e',
        cardCompletedBackground: '#2d2d2d',
        primary: '#6b72f1',
        primaryText: '#ffffff',
        secondary: '#4a4a4a',
        secondaryText: '#e0e0e0',
        icon: '#a0a0a0',
        completedIcon: '#66bb6a',
        deleteIcon: '#ef5350',
        skeletalBackground:'#2d2d2d'
    },
    statusBarStyle: 'light-content' as 'dark-content' | 'light-content',
};

export type Theme = typeof lightTheme;
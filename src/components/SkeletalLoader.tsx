import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const SkeletalLoader = () => {
    const { theme } = useTheme();
    const opacity = useRef(new Animated.Value(0.4)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 0.4,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [opacity]);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
            paddingHorizontal: 20,
            paddingTop: 20,
        },
        skeletonItem: {
            backgroundColor: theme.colors.skeletalBackground,
            borderRadius: 8,
            marginBottom: 10,
        },
        headerPlaceholder: {
            height: 28,
            width: '60%',
            alignSelf: 'center',
            marginBottom: 20,
        },
        searchPlaceholder: {
            height: 50,
            marginBottom: 10,
        },
        tabsContainer: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            borderRadius: 10,
            padding: 10,
            marginBottom: 20,
            backgroundColor: theme.colors.surface,
        },
        tabPlaceholder: {
            height: 20,
            width: '25%',
            borderRadius: 8,
            backgroundColor: theme.colors.skeletalBackground,
        },
        taskItemPlaceholder: {
            height: 70,
            marginBottom: 10,
        },
    });

    const renderTaskPlaceholders = () => {
        return Array(5).fill(0).map((_, index) => (
            <Animated.View
                key={index}
                style={[styles.skeletonItem, styles.taskItemPlaceholder, { opacity }]}
            />
        ));
    };

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.skeletonItem, styles.headerPlaceholder, { opacity }]} />
            <Animated.View style={[styles.skeletonItem, styles.searchPlaceholder, { opacity }]} />
            <View style={styles.tabsContainer}>
                <Animated.View style={[styles.skeletonItem, styles.tabPlaceholder, { opacity }]} />
                <Animated.View style={[styles.skeletonItem, styles.tabPlaceholder, { opacity }]} />
                <Animated.View style={[styles.skeletonItem, styles.tabPlaceholder, { opacity }]} />
            </View>
            {renderTaskPlaceholders()}
        </View>
    );
};

export default SkeletalLoader;
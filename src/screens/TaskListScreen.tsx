import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    TextInput,
    Alert,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { loadTasks, saveTasks } from '../utils/storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Task, ScreenNavigationProp } from '../types';
import TaskItem from '../components/TaskItem';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';
import SkeletalLoader from '../components/SkeletalLoader';


const TaskListScreen: React.FC = () => {
    const { theme } = useTheme();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [activeTab, setActiveTab] = useState<'All' | 'Todo' | 'Completed'>('All');

    const navigation = useNavigation<ScreenNavigationProp>();

    // useLayout effect because i want the theme to render even before the page renders
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <ThemeToggle />,
            headerStyle: { backgroundColor: theme.colors.primary },
            headerTintColor: theme.colors.primaryText,
        });
    }, [navigation, theme]);

    // fetching tasks from the storage
    const fetchTasks = async () => {
        setIsLoading(true);
        const storedTasks = await loadTasks();
        setTasks(storedTasks);
        setIsLoading(false);
    };

    // Get the tasks, everytime user creates new tasks
    useFocusEffect(
        useCallback(() => {
            fetchTasks();
        }, [])
    );

    // toggle tasks
    const handleToggleTask = async (taskId: string) => {
        const newTasks = tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        );
        setTasks(newTasks);
        await saveTasks(newTasks);
    };

    // delete tasks
    const handleDeleteTask = (taskId: string) => {
        Alert.alert(
            'Delete Task',
            'Are you sure you want to delete this task?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: async () => {
                        const newTasks = tasks.filter((task) => task.id !== taskId);
                        setTasks(newTasks);
                        await saveTasks(newTasks);
                    },
                    style: 'destructive',
                },
            ],
            { cancelable: true }
        );
    };

    // sorting of task by due date
    const sortedTasks = [...tasks].sort((a, b) => {
        const dateA = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
        const dateB = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
        return dateA - dateB;
    });

    // filter tasks
    const filteredTasks = sortedTasks.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const completedTasks = filteredTasks.filter(task => task.completed);
    const incompleteTasks = filteredTasks.filter(task => !task.completed);

    const allCount = filteredTasks.length;
    const todoCount = incompleteTasks.length;
    const completedCount = completedTasks.length;

    let dataToDisplay: Task[] = [];
    if (activeTab === 'Todo') {
        dataToDisplay = incompleteTasks;
    } else if (activeTab === 'Completed') {
        dataToDisplay = completedTasks;
    } else {
        dataToDisplay = filteredTasks;
    }

    // tab rendering
    const renderTab = (tabName: 'All' | 'Todo' | 'Completed', count: number) => {
        const isActive = activeTab === tabName;
        return (
            <TouchableOpacity
                style={[styles.tabButton, isActive && { backgroundColor: theme.colors.primary, borderRadius: 10 }]}
                onPress={() => setActiveTab(tabName)}
            >
                <Text style={[styles.tabText, { color: isActive ? theme.colors.primaryText : theme.colors.textMuted }]}>
                    {tabName} ({count})
                </Text>
            </TouchableOpacity>
        );
    };

    // styles
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
        },
        headerTitle: {
            fontSize: 28,
            fontWeight: 'bold',
            color: theme.colors.text,
            textAlign: 'center',
            paddingTop: 20,
        },
        centered: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        searchInput: {
            backgroundColor: theme.colors.inputBackground,
            padding: 15,
            borderRadius: 8,
            fontSize: 16,
            margin: 20,
            marginBottom: 10,
            borderWidth: 1,
            borderColor: theme.colors.inputBorder,
            color: theme.colors.text,
        },
        tabContainer: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginHorizontal: 20,
            marginTop: 10,
            marginBottom: 20,
            backgroundColor: theme.colors.surface,
            borderRadius: 10,
            elevation: 2,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            padding: 10,
        },
        tabButton: {
            flex: 1,
            paddingVertical: 12,
            alignItems: 'center'
        },
        tabText: {
            fontSize: 16,
            fontWeight: 'bold',
        },
        list: {
            paddingHorizontal: 20,
            paddingBottom: 80,
        },
        listHeader: {
            fontSize: 20,
            fontWeight: 'bold',
            color: theme.colors.text,
            marginTop: 15,
            marginBottom: 10,
        },
        emptyText: {
            fontSize: 18,
            color: theme.colors.textMuted,
            textAlign: 'center',
        },
        fab: {
            position: 'absolute',
            right: 30,
            bottom: 30,
            backgroundColor: theme.colors.primary,
            width: 60,
            height: 60,
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 8,
            shadowColor: theme.colors.primary,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
        },
    });

    if (isLoading) {
        return (
            <SkeletalLoader/>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle} testID="task-list-title">My Tasks</Text>
            <TextInput
                style={styles.searchInput}
                placeholder="Search tasks..."
                placeholderTextColor={theme.colors.textMuted}
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            <View style={styles.tabContainer}>
                {renderTab('All', allCount)}
                {renderTab('Todo', todoCount)}
                {renderTab('Completed', completedCount)}
            </View>

            {dataToDisplay.length === 0 && (
                <View style={styles.centered}>
                    <Text style={styles.emptyText}>
                        {searchQuery ? 'No matching tasks found.' : 'No tasks yet. Add one! ✨'}
                    </Text>
                </View>
            )}

            <FlatList
                data={dataToDisplay}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TaskItem
                        task={item}
                        onToggle={handleToggleTask}
                        onDelete={handleDeleteTask}
                    />
                )}
                contentContainerStyle={styles.list}
            />
            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('AddTask')}
            >
                <Icon name="plus" size={30} color={theme.colors.primaryText} />
            </TouchableOpacity>
        </View>
    );
};

export default TaskListScreen;
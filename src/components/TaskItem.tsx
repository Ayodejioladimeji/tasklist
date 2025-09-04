import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Task } from '../types';
import { useTheme } from '../context/ThemeContext';

interface TaskItemProps {
    task: Task;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
    const { theme } = useTheme();
    const isCompleted = task.completed;

    const formattedDate = task.dueDate
        ? new Date(task.dueDate).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        })
        : null;

        // styles
    const styles = StyleSheet.create({
        taskItemContainer: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            padding: 15,
            borderRadius: 8,
            marginBottom: 10,
            elevation: 2,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            backgroundColor: isCompleted ? theme.colors.cardCompletedBackground : theme.colors.cardBackground,
        },
        taskContent: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            flex: 1,
        },
        taskDetails: {
            marginLeft: 15,
            flex: 1,
        },
        taskTitle: {
            fontSize: 18,
            fontWeight: '600',
            color: isCompleted ? theme.colors.textMuted : theme.colors.text,
        },
        taskText: {
            fontSize: 16,
            color: theme.colors.text,
        },
        taskDescription: {
            fontSize: 14,
            color: theme.colors.textMuted,
            marginTop: 4,
        },
        taskDueDate: {
            fontSize: 12,
            color: theme.colors.textMuted,
            marginTop: 4,
        },
        completedText: {
            textDecorationLine: 'line-through',
            color: theme.colors.textMuted,
        },
        actionButton: {
            padding: 0,
        },
    });

    return (
        <View style={styles.taskItemContainer}>
            <TouchableOpacity testID="toggle-task" onPress={() => onToggle(task.id)} style={styles.taskContent}>
                <Icon
                    name={isCompleted ? 'checkbox-marked-circle-outline' : 'checkbox-blank-circle-outline'}
                    size={24}
                    color={isCompleted ? theme.colors.completedIcon : theme.colors.icon}
                />
                <View style={styles.taskDetails}>
                    <Text style={[styles.taskTitle]}>{task.title}</Text>
                    {task.description && <Text style={styles.taskDescription}>{task.description}</Text>}
                    {formattedDate && (
                        <Text style={styles.taskDueDate}>
                            Due: {formattedDate}
                        </Text>
                    )}
                </View>
            </TouchableOpacity>
            <TouchableOpacity testID="delete-task" onPress={() => onDelete(task.id)} style={styles.actionButton}>
                <Icon name="delete-outline" size={24} color={theme.colors.deleteIcon} />
            </TouchableOpacity>
        </View>
    );
};

export default TaskItem;
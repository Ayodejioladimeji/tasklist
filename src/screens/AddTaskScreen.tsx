import 'react-native-get-random-values';

import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { v4 as uuidv4 } from 'uuid';
import DateTimePicker from '@react-native-community/datetimepicker';
import { loadTasks, saveTasks } from '../utils/storage';
import { ScreenNavigationProp } from '../types';
import { useTheme } from '../context/ThemeContext';

const AddTaskScreen: React.FC = () => {
    const { theme } = useTheme();
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [date, setDate] = useState<Date>(new Date());
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

    const navigation = useNavigation<ScreenNavigationProp>();

    // add tasks method
    const handleAddTask = async () => {
        if (title.trim() === '') {
            Alert.alert('Validation Error', 'Task title cannot be empty.');
            return;
        }


        const newTask = {
            id: uuidv4(),
            title: title.trim(),
            description: description.trim(),
            completed: false,
            dueDate: date.toISOString(),
        };

        const existingTasks = await loadTasks();
        const updatedTasks = [...existingTasks, newTask];
        await saveTasks(updatedTasks);

        navigation.goBack();
    };

    // date onchange
    const handleDateChange = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setDate(currentDate);
    };

    // styles
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
            backgroundColor: theme.colors.background,
        },
        heading: {
            fontSize: 24,
            fontWeight: 'bold',
            color: theme.colors.text,
            marginBottom: 20,
            textAlign: 'center',
        },
        input: {
            backgroundColor: theme.colors.inputBackground,
            padding: 15,
            borderRadius: 8,
            fontSize: 16,
            marginBottom: 15,
            borderWidth: 1,
            borderColor: theme.colors.inputBorder,
            color: theme.colors.text,
        },
        descriptionInput: {
            height: 100,
            textAlignVertical: 'top',
        },
        datePickerButton: {
            backgroundColor: theme.colors.secondary,
            padding: 15,
            borderRadius: 8,
            marginBottom: 15,
            alignItems: 'center',
        },
        datePickerText: {
            fontSize: 16,
            color: theme.colors.secondaryText,
        },
        addTaskButton: {
            backgroundColor: theme.colors.primary,
            padding: 15,
            borderRadius: 8,
            alignItems: 'center',
            marginTop: 10,
        },
        addTaskButtonText: {
            color: theme.colors.primaryText,
            fontSize: 18,
            fontWeight: 'bold',
        },
        tipsContainer: {
            marginTop: 30,
            padding: 15,
            backgroundColor: theme.colors.cardBackground,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: theme.colors.inputBorder,
        },
        tipsHeading: {
            fontSize: 16,
            fontWeight: 'bold',
            color: theme.colors.textMuted,
            marginBottom: 8,
        },
        tipText: {
            fontSize: 14,
            color: theme.colors.textMuted,
            marginBottom: 4,
        },
    });

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Create a New Task</Text>

            <TextInput
                style={styles.input}
                placeholder="Task Title"
                value={title}
                onChangeText={setTitle}
                placeholderTextColor={theme.colors.textMuted}
            />

            <TextInput
                style={[styles.input, styles.descriptionInput]}
                placeholder="Description (Optional)"
                value={description}
                onChangeText={setDescription}
                multiline
                placeholderTextColor={theme.colors.textMuted}
            />

            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerButton}>
                <Text style={styles.datePickerText}>
                    Due Date: {date.toLocaleDateString()}
                </Text>
            </TouchableOpacity>

            {showDatePicker && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                />
            )}

            <TouchableOpacity style={styles.addTaskButton} onPress={handleAddTask}>
                <Text style={styles.addTaskButtonText}>Add Task</Text>
            </TouchableOpacity>

            <View style={styles.tipsContainer}>
                <Text style={styles.tipsHeading}>Quick Tips 💡</Text>
                <Text style={styles.tipText}>• Keep task titles short and descriptive</Text>
                <Text style={styles.tipText}>• Use descriptions for additional context or notes</Text>
                <Text style={styles.tipText}>• Set due dates to stay on track with deadlines</Text>
                <Text style={styles.tipText}>• You can edit tasks later from the task list</Text>
            </View>
        </View>
    );
};

export default AddTaskScreen;
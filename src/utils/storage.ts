import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../types'; 

const TASKS_STORAGE_KEY = '@TaskManager:tasks';

// retrieve tasks from storage
export const loadTasks = async (): Promise<Task[]> => {
    try {
        const jsonValue = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
        return jsonValue != null ? (JSON.parse(jsonValue) as Task[]) : [];
    } catch (e) {
        console.error('Failed to load tasks.', e);
        return [];
    }
};

// save tasks to storage
export const saveTasks = async (tasks: Task[]): Promise<void> => {
    try {
        const jsonValue = JSON.stringify(tasks);
        await AsyncStorage.setItem(TASKS_STORAGE_KEY, jsonValue);
    } catch (e) {
        console.error('Failed to save tasks.', e);
    }
};
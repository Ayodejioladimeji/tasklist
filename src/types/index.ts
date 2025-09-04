import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Defines the structure of a single task object
export interface Task {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
    dueDate?:string
}

export type RootStackParamList = {
    TaskList: undefined;
    AddTask: undefined;
};

export type ScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
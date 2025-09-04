import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TaskListScreen from '../screens/TaskListScreen';
import AddTaskScreen from '../screens/AddTaskScreen';
import { RootStackParamList } from '../types';


const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: '#4c51bf' },
                headerTintColor: '#fff',
                headerTitleStyle: { fontWeight: 'bold' },
                headerTitleAlign: 'center',
            }}>
            <Stack.Screen
                name="TaskList" 
                component={TaskListScreen}
                options={{ title: 'My Tasks' }}
            />
            <Stack.Screen
                name="AddTask" 
                component={AddTaskScreen}
                options={{ title: 'Add a New Task' }}
            />
        </Stack.Navigator>
    );
};

export default AppNavigator;
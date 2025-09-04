import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import AddTaskScreen from "../src/screens/AddTaskScreen";
import { saveTasks, loadTasks } from "../src/utils/storage";
import { Alert } from "react-native";

jest.mock("uuid", () => ({
    v4: jest.fn(() => "mocked-uuid"),
}));

jest.mock("@react-navigation/native", () => ({
    useNavigation: () => ({
        navigate: jest.fn(),
        goBack: jest.fn(),
    }),
}));

jest.mock("../src/utils/storage", () => ({
    loadTasks: jest.fn(),
    saveTasks: jest.fn(),
}));

jest.mock('@react-native-community/datetimepicker', () => {
    const { View } = require('react-native');
    return (props: any) => <View {...props} />;
});

describe("AddTaskScreen", () => {
    it("shows validation alert if title is empty", async () => {
        const alertMock = jest.spyOn(Alert, "alert").mockImplementation(() => { });
        const { getByText } = render(<AddTaskScreen />);
        fireEvent.press(getByText("Add Task"));
        await waitFor(() => {
            expect(alertMock).toHaveBeenCalled();
        });
        alertMock.mockRestore();
    });

    it("saves a new task when title is provided", async () => {
        const saveMock = saveTasks as jest.Mock;
        const loadMock = loadTasks as jest.Mock;
        loadMock.mockResolvedValueOnce([]);
        saveMock.mockResolvedValueOnce(undefined);
        const { getByPlaceholderText, getByText } = render(<AddTaskScreen />);
        fireEvent.changeText(getByPlaceholderText("Task Title"), "New Task");
        fireEvent.press(getByText("Add Task"));
        await waitFor(() => {
            expect(saveMock).toHaveBeenCalled();
        });
    });
});

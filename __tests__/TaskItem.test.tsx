import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import TaskItem from "../src/components/TaskItem";
import { Task } from "../src/types";

// Mock react-native-vector-icons to prevent errors in tests
jest.mock("react-native-vector-icons/MaterialCommunityIcons", () => {
    return ({ name, size, color }: any) => {
        return <></>; // Render nothing for icons
    };
});

describe("TaskItem Component", () => {
    const baseTask: Task = {
        id: "1",
        title: "Test Task",
        description: "This is a test task",
        completed: false,
        dueDate: "2025-09-04T00:00:00.000Z",
    };

    const onToggleMock = jest.fn();
    const onDeleteMock = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders task title, description, and due date", () => {
        const { getByText } = render(
            <TaskItem task={baseTask} onToggle={onToggleMock} onDelete={onDeleteMock} />
        );

        expect(getByText("Test Task")).toBeTruthy();
        expect(getByText("This is a test task")).toBeTruthy();
        expect(getByText(/Due:/)).toBeTruthy();
    });

    it("calls onToggle when the task is pressed", () => {
        const { getByTestId } = render(
            <TaskItem task={baseTask} onToggle={onToggleMock} onDelete={onDeleteMock} />
        );

        fireEvent.press(getByTestId("toggle-task"));
        expect(onToggleMock).toHaveBeenCalledWith("1");
    });

    it("calls onDelete when delete button is pressed", () => {
        const { getByTestId } = render(
            <TaskItem task={baseTask} onToggle={onToggleMock} onDelete={onDeleteMock} />
        );

        fireEvent.press(getByTestId("delete-task"));
        expect(onDeleteMock).toHaveBeenCalledWith("1");
    });

    it("applies completed styles when task is completed", () => {
        const completedTask = { ...baseTask, completed: true };
        const { getByText } = render(
            <TaskItem task={completedTask} onToggle={onToggleMock} onDelete={onDeleteMock} />
        );

        const title = getByText("Test Task");
        const styles = Array.isArray(title.props.style) ? title.props.style : [title.props.style];
        const hasLineThrough = styles.some((s) => s && s.textDecorationLine === "line-through");
        expect(hasLineThrough).toBe(true);
    });
});

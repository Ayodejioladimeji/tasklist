// __tests__/App.test.tsx
import React from "react";
import { render } from "@testing-library/react-native";
import App from "../App";

// Manual Mock for AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

// Mocks for react-navigation and react-native-safe-area-context
// This is the correct, combined mock for @react-navigation/native
jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    NavigationContainer: ({ children }: any) => <>{children}</>,
    // Mock for the 'useNavigation' hook
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
    }),
  };
});

// Manual Mock for @react-navigation/native-stack
jest.mock("@react-navigation/native-stack", () => ({
  createNativeStackNavigator: () => ({
    Navigator: ({ children }: any) => <>{children}</>,
    Screen: ({ children }: any) => <>{children}</>,
  }),
}));

// Mock for react-native-vector-icons
jest.mock("react-native-vector-icons/MaterialCommunityIcons", () => "Icon");

// Mock for react-native-safe-area-context
jest.mock("react-native-safe-area-context", () => {
  const SafeAreaProvider = ({ children }: any) => children;
  return {
    SafeAreaProvider,
    useSafeAreaInsets: () => ({ top: 0, left: 0, right: 0, bottom: 0 }),
  };
});

// Manual Mock for uuid
jest.mock("uuid", () => ({
  v4: () => "mocked-uuid-4",
}));

// Manual Mock for @react-native-community/datetimepicker
jest.mock('@react-native-community/datetimepicker', () => {
  const { View } = require('react-native');
  return (props: any) => <View {...props} />;
});

describe("App.tsx", () => {
  it("renders without crashing", () => {
    expect(() => render(<App />)).not.toThrow();
  });
});
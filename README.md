# TaskList

Welcome to TaskList! This is a simple, yet powerful, React Native application for managing your daily to-do lists. Keep track of your tasks, mark them as complete, and stay organized.

## Features

- **Add Tasks**: Quickly add new tasks with a title and an optional description and due date.
- **Toggle Completion**: Easily mark tasks as completed or incomplete.
- **Filter Tasks**: View tasks based on their status: All, Todo, or Completed.
- **Search**: Find specific tasks instantly using the search bar.
- **Delete**: Remove tasks you no longer need.
- **Persistence**: Your tasks are saved locally on your device, so they'll be there even after you close the app.
- **Sorting**: Tasks are automatically sorted by due date to keep you on track.

## Getting Started

Follow these steps to get a copy of the project up and running on your local machine.

### Prerequisites

Make sure you have Node.js and npm installed. You'll also need to set up your React Native development environment. Follow the official React Native documentation for detailed instructions:
https://reactnative.dev/docs/environment-setup

### Installation

1. Clone the repository:
   ```bash
   git clone https://your-repo-link.git
   ```

2. Navigate to the project directory:
   ```bash
   cd my-tasks-app
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

## Running the App

You can run the app on either an iOS or Android emulator.

### For iOS
```bash
npx react-native run-ios
```

### For Android
```bash
npx react-native run-android
```

## Project Structure

- **src/screens**: Contains the main screen components, such as TaskListScreen and AddTaskScreen.
- **src/components**: Reusable UI components like TaskItem and tab buttons.
- **src/utils**: Utility functions, including local storage logic for saving and loading tasks.
- **src/types**: TypeScript type definitions for the application's data structures.
- **__tests__**: Jest test files for unit and integration testing.

## Technologies Used

- **React Native**: The framework for building the mobile app.
- **TypeScript**: For type safety and better code quality.
- **React Navigation**: For handling screen navigation within the app.
- **Jest & React Native Testing Library**: For writing robust tests to ensure functionality.
- **React Native Vector Icons**: For displaying icons.

## Contributing

Contributions are what make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## License

Distributed under the MIT License. See `LICENSE` for more information.
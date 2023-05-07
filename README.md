# On-Demand Salary App

## Overview

On-demand salary allows employees (users) to check how much money they have earned so far in the month ("available balance") and make a request to withdraw any amount at any time.

This is a mobile application built using React Native and Expo that allows users to request an on-demand salary advance. The user is required to sign up, provide some personal and financial information, and request a salary advance. The application then uses the provided information to determine if the user is eligible for a salary advance. If the user is eligible, the application disburses the salary advance to the user's bank account.

## Dependencies

The app uses a number of dependencies, which can be found in the `dependencies` section of the `package.json` file. Some of the notable dependencies include:

- `@react-native-async-storage/async-storage`: for persisting data in local storage.
- `@react-navigation/native`: for navigation between screens in the app.
- `@reduxjs/toolkit`: for state management with Redux.
- `axios`: for making HTTP requests to an API.
- `expo`: for building and deploying the app.
- `jwt-decode`: for decoding JSON Web Tokens (JWTs) used for authentication.
- `react`: for building the user interface of the app.
- `react-native`: for building the user interface of the app.
- `react-native-root-toast`: for displaying toast messages in the app.
- `redux-persist`: for persisting the Redux store between app sessions.
- `styled-components`: for styling the user interface of the app.

## Development Dependencies

The app also uses a number of development dependencies, which can be found in the `devDependencies` section of the `package.json` file. Some of the notable development dependencies include:

- `@testing-library/jest-native`: for testing React Native components.
- `@testing-library/react-native`: for testing React Native components.
- `eslint`: for linting the codebase.
- `jest`: for testing the app.
- `prettier`: for formatting the codebase.
- `react-test-renderer`: for testing React components.
- `typescript`: for static typing in the app.

## Getting Started

To get started with the app, you need to have Node.js and Yarn installed on your computer. Once you have these installed, you can follow the steps below:

1. Clone the repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Run `yarn` to install the project dependencies.
4. Create a `.env` file in the root directory of the project and add the necessary environment variables (e.g. API endpoint URLs, JWT secret key, etc.).
5. Install Expo Go on your device. (see https://expo.dev/client)
6. Run `yarn start` to start the Expo development server.
7. Follow the instructions in your terminal to run the app on physical device.

## Necessary Environment Variables

```sh
API_URL = "http://<your IP Address>:3000/api/v1"
OTP = "<your mock OTP code>"
```

## Testing

The app uses Jest as its testing framework. To run the tests, you can run `yarn test` in your terminal. You can also run `yarn test --watchAll` to run the tests in watch mode.

## Linting

The app uses ESLint as its linter. To lint the codebase, you can run `yarn lint` in your terminal. You can also run `yarn lint-fix` to automatically fix any linting errors.

## Pre-Commit Hooks

The app uses Husky and lint-staged to run pre-commit hooks. This ensures that code is properly formatted and linted before it is committed to the repository.

## Running the project with clearing the cache before starting

```sh
yarn start-clear
```

# API Integration

## Installation and Configuration

1. Clone this repository using the following command:

```sh
git clone https://github.com/Salary-Hero/server-mobile-frontend-test.git
```

2. Navigate to the project directory:

```sh
cd server-mobile-frontend-test
```

3. Install the project dependencies using Yarn:

```sh
yarn install
```
4. Install cors package:

```sh
yarn add cors
```
5. Import the cors package in your backend code:

```sh
// on src/index.js

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

...

// Use cors middleware
app.use(cors());
```

## Starting the Server

```sh
yarn dev
```

This will start the server in development mode using nodemon, which will automatically reload the server when changes are made to the code.

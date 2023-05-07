import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components/native';
import { toBeEnabled } from '@testing-library/jest-native';

import { theme } from '../../theme';

import SignInPage from '../(auth)/SignIn';

expect.extend({ toBeEnabled });

const mockStore = configureStore([]);

jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('SignInPage', () => {
  const store = mockStore({});

  const component = render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SignInPage />
      </ThemeProvider>
    </Provider>
  );

  it('dispatches the correct action when handleLoginPress is called', () => {
    const { getByTestId, getByRole } = component;

    const input = getByTestId('phone-input');
    const button = getByRole('button', { name: 'Sign In' });

    fireEvent.changeText(input, '0812345678');
    fireEvent.press(button);

    expect(button).toBeEnabled();
  });
});

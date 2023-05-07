import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { ThemeProvider } from 'styled-components/native';
import { useRoute } from '@react-navigation/native';
import { toBeEnabled, toBeOnTheScreen } from '@testing-library/jest-native';

import { theme } from '../../theme';

import VerifyOTPPage from '../(auth)/VerifyOTP';

expect.extend({ toBeEnabled, toBeOnTheScreen });

jest.mock('@react-navigation/native', () => ({
  useRoute: jest.fn(),
}));

jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
  useSegments: jest.fn(),
}));

const TestComponent = () => {
  const { params } = useRoute();
  const { phoneNumber } = params;

  expect(phoneNumber).toHaveLength(10);

  return (
    <ThemeProvider theme={theme}>
      <VerifyOTPPage />
    </ThemeProvider>
  );
};

describe('VerifyOTPPage', () => {
  const mockStore = configureStore([]);

  const store = mockStore({
    auth: { error: {} },
  });

  it('renders correctly', () => {
    const mockRouteParams = { phoneNumber: '0123456789' };
    useRoute.mockReturnValue({ params: mockRouteParams });

    const component = render(
      <Provider store={store}>
        <TestComponent />
      </Provider>
    );

    const { getByText } = component;

    expect(getByText('Verify your mobile')).toBeOnTheScreen();
    expect(getByText('Please enter your OTP code')).toBeOnTheScreen();
  });

  it('calls handleConfirmPress function when OTP code is entered and confirm button is pressed', () => {
    const mockRouteParams = { phoneNumber: '0123456789' };
    useRoute.mockReturnValue({ params: mockRouteParams });

    const component = render(
      <Provider store={store}>
        <TestComponent />
      </Provider>
    );

    const { getByTestId } = component;

    const otpInput = getByTestId('otp-pin-form-input');
    fireEvent.changeText(otpInput, '1234');

    const confirmButton = getByTestId('verify-button');
    fireEvent.press(confirmButton);

    expect(confirmButton).toBeEnabled();
  });

  it('displays error message when OTP code entered by user does not match', () => {
    const mockRouteParams = { phoneNumber: '0123456789' };
    useRoute.mockReturnValue({ params: mockRouteParams });

    const component = render(
      <Provider store={store}>
        <TestComponent />
      </Provider>
    );

    const { getByTestId, getByText } = component;

    const otpInput = getByTestId('otp-pin-form-input');
    fireEvent.changeText(otpInput, '5678');

    const confirmButton = getByTestId('verify-button');
    fireEvent.press(confirmButton);

    expect(getByText("Your OTP code doesn't match.")).not.toBeNull();
  });
});

import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';

import { theme } from '../../theme';

import PinCodeScreen from '../PinCodeScreen';

const mockStore = configureStore([]);

describe('PinCodeScreen', () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      pinCode: {
        pinCode: '1234',
        inputPinCode: '1234',
        isPinCodeVerified: false,
        errorMessage: '',
      },
      auth: {
        authData: {
          token: 'abc123',
        },
      },
    });

    component = renderer.create(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <PinCodeScreen />
        </ThemeProvider>
      </Provider>
    );
  });

  it('renders OTPPINFormInput with correct props', () => {
    const otpPinFormInput = component.root.findByProps({
      testID: 'otp-pin-form-input',
    });
    expect(otpPinFormInput.props.value).toBe('1234');
  });
});

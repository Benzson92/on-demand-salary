import React from 'react';
import { create, act } from 'react-test-renderer';
import { ThemeProvider } from 'styled-components/native';

import { theme } from '../../theme';

import OTPPINForm from '../otp-pin/OTPPINForm';
import OTPPINFormInput from '../otp-pin/OTPPINFormInput';

import { ButtonContainer } from '../../app/styles/ButtonContainer';

describe('OTPPINForm', () => {
  const errorMessage = 'Invalid OTP code';
  const handleConfirmPress = jest.fn();
  const tree = create(
    <ThemeProvider theme={theme}>
      <OTPPINForm
        errorMessage={errorMessage}
        handleConfirmPress={handleConfirmPress}
      />
    </ThemeProvider>
  );
  const testInstance = tree.root;

  it('should disable the button if the code length is less than the maximum length', () => {
    const buttonContainer = testInstance.findByType(ButtonContainer);
    expect(buttonContainer.props.disabled).toBe(true);
  });

  it('should enable the button if the code length is equal to the maximum length', () => {
    act(() => {
      const otpInput = testInstance.findByType(OTPPINFormInput);
      otpInput.props.setCode('1234');
    });

    const buttonContainer = testInstance.findByType(ButtonContainer);
    expect(buttonContainer.props.disabled).toBe(false);
  });

  it('should call handleConfirmPress with the code when the button is pressed', () => {
    act(() => {
      const otpInput = testInstance.findByType(OTPPINFormInput);
      otpInput.props.setCode('1234');

      const buttonContainer = testInstance.findByType(ButtonContainer);
      buttonContainer.props.onPress();
    });

    expect(handleConfirmPress).toHaveBeenCalledWith('1234');
  });
});

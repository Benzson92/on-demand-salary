import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';

import { theme } from '../../theme';

import OTPPINFormInput from '../otp-pin/OTPPINFormInput';

describe('OTPPINFormInput', () => {
  it('should call the setCode function when the user enters a digit', () => {
    const setCodeMock = jest.fn();
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <OTPPINFormInput code="" setCode={setCodeMock} maximumLength={6} />
      </ThemeProvider>
    );

    const input = getByTestId('otp-pin-form-input');
    fireEvent.changeText(input, '1');

    expect(setCodeMock).toHaveBeenCalledTimes(1);
    expect(setCodeMock).toHaveBeenNthCalledWith(1, '1');
  });

  it('should hide the TextInput component', () => {
    const setCodeMock = jest.fn();

    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <OTPPINFormInput code="" setCode={setCodeMock} maximumLength={6} />
      </ThemeProvider>
    );
    const input = getByTestId('otp-pin-form-input');

    expect(input.props.style[0].opacity).toBe(0);
    expect(input.props.style[0].position).toBe('absolute');
  });

  it('should not render a pin code digit when the digit is not present', () => {
    const setCodeMock = jest.fn();

    const { getAllByTestId } = render(
      <ThemeProvider theme={theme}>
        <OTPPINFormInput code="" setCode={setCodeMock} maximumLength={6} />
      </ThemeProvider>
    );
    const splitBoxTexts = getAllByTestId('split-box-text');

    splitBoxTexts.forEach((splitBoxText) => {
      expect(splitBoxText.props.children).toBe('');
    });
  });
});

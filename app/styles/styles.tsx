import styled from 'styled-components/native';

export const OTPPINFormInputContainer = styled.View`
  justify-content: center;
  align-items: center;

  position: relative;
`;

export const TextInputHidden = styled.TextInput`
  position: absolute;
  opacity: 0;
`;

export const SplitOTPAllBoxContainer = styled.Pressable`
  width: 100%;
  flex-direction: row;
  justify-content: center;
`;
export const SplitBox = styled.View<{ hasDigit: boolean }>`
  border-color: ${({ theme, hasDigit }) =>
    hasDigit ? theme.palette.primary : '#e5e5e5'};
  border-width: 2px;
  border-radius: 52px;
  padding: 12px;
  margin: 12px;
  width: 52px;
  height: 52px;
`;

export const SplitBoxTextContainer = styled.View<{ hasPinCodeDigit: boolean }>`
  background-color: ${({ theme, hasPinCodeDigit }) =>
    hasPinCodeDigit ? theme.palette.primary : 'transparent'};
  width: ${({ hasPinCodeDigit }) => (hasPinCodeDigit ? '24px' : 'auto')};
  height: 24px;
  border-radius: ${({ hasPinCodeDigit }) => (hasPinCodeDigit ? '24px' : 0)};

  justify-content: center;
  align-items: center;
`;

export const SplitBoxText = styled.Text<{ hasDigit: boolean }>`
  font-size: 20px;
  text-align: center;
  color: ${({ theme, hasDigit }) =>
    hasDigit ? theme.palette.primary : '#e5e5e5'};
  height: 24px;
`;

export const SplitBoxFocused = styled(SplitBox)`
  border-color: ${({ theme }) => theme.palette.primary};
`;

import React, { useRef, useState } from 'react';
import { TextInput } from 'react-native';

import {
  OTPPINFormInputContainer,
  SplitOTPAllBoxContainer,
  TextInputHidden,
  SplitBox,
  SplitBoxTextContainer,
  SplitBoxText,
  SplitBoxFocused,
} from '../../app/styles/styles';

interface Props {
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  maximumLength: number;
  isPinCode?: boolean;
}

const OTPPINFormInput: React.FunctionComponent<Props> = ({
  code,
  setCode,
  maximumLength,
  isPinCode = false,
}) => {
  const boxArray = new Array(maximumLength).fill(0);
  const inputRef = useRef<TextInput>(null);

  const [isInputBoxFocused, setIsInputBoxFocused] = useState(false);

  const handleOnPress = () => {
    setIsInputBoxFocused(true);
    inputRef.current?.focus();
  };

  const handleOnBlur = () => {
    setIsInputBoxFocused(false);
  };

  const boxDigit = (_, index: number) => {
    const emptyInput = '';
    const digit = code[index] || emptyInput;
    const hasDigit = Boolean(digit);

    const isCurrentValue = index === code.length;
    const isLastValue = index === maximumLength - 1;
    const isCodeComplete = code.length === maximumLength;

    const isValueFocused = isCurrentValue || (isLastValue && isCodeComplete);

    const StyledSplitBox =
      isInputBoxFocused && isValueFocused ? SplitBoxFocused : SplitBox;
    return (
      <StyledSplitBox key={index} hasDigit={hasDigit}>
        <SplitBoxTextContainer hasPinCodeDigit={isPinCode && hasDigit}>
          <SplitBoxText testID="split-box-text" hasDigit={hasDigit}>
            {isPinCode ? '' : digit}
          </SplitBoxText>
        </SplitBoxTextContainer>
      </StyledSplitBox>
    );
  };

  return (
    <OTPPINFormInputContainer>
      <SplitOTPAllBoxContainer
        testID="split-otp-all-box-container"
        onPress={handleOnPress}
      >
        {boxArray.map(boxDigit)}
      </SplitOTPAllBoxContainer>
      <TextInputHidden
        value={code}
        onChangeText={setCode}
        maxLength={maximumLength}
        ref={inputRef}
        onBlur={handleOnBlur}
        keyboardType="number-pad"
        testID="otp-pin-form-input"
      />
    </OTPPINFormInputContainer>
  );
};

export default OTPPINFormInput;

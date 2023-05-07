import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import OTPPINFormInput from './OTPPINFormInput';

import { ButtonContainer } from '../../app/styles/ButtonContainer';
import { ButtonText } from '../../app/styles/ButtonText';
import { StyledErrorMessage } from '../../app/styles/StyledErrorMessage';

const maximumCodeLength = 4;

interface Props {
  errorMessage: string;
  handleConfirmPress: (code: string) => void;
}

const OTPPINForm: React.FunctionComponent<Props> = ({
  errorMessage,
  handleConfirmPress,
}) => {
  const [otpCode, setOTPCode] = useState('');

  const isPinReady = otpCode.length === maximumCodeLength;

  return (
    <View style={styles.container} testID="otp-pin-form">
      <OTPPINFormInput
        code={otpCode}
        setCode={setOTPCode}
        maximumLength={maximumCodeLength}
      />
      <StyledErrorMessage>
        <Text>{errorMessage || ''}</Text>
      </StyledErrorMessage>
      <ButtonContainer
        disabled={!isPinReady}
        onPress={() => handleConfirmPress(otpCode)}
        isReady={isPinReady}
        testID="verify-button"
      >
        <ButtonText>
          <Text>Verify</Text>
        </ButtonText>
      </ButtonContainer>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default OTPPINForm;

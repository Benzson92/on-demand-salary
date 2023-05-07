import React from 'react';
import {
  View,
  Text,
  Modal,
  Pressable,
  Keyboard,
  StyleSheet,
} from 'react-native';
import { shallowEqual } from 'react-redux';

import { useAppSelector, useAppDispatch } from '../redux/hooks';

import { selectPinCode } from '../redux/reducers/pinCodeReducer';
import { selectAuth } from '../redux/reducers/authReducer';

import {
  changePinCode,
  setInputPinCode,
  verifyPinCode,
  setPinCodeErrorMessage,
} from '../redux/actions/pinCodeActions';

import OTPPINFormInput from '../components/otp-pin/OTPPINFormInput';

import { ButtonContainer } from '../app/styles/ButtonContainer';
import { ButtonText } from '../app/styles/ButtonText';
import { StyledErrorMessage } from '../app/styles/StyledErrorMessage';

const maximumCodeLength = 4;

const PinCodeScreen = () => {
  const { pinCode, inputPinCode, isPinCodeVerified, errorMessage } =
    useAppSelector(selectPinCode);
  const {
    authData: { token },
  } = useAppSelector(selectAuth, shallowEqual);

  const dispatch = useAppDispatch();

  const isPinReady = inputPinCode.length === maximumCodeLength;

  const handlePinCodeChange = (text: string) => {
    dispatch(setInputPinCode(text));
  };

  const handlePinCodeSubmit = () => {
    const isPinCodeCorrect = inputPinCode === pinCode;

    if (pinCode && !isPinCodeCorrect) {
      dispatch(setPinCodeErrorMessage("Your PIN code doesn't match."));
      return;
    }

    dispatch(verifyPinCode(pinCode ? isPinCodeCorrect : true));

    if (!pinCode) dispatch(changePinCode(inputPinCode));
  };

  return (
    <Modal visible={!isPinCodeVerified && Boolean(token)} animationType="slide">
      <Pressable onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.PINCode}>Please enter your PIN code</Text>
          <View style={styles.OTPPINFormInputContainer}>
            <OTPPINFormInput
              code={inputPinCode}
              setCode={handlePinCodeChange}
              maximumLength={maximumCodeLength}
              isPinCode
            />
          </View>

          <StyledErrorMessage>
            <Text>{errorMessage}</Text>
          </StyledErrorMessage>
          <ButtonContainer
            disabled={!isPinReady}
            isReady={isPinReady}
            onPress={handlePinCodeSubmit}
            testID="verify-button"
          >
            <ButtonText>
              <Text>Verify</Text>
            </ButtonText>
          </ButtonContainer>
        </View>
      </Pressable>
    </Modal>
  );
};

export default PinCodeScreen;

const styles = StyleSheet.create({
  OTPPINFormInputContainer: { marginTop: 44 },
  PINCode: { textAlign: 'center' },
  container: {
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 52,
  },
});

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Pressable,
  Keyboard,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { shallowEqual } from 'react-redux';
import Toast from 'react-native-root-toast';

import { useAuth } from '../../context/authContext';

import { useAppSelector } from '../../redux/hooks';
import { selectAuth } from '../../redux/reducers/authReducer';

import OTPPINForm from '../../components/otp-pin/OTPPINForm';

const screenWidth = Dimensions.get('window').width;

const OTP = process.env.OTP;

interface RouteParams {
  phoneNumber: string;
}

const VerifyOTPPage: React.FunctionComponent = () => {
  const authState = useAppSelector(selectAuth, shallowEqual);
  const { error } = authState;

  const [errorMessage, setErrorMessage] = useState(error.message);

  const { signIn } = useAuth();

  const { params } = useRoute();
  const { phoneNumber } = params as RouteParams;

  const handleHelpPress = useCallback(() => {
    Toast.show(`Your OTP code is ${OTP}.`, {
      duration: Toast.durations.LONG,
      position: Toast.positions.TOP,
    });
  }, []);

  const handleConfirmPress = useCallback(
    async (otpCode: string) => {
      Keyboard.dismiss();

      if (otpCode !== OTP) {
        setErrorMessage("Your OTP code doesn't match.");
        return;
      }

      await signIn(phoneNumber);
    },
    [phoneNumber, signIn]
  );

  useEffect(() => {
    Toast.show('Please check notification for OTP', {
      duration: Toast.durations.LONG,
      position: Toast.positions.TOP,
    });
  }, []);

  useEffect(() => {
    setErrorMessage(error.message);
  }, [error.message]);

  return (
    <Pressable onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Verify your mobile</Text>
        <Text style={styles.subtitle}>Please enter your OTP code</Text>
        <Text onPress={handleHelpPress} style={styles.help}>
          Can&apos;t see OTP?
        </Text>
        <View style={styles.OTPPINFormContainer}>
          <OTPPINForm
            errorMessage={errorMessage}
            handleConfirmPress={handleConfirmPress}
          />
        </View>
      </View>
    </Pressable>
  );
};

export default VerifyOTPPage;

const styles = StyleSheet.create({
  OTPPINFormContainer: {
    marginVertical: 44,
  },
  container: {
    paddingHorizontal: 12,
    paddingVertical: 52,
    width: screenWidth,
  },
  help: {
    color: 'blue',
    marginTop: 24,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
});

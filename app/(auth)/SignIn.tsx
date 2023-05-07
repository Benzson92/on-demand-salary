import React, { useState, useCallback } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Keyboard,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import styled from 'styled-components/native';
import { useRouter } from 'expo-router';

import { NotificationMessageDTO } from '../../models/notification/NotificationMessageDTO';
import getIsPhoneNumberValid from '../../utils/getIsPhoneNumberValid';

import NotificationButton from '../../components/NotificationButton';

import { StyledErrorMessage } from '../styles/StyledErrorMessage';

const StyledTextInput = styled.TextInput`
  background-color: #fafafa;

  width: 200px;
  border-radius: 200px;

  padding: 20px;
  margin-top: 12px;
`;

const screenWidth = Dimensions.get('window').width;

const message: NotificationMessageDTO = {
  to: '',
  sound: 'default',
  title: 'On Demand Salary',
  body: 'Your OTP code is 1234.',
};

const SignInPage: React.FunctionComponent = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();

  const handleLoginPress = useCallback(
    (phone: string) => {
      const isPhoneNumberValid = getIsPhoneNumberValid(phone);
      if (!isPhoneNumberValid) {
        setErrorMessage(
          'Please fill your phone number with format: 0812345678'
        );

        return isPhoneNumberValid;
      }

      setErrorMessage('');

      router.push({ pathname: 'VerifyOTP', params: { phoneNumber: phone } });

      return true;
    },
    [router]
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{
        ...styles.KeyboardAvoidingView,
        ...styles.center,
      }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <View style={{ ...styles.center, ...styles.container }}>
            <View
              style={{
                ...styles.center,
                ...styles.imageContainer,
              }}
            >
              <Image
                source={require('../../assets/images/salary-hero.jpeg')}
                style={styles.image}
              />
            </View>
            <View style={styles.center}>
              <Text>Phone Number</Text>
              <StyledTextInput
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                placeholder="0812345678"
                testID="phone-input"
              />
              <StyledErrorMessage>
                <Text>{errorMessage}</Text>
              </StyledErrorMessage>
            </View>
            <NotificationButton
              title="Sign In"
              isDisabled={!phoneNumber}
              message={message}
              handlePress={() => handleLoginPress(phoneNumber)}
            />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignInPage;

const styles = StyleSheet.create({
  KeyboardAvoidingView: {
    flex: 1,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    padding: 12,
    width: screenWidth,
  },
  image: {
    height: 120,
    width: 120,
  },
  imageContainer: {
    marginVertical: 24,
  },
});

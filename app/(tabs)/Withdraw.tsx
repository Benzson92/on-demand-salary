import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';
import { shallowEqual } from 'react-redux';

import { useAppSelector, useAppDispatch } from '../../redux/hooks';

import { selectAuth } from '../../redux/reducers/authReducer';
import { selectTransactions } from '../../redux/reducers/transactionReducer';

import {
  fetchUserWithdraw,
  setInputWithdrawAmount,
} from '../../redux/actions/transactionActions';

import { PageContainer } from '../styles/PageContainer';
import { StyledTextInput } from '../styles/StyledTextInput';
import { ButtonContainer } from '../styles/ButtonContainer';
import { ButtonText } from '../styles/ButtonText';
import { StyledErrorMessage } from '../styles/StyledErrorMessage';

export default function WithdrawPage() {
  const authState = useAppSelector(selectAuth, shallowEqual);
  const transactionState = useAppSelector(selectTransactions, shallowEqual);

  const { authData } = authState;
  const { inputWithdrawAmount, creditBalance, error } = transactionState;

  const [errorMessage, setErrorMessage] = useState(error.message);

  const dispatch = useAppDispatch();

  const handleWithdrawAmountSubmit = useCallback(
    async (withdrawAmountValue: string) => {
      Keyboard.dismiss();
      setErrorMessage('');

      if (!withdrawAmountValue) return;

      const amount = parseFloat(withdrawAmountValue);
      const { available } = creditBalance;

      if (amount > available / 2) {
        setErrorMessage(
          'You can withdrawal at most 50% of your available balance.'
        );
        return;
      }

      await dispatch(fetchUserWithdraw({ authData, amount }));
    },
    [authData, creditBalance, dispatch]
  );

  useEffect(() => {
    setErrorMessage(error.message);
  }, [error.message]);

  const handleWithdrawAmountChange = (value: string) => {
    dispatch(setInputWithdrawAmount(value));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.KeyboardAvoidingView}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <PageContainer style={styles.container}>
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <Text>Withdrawal Amount</Text>
            <StyledTextInput
              placeholder="max. 50% of balance"
              value={inputWithdrawAmount}
              onChangeText={handleWithdrawAmountChange}
              keyboardType="numeric"
              testID="withdraw-input"
            />
            <StyledErrorMessage>
              <Text>{errorMessage || ''}</Text>
            </StyledErrorMessage>
            <ButtonContainer
              disabled={!inputWithdrawAmount}
              isReady={Boolean(inputWithdrawAmount)}
              onPress={() => handleWithdrawAmountSubmit(inputWithdrawAmount)}
              testID="withdraw-button"
            >
              <ButtonText>
                <Text>Withdraw</Text>
              </ButtonText>
            </ButtonContainer>
          </ScrollView>
        </PageContainer>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  KeyboardAvoidingView: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1,
    padding: 24,
  },
});

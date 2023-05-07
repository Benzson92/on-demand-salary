import { AxiosError, isAxiosError } from 'axios';
import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import Toast from 'react-native-root-toast';

import getAxiosRequestConfigByToken from '../../utils/getAxiosRequestConfigByToken';

import fetchTransactions, {
  TransactionResponseDTO,
} from '../../api/user/ApiUserGetTransactions';
import fetchWithdraw, {
  WithdrawResponseDTO,
} from '../../api/user/ApiUserPostWithdraw';

import { AuthDataDTO } from '../../models/auth/AuthDataDTO';

interface FetchUserWithdrawArgDTO {
  amount: number;
  authData: AuthDataDTO;
}

export const fetchUserTransactions = createAsyncThunk<
  TransactionResponseDTO,
  AuthDataDTO
>('transactions/fetchUserTransactions', async (payload) => {
  try {
    const { token } = payload;
    const config = getAxiosRequestConfigByToken(token);

    const response = await fetchTransactions(config);
    return response.data;
  } catch (error) {
    return Promise.reject(
      error instanceof AxiosError ? error : 'An unexpected error occurred'
    );
  }
});

export const fetchUserWithdraw = createAsyncThunk<
  WithdrawResponseDTO,
  FetchUserWithdrawArgDTO
>('transactions/fetchUserWithdraw', async (payload) => {
  try {
    const {
      amount,
      authData: { token },
    } = payload;
    const config = getAxiosRequestConfigByToken(token);

    const response = await fetchWithdraw({ amount }, config);

    Toast.show('You have successfully withdrawn your money.', {
      duration: Toast.durations.LONG,
      position: Toast.positions.TOP,
      textColor: 'white',
      backgroundColor: 'green',
      opacity: 1,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const {
        name,
        stack,
        code,
        response: { data },
      } = error;
      const axiosError = {
        name,
        message: data.message,
        stack,
        code,
      };

      return Promise.reject(axiosError);
    }

    return Promise.reject('An unexpected error occurred');
  }
});

export const setInputWithdrawAmount = createAction<string>(
  'transactions/setInputWithdrawAmount'
);
export const resetWithdrawAmount = createAction<boolean>(
  'transactions/resetWithdrawAmount'
);

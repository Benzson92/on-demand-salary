import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import Toast from 'react-native-root-toast';

import fetchSignIn, {
  SignInParams,
  SignInResponseDTO,
} from '../../api/auth/ApiAuthPostSignIn';

export const signIn = createAsyncThunk<SignInResponseDTO, SignInParams>(
  'auth/signIn',
  async (payload) => {
    try {
      const response = await fetchSignIn(payload);

      Toast.show('You have successfully signed in.', {
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
        const { name, message, stack, code, response } = error;
        const axiosError = {
          name,
          message: response?.data?.message || message,
          stack,
          code,
        };

        return Promise.reject(axiosError);
      }

      return Promise.reject('An unexpected error occurred');
    }
  }
);

import { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import getAxiosRequestConfigByToken from '../../utils/getAxiosRequestConfigByToken';

import fetchProfile, {
  ProfileResponseDTO,
} from '../../api/user/ApiUserGetProfile';

import { AuthDataDTO } from '../../models/auth/AuthDataDTO';

export const fetchUserProfile = createAsyncThunk<
  ProfileResponseDTO,
  AuthDataDTO
>('user/fetchUserProfile', async (payload) => {
  try {
    const { token } = payload;
    const config = getAxiosRequestConfigByToken(token);

    const response = await fetchProfile(config);
    return response.data;
  } catch (error) {
    return Promise.reject(
      error instanceof AxiosError ? error : 'An unexpected error occurred'
    );
  }
});

import { createSlice, SerializedError } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { signIn } from '../actions/authActions';
import { commonActionTypes } from '../actionTypes/commonActionTypes';

import { AuthDataDTO } from '../../models/auth/AuthDataDTO';
import { StatusType } from '../../types/StatusType';

interface AuthStateDTO {
  status: StatusType;
  loading: boolean;
  authData: AuthDataDTO;
  error: SerializedError;
}

const initialState: AuthStateDTO = {
  status: 'idle',
  loading: false,
  authData: {
    phone: '',
    token: '',
  },
  error: {},
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(signIn.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.status = 'success';
        state.loading = false;
        state.authData = action.payload.data;
        state.error = {};
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = 'failed';
        state.loading = false;

        state.error = action.error;
      })
      .addCase(commonActionTypes.SIGN_OUT, (state) => {
        state.status = 'idle';
        state.loading = false;
        state.authData = {
          phone: '',
          token: '',
        };
        state.error = {};
      })
      .addCase(commonActionTypes.CLEAR_ERROR, (state) => {
        state.error = {};
      });
  },
});

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;

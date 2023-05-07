import { createSlice, SerializedError } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { fetchUserProfile } from '../actions/userActions';
import { commonActionTypes } from '../actionTypes/commonActionTypes';

import { UserProfileDTO } from '../../models/user/UserProfileDTO';

interface UserStateDTO {
  loading: boolean;
  userProfile: UserProfileDTO;
  pinCode: string;
  inputPinCode: string;
  error: SerializedError;
}

const initialState: UserStateDTO = {
  loading: false,
  userProfile: {
    uid: '',
    email: '',
    firstname: '',
    lastname: '',
  },
  pinCode: '',
  inputPinCode: '',
  error: {},
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfile = action.payload.data;
        state.error = {};
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(commonActionTypes.SIGN_OUT, (state) => {
        state.loading = false;
        state.userProfile = {
          uid: '',
          email: '',
          firstname: '',
          lastname: '',
        };
        state.error = {};
      })
      .addCase(commonActionTypes.CLEAR_ERROR, (state) => {
        state.error = {};
      });
  },
});

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;

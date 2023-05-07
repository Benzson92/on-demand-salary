import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../store';
import {
  changePinCode,
  setInputPinCode,
  verifyPinCode,
  verifyPinCodeOnAppStateChange,
  resetPinCode,
  setPinCodeErrorMessage,
} from '../actions/pinCodeActions';
import { commonActionTypes } from '../actionTypes/commonActionTypes';

interface PinCodeStateDTO {
  loading: boolean;
  pinCode: string;
  inputPinCode: string;
  isPinCodeVerified: boolean;
  errorMessage: string;
}

const initialState: PinCodeStateDTO = {
  loading: false,
  pinCode: '',
  inputPinCode: '',
  isPinCodeVerified: false,
  errorMessage: '',
};

export const pinCodeSlice = createSlice({
  name: 'pinCode',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(changePinCode, (state, action) => {
        state.pinCode = action.payload;
      })
      .addCase(setInputPinCode, (state, action) => {
        state.inputPinCode = action.payload;
      })
      .addCase(verifyPinCode, (state, action) => {
        state.isPinCodeVerified = action.payload;
      })
      .addCase(verifyPinCodeOnAppStateChange, (state) => {
        state.isPinCodeVerified = false;
      })
      .addCase(resetPinCode, (state) => {
        state.inputPinCode = '';
        state.errorMessage = '';
      })
      .addCase(setPinCodeErrorMessage, (state, action) => {
        state.errorMessage = action.payload;
      })
      .addCase(commonActionTypes.SIGN_OUT, (state) => {
        state.inputPinCode = '';
        state.errorMessage = '';
        state.isPinCodeVerified = false;
      })
      .addCase(commonActionTypes.CLEAR_ERROR, (state) => {
        state.inputPinCode = '';
        state.errorMessage = '';
        state.isPinCodeVerified = false;
      });
  },
});

export const selectPinCode = (state: RootState) => state.pinCode;

export default pinCodeSlice.reducer;

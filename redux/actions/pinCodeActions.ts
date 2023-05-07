import { createAction } from '@reduxjs/toolkit';

export const changePinCode = createAction<string>('pinCode/changePinCode');
export const setInputPinCode = createAction<string>('pinCode/setInputPinCode');

export const verifyPinCode = createAction<boolean>('pinCode/verifyPinCode');
export const verifyPinCodeOnAppStateChange = createAction<boolean>(
  'pinCode/verifyPinCodeOnAppStateChange'
);

export const resetPinCode = createAction<boolean>('pinCode/resetPinCode');
export const setPinCodeErrorMessage = createAction<string>(
  'pinCode/setPinCodeErrorMessage'
);

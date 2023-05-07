import { createSlice, SerializedError } from '@reduxjs/toolkit';

import { RootState } from '../store';
import {
  fetchUserTransactions,
  fetchUserWithdraw,
  setInputWithdrawAmount,
} from '../actions/transactionActions';
import { commonActionTypes } from '../actionTypes/commonActionTypes';

import { UserCreditBalanceDTO } from '../../models/user/UserCreditBalanceDTO';
import { StatusType } from '../../types/StatusType';

interface UserStateDTO {
  loading: boolean;
  withdrawStatus: StatusType;
  creditBalance: UserCreditBalanceDTO;
  inputWithdrawAmount: string;
  error: SerializedError;
}

const initialState: UserStateDTO = {
  loading: false,
  withdrawStatus: 'idle',
  creditBalance: {
    available: 0,
    transactions: [],
  },
  inputWithdrawAmount: '',
  error: {},
};

export const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUserTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.creditBalance = action.payload.data;
        state.error = {};
      })
      .addCase(fetchUserTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })

      .addCase(fetchUserWithdraw.pending, (state) => {
        state.loading = true;
        state.withdrawStatus = 'loading';
      })
      .addCase(fetchUserWithdraw.fulfilled, (state, action) => {
        const {
          payload,
          meta: { arg },
        } = action;
        const prevTransactions = [...state.creditBalance.transactions];
        const lastTransaction = {
          ...prevTransactions[prevTransactions.length - 1],
        };
        const todayDate = new Date().toLocaleDateString('en-GB');

        state.loading = false;

        state.withdrawStatus = payload.message;
        state.creditBalance.available =
          state.creditBalance.available - arg.amount;
        state.creditBalance.transactions.push({
          uid: lastTransaction.uid + 1,
          amount: arg.amount,
          date: todayDate,
        });
        state.inputWithdrawAmount = '';

        state.error = {};
      })
      .addCase(fetchUserWithdraw.rejected, (state, action) => {
        state.loading = false;
        state.withdrawStatus = 'failed';
        state.error = action.error;
      })

      .addCase(setInputWithdrawAmount, (state, action) => {
        state.inputWithdrawAmount = action.payload;
      })

      .addCase(commonActionTypes.SIGN_OUT, (state) => {
        state.loading = false;
        state.creditBalance = {
          available: 0,
          transactions: [],
        };
        state.inputWithdrawAmount = '';
        state.error = {};
      })
      .addCase(commonActionTypes.CLEAR_ERROR, (state) => {
        state.inputWithdrawAmount = '';
        state.error = {};
      });
  },
});

export const selectTransactions = (state: RootState) => state.transactions;

export default transactionSlice.reducer;

import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { create } from 'react-test-renderer';

import { ThemeProvider } from 'styled-components/native';

import { theme } from '../../theme';

import WithdrawPage from '../(tabs)/Withdraw';

const mockStore = configureMockStore([]);

describe('WithdrawPage', () => {
  const store = mockStore({
    auth: { authData: { token: 'testToken' } },
    transactions: {
      inputWithdrawAmount: '',
      error: { message: '' },
    },
  });
  const component = create(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <WithdrawPage />
      </ThemeProvider>
    </Provider>
  );

  it('should handle withdrawal amount change', () => {
    const input = component.root.findByProps({ testID: 'withdraw-input' });
    input.props.onChangeText('50');

    const actions = store.getActions();
    const expectedPayload = {
      type: 'transactions/setInputWithdrawAmount',
      payload: '50',
    };
    expect(actions).toEqual([expectedPayload]);
  });
});

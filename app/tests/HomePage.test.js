import React from 'react';

import { render } from '@testing-library/react-native';

import configureStore from 'redux-mock-store';
import { Provider, useDispatch } from 'react-redux';

import { ThemeProvider } from 'styled-components/native';

import { theme } from '../../theme';
import * as transactionsActions from '../../redux/actions/transactionActions';

import HomePage from '../(tabs)';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

const TestComponent = () => {
  return (
    <ThemeProvider theme={theme}>
      <HomePage />
    </ThemeProvider>
  );
};

describe('HomePage', () => {
  const mockStore = configureStore([]);

  const store = mockStore({
    auth: {
      authData: {
        token: 'mockToken',
      },
    },
    user: {
      userProfile: {
        firstname: 'John',
        lastname: 'Doe',
      },
    },
    transactions: {
      creditBalance: {
        available: 100,
        transactions: [],
      },
    },
  });

  it('should render the user information', () => {
    const dispatch = jest.fn();
    const spyFetchUserTransactions = jest.spyOn(
      transactionsActions,
      'fetchUserTransactions'
    );

    useDispatch.mockReturnValue(dispatch);

    const component = render(
      <Provider store={store}>
        <TestComponent />
      </Provider>
    );

    const userTitle = component.getByText('John\nDoe');
    expect(userTitle).toBeDefined();

    expect(spyFetchUserTransactions).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalled();
  });

  it('should render the available balance', () => {
    const component = render(
      <Provider store={store}>
        <TestComponent />
      </Provider>
    );

    const availableBalance = component.getByText('$ 100');
    expect(availableBalance).toBeDefined();
  });

  it('should render the transaction history', () => {
    const component = render(
      <Provider store={store}>
        <TestComponent />
      </Provider>
    );

    const transactionHistory = component.getByText('Transaction History');
    expect(transactionHistory).toBeDefined();
  });
});

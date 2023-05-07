import React, { useEffect, useCallback } from 'react';
import { StyleSheet, FlatList, Text, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { shallowEqual } from 'react-redux';
import styled, { css } from 'styled-components/native';

import { useAppSelector, useAppDispatch } from '../../redux/hooks';

import { selectAuth } from '../../redux/reducers/authReducer';
import { selectUser } from '../../redux/reducers/userReducer';
import { selectTransactions } from '../../redux/reducers/transactionReducer';

import { fetchUserTransactions } from '../../redux/actions/transactionActions';

import { UserTransactionDTO } from '../../models/user/UserCreditBalanceDTO';

const cssBackgroundColor = css`
  background-color: ${({ theme }) => theme.palette.secondary};
`;

const PageContainer = styled.View`
  flex: 1;
  ${cssBackgroundColor}
`;

const UserContainer = styled.View`
  ${cssBackgroundColor}
`;

const StyledTransactionItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 24px;
  border-radius: 24px;
  margin-bottom: 24px;

  background-color: #fff;
`;

const StyledAvailableBalance = styled.View`
  padding: 24px;
  border-radius: 24px;
  margin: 24px;

  background-color: #fff;
`;

const StyledAvailableBalanceText = styled.Text`
  text-align: center;
`;

interface TransactionItemProps {
  item: UserTransactionDTO;
}

const TransactionItem: React.FunctionComponent<TransactionItemProps> = ({
  item: { amount, date },
}) => (
  <StyledTransactionItem>
    <View>
      <Text>{date}</Text>
      <Text>Completed</Text>
    </View>
    <Text style={styles.title}>{`$ ${amount}`}</Text>
  </StyledTransactionItem>
);

export default function HomePage() {
  const authState = useAppSelector(selectAuth, shallowEqual);
  const { userProfile } = useAppSelector(selectUser, shallowEqual);
  const { creditBalance } = useAppSelector(selectTransactions, shallowEqual);

  const { firstname, lastname } = userProfile;
  const { available, transactions } = creditBalance;

  const dispatch = useAppDispatch();

  const handleFetchUserTransactions = useCallback(async () => {
    await dispatch(fetchUserTransactions(authState.authData));
  }, [authState.authData, dispatch]);

  useEffect(() => {
    handleFetchUserTransactions();
  }, [handleFetchUserTransactions]);

  return (
    <PageContainer>
      <UserContainer style={{ ...styles.user, ...styles.contentContainer }}>
        <Text style={styles.userTitle}>
          {firstname}
          {'\n'}
          {lastname}
        </Text>
        <FontAwesome name="user-circle-o" size={24} color="black" />
      </UserContainer>
      <Text style={styles.AvailableBalance}>Available Balance</Text>
      <StyledAvailableBalance>
        <StyledAvailableBalanceText style={styles.title}>
          <Text>{`$ ${available}`}</Text>
        </StyledAvailableBalanceText>
      </StyledAvailableBalance>
      <FlatList
        data={transactions}
        renderItem={({ item }) => <TransactionItem item={item} />}
        keyExtractor={(item) => item.uid.toString()}
        ListHeaderComponent={
          <Text style={styles.TransactionHistory}>Transaction History</Text>
        }
        contentContainerStyle={styles.contentContainer}
      />
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  AvailableBalance: {
    paddingHorizontal: 24,
  },
  TransactionHistory: {
    marginBottom: 24,
  },
  contentContainer: {
    padding: 24,
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  user: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 44,
  },
  userTitle: {
    marginRight: 12,
    textTransform: 'capitalize',
  },
});

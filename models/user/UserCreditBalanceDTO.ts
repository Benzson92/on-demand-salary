export interface UserCreditBalanceDTO {
  available: number;
  transactions: UserTransactionDTO[];
}

export interface UserTransactionDTO {
  uid: number;
  amount: number;
  date: string;
}

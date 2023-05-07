import axios, { AxiosRequestConfig } from 'axios';

import { UserCreditBalanceDTO } from '../../models/user/UserCreditBalanceDTO';

const API_URL = `${process.env.API_URL}/user`;

export interface TransactionResponseDTO {
  data: UserCreditBalanceDTO;
}

const fetchTransactions = async (config: AxiosRequestConfig) =>
  await axios.get<TransactionResponseDTO>(`${API_URL}/transactions`, config);

export default fetchTransactions;

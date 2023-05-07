import axios, { AxiosRequestConfig } from 'axios';

import { StatusType } from '../../types/StatusType';

const API_URL = `${process.env.API_URL}/user`;

export interface WithdrawParams {
  amount: number;
}

export interface WithdrawResponseDTO {
  message: StatusType;
}

const fetchWithdraw = async (
  params: WithdrawParams,
  config: AxiosRequestConfig
) =>
  await axios.post<WithdrawResponseDTO>(`${API_URL}/withdraw`, params, config);

export default fetchWithdraw;

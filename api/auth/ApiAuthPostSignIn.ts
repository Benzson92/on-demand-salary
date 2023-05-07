import axios from 'axios';

import { AuthDataDTO } from '../../models/auth/AuthDataDTO';

const API_URL = `${process.env.API_URL}/signin`;

export interface SignInParams {
  phone: string;
}

export interface SignInResponseDTO {
  data: AuthDataDTO;
}

const fetchSignIn = async (params: SignInParams) => {
  return await axios.post<SignInResponseDTO>(API_URL, params);
};

export default fetchSignIn;

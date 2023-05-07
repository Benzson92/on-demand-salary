import axios, { AxiosRequestConfig } from 'axios';

import { UserProfileDTO } from '../../models/user/UserProfileDTO';

const API_URL = `${process.env.API_URL}/user`;

export interface ProfileResponseDTO {
  data: UserProfileDTO;
}

const fetchProfile = async (config: AxiosRequestConfig) =>
  await axios.get<ProfileResponseDTO>(`${API_URL}/profile`, config);

export default fetchProfile;

import { AxiosRequestConfig } from 'axios';

const getAxiosRequestConfigByToken = (token: string): AxiosRequestConfig => {
  if (!token) return {};
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export default getAxiosRequestConfigByToken;

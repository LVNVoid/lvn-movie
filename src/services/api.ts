import { envConfig } from '@/constants/config';
import axios from 'axios';

export const api = axios.create({
  baseURL: envConfig.apiBaseUrl,
  headers: {
    Authorization: 'Bearer ' + envConfig.accessToken,
    Accept: 'application/json',
  },
  timeout: 10000,
});

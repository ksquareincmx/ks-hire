import { httpClient } from 'utils/httpClient';

const { REACT_APP_API_URL } = process.env;
const path = '/api/v1';

export const apiClient = httpClient.create({
  baseURL: `${REACT_APP_API_URL}${path}`,
  headers: {
    'content-type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const user = window.sessionStorage.getItem('user');
    const userJSON = user ? JSON.parse(user) : '';

    config.headers.authorization = `Bearer ${userJSON.token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

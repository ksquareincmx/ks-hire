import { apiClient } from './Client';
import { IAuth } from 'modules/Auth/typings';

const login = (token: string): Promise<IAuth> => {
  return apiClient
    .post<IAuth>('/auth/login', {
      body: {
        token,
      },
    })
    .then((res: IAuth) => res);
};

export default {
  login,
};

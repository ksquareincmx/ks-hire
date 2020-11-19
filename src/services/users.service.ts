import { IUser } from 'modules/Users/typings';
import { IUserListing } from 'modules/Users/typings';
import { apiClient } from './Client';

const deleteOne = (id: string) => {
  return apiClient.delete<IUser>(`/user/${id}`).then((res) => res);
};

const editOne = (id: string, user: IUser): Promise<IUser> => {
  return apiClient
    .put<IUser>(`/user/${id}`, { body: user })
    .then((res: IUser) => res);
};

const getAll = (): Promise<IUserListing[]> => {
  return apiClient
    .get<IUserListing[]>('/user')
    .then((res: Array<IUserListing>) => res);
};

const getById = (id: string): Promise<IUser> => {
  return apiClient
    .get<IUser>(`/user/${id}`)
    .then((res: IUser) => res);
};

export default {
  deleteOne,
  editOne,
  getAll,
  getById,
};

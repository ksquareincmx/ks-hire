import { INotification } from 'modules/Users/typings';
import { apiClient } from './Client';

const deleteOne = (id: number) => {
  return apiClient
    .delete<INotification>(`/notification/${id}`)
    .then((res) => res);
};

const deleteAll = (id: string) => {
  return apiClient
    .delete<INotification>(`/notification/all`, {
      body: { user: id },
    })
    .then((res) => res);
};

const getAll = (): Promise<INotification[]> => {
  return apiClient
    .get<INotification[]>(
      `/notification?order=[["createdAt", "DESC"]]`,
    )
    .then((res: Array<INotification>) => res);
};

const read = (id: number): Promise<INotification> => {
  return apiClient
    .put<INotification>(
      `/notification/${id}?&include=["Candidate"]`,
      {
        body: { read: true },
      },
    )
    .then((res: INotification) => res);
};

const unread = (id: number): Promise<INotification> => {
  return apiClient
    .put<INotification>(
      `/notification/${id}?&include=["Candidate"]`,
      {
        body: { read: false },
      },
    )
    .then((res: INotification) => res);
};

export default {
  deleteOne,
  deleteAll,
  getAll,
  read,
  unread,
};

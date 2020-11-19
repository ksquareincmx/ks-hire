import { IJob } from 'modules/Jobs/typings';
import { apiClient } from './Client';

const addNew = (job: IJob): Promise<IJob> => {
  return apiClient
    .post<IJob>('/job', { body: job })
    .then((res: IJob) => res);
};

const deleteOne = (id: string) => {
  return apiClient.delete<IJob>(`/job/${id}`).then((res) => res);
};

const editOne = (id: string, job: IJob): Promise<IJob> => {
  return apiClient
    .put<IJob>(`/job/${id}`, { body: job })
    .then((res: IJob) => res);
};

const getAll = (
  filter?: string,
  order?: string,
  orderBy?: string,
  rowsPerPage?: number,
  page?: number,
  search?: string,
  location?: string,
): Promise<{ count: number; rows: IJob[] }> => {
  let endpoint = '/job?';
  if (filter && filter !== 'all') {
    if (search) {
      if (location !== 'All Locations') {
        endpoint += `where={"status":{"$eq":"${filter}"},"title":{"$like":"%25${search}%25"},"location":{"$eq":"${location}"}}&`;
      } else {
        endpoint += `where={"status":{"$eq":"${filter}"},"title":{"$like":"%25${search}%25"}}&`;
      }
    } else {
      if (location !== 'All Locations') {
        endpoint += `where={"status":{"$eq":"${filter}"},"location":{"$eq":"${location}"}}&`;
      } else {
        endpoint += `where={"status":{"$eq":"${filter}"}}&`;
      }
    }
  } else if (search) {
    if (location !== 'All Locations') {
      endpoint += `where={"title":{"$like":"%25${search}%25"},"location":{"$eq":"${location}"}}&`;
    } else {
      endpoint += `where={"title":{"$like":"%25${search}%25"}}&`;
    }
  } else if (location !== 'All Locations') {
    endpoint += `where={"location":{"$eq":"${location}"}}&`;
  }

  endpoint += `limit=${rowsPerPage}&offset=${
    (rowsPerPage as number) * (page as number)
  }&`;

  if (order && orderBy) {
    if (orderBy === 'daysOpen') {
      endpoint += `order=[["status", "desc"],["openAt", "${order}"]]`;
    } else {
      endpoint += `order=[["${orderBy}", "${order}"]]`;
    }
  }

  return apiClient.get<IJob[]>(endpoint).then((res: any) => res);
};

const getJobStatistics = (): Promise<any> => {
  return apiClient
    .get<IJob[]>('/job/statistics')
    .then((res: Array<IJob>) => res);
};

const getAllOpen = (): Promise<IJob[]> => {
  return apiClient
    .get<IJob[]>(
      '/job?where={"status":{"$eq":"Open"}}&order=[["title", "ASC"]]',
    )
    .then((res: any) => res.rows);
};

const getById = (id: string): Promise<IJob> => {
  return apiClient.get<IJob>(`/job/${id}`).then((res: IJob) => res);
};

const getPublishedById = (id: string): Promise<IJob> => {
  return apiClient
    .get<IJob>(`/job/published/${id}`)
    .then((res: IJob) => res);
};

export default {
  addNew,
  deleteOne,
  editOne,
  getAll,
  getJobStatistics,
  getAllOpen,
  getById,
  getPublishedById,
};

import { ICandidate } from 'modules/Candidates/typings';
import { IAddCandidate } from './typings';
import { apiClient } from './Client';

const addNew = async (
  candidate: IAddCandidate,
): Promise<ICandidate> => {
  const user = window.sessionStorage.getItem('user');
  const userJSON = user ? JSON.parse(user) : '';
  const { REACT_APP_API_URL } = process.env;

  const formData = new FormData();
  formData.append('firstName', candidate.firstName);
  formData.append('lastName', candidate.lastName);
  formData.append('email', candidate.email);
  formData.append('jobId', candidate.jobId);
  formData.append('linkedin', candidate.linkedin);
  formData.append('phone', candidate.phone);
  formData.append('referral', candidate.referral as string);
  formData.append('source', candidate.source as string);
  formData.append('stageId', candidate.stageId as string);
  formData.append('salaryOffer', candidate.salaryOffer as string);
  formData.append('website', candidate.website);
  formData.append(
    'firstContact',
    JSON.stringify(candidate.firstContact),
  );
  formData.append(
    'techInterview1',
    JSON.stringify(candidate.techInterview1),
  );
  formData.append(
    'techInterview2',
    JSON.stringify(candidate.techInterview2),
  );
  formData.append('type', candidate.resume.type);
  formData.append('recruiterId', candidate.recruiterId as string);
  formData.append('resume', candidate.resume);
  formData.append('country', JSON.stringify(candidate.country));
  formData.append('state', JSON.stringify(candidate.state));
  formData.append('city', JSON.stringify(candidate.city));

  const res: Response = await fetch(
    `${REACT_APP_API_URL}/api/v1/candidate`,
    {
      headers: {
        authorization: `Bearer ${userJSON.token}`,
      },
      method: 'POST',
      body: formData,
    },
  );

  if (!res.ok) {
    throw await res.json();
  }
  const doc: ICandidate = await res.json();
  return doc;
};

const addNewApplicant = async (
  candidate: IAddCandidate,
  callback: () => any,
): Promise<ICandidate> => {
  const { REACT_APP_API_URL } = process.env;

  const formData = new FormData();
  formData.append('firstName', candidate.firstName);
  formData.append('lastName', candidate.lastName);
  formData.append('phone', candidate.phone);
  formData.append('email', candidate.email);
  formData.append('website', candidate.website);
  formData.append('linkedin', candidate.linkedin);
  formData.append('jobId', candidate.jobId);
  formData.append('type', candidate.resume?.type);
  formData.append('resume', candidate.resume);
  formData.append('country', JSON.stringify(candidate.country));
  formData.append('state', JSON.stringify(candidate.state));
  formData.append('city', JSON.stringify(candidate.city));

  const res: Response = await fetch(
    `${REACT_APP_API_URL}/api/v1/candidate/apply`,
    {
      headers: {
        authorization: candidate.recaptcha,
      },
      method: 'POST',
      body: formData,
    },
  );

  if (!res.ok) {
    throw await res.json();
  }

  callback();

  return await res.json();
};

const deleteOne = (id: string) => {
  return apiClient.delete<ICandidate>(`/candidate/${id}`);
};

const editOne = (
  id: string,
  candidate: ICandidate,
): Promise<ICandidate> => {
  return apiClient
    .put<ICandidate>(`/candidate/${id}`, { body: candidate })
    .then((res: ICandidate) => res);
};

const getAll = (
  filter?: string,
  order?: string,
  orderBy?: string,
  rowsPerPage?: number,
  page?: number,
  search?: string,
): Promise<{
  count: number;
  rows: ICandidate[];
}> => {
  let endpoint = '/candidate?';

  if (filter && filter !== 'all') {
    if (search) {
      endpoint += `where={"stage":{"$eq":"${filter}"},"name":{"$like":"%25${search}%25"}}&`;
    } else {
      endpoint += `where={"stage":{"$eq":"${filter}"}}&`;
    }
  } else if (search) {
    endpoint += `where={"name":{"$like":"%25${search}%25"}}&`;
  }

  endpoint += `limit=${rowsPerPage}&offset=${
    (rowsPerPage as number) * (page as number)
  }&`;

  if (order && orderBy) {
    endpoint += `order=[["${orderBy}", "${order}"]]`;
  }

  return apiClient
    .get<ICandidate[]>(endpoint)
    .then((res: any) => res);
};

const getCandidateStatistics = (): Promise<any> => {
  return apiClient
    .get<ICandidate[]>('/candidate/statistics')
    .then((res: Array<ICandidate>) => res);
};

const getById = (id: string): Promise<ICandidate> => {
  return apiClient
    .get<ICandidate>(`/candidate/${id}`)
    .then((res: ICandidate) => res);
};

export default {
  addNew,
  addNewApplicant,
  deleteOne,
  editOne,
  getAll,
  getById,
  getCandidateStatistics,
};

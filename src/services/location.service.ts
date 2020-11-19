import { apiClient } from './Client';
import { ICity, ICountry, IState } from './typings';

const getCountries = (): Promise<ICountry[]> => {
  return apiClient
    .get<[]>('/location/countries/')
    .then((res: Array<ICountry>) => res);
};

const getStates = (countryId: string): Promise<IState[]> => {
  return apiClient
    .get<[]>(`/location/states/${countryId}`)
    .then((res: Array<IState>) => res);
};

const getCities = (stateId: string): Promise<ICity[]> => {
  return apiClient
    .get<[]>(`/location/cities/${stateId}`)
    .then((res: Array<ICity>) => res);
};

export default { getCountries, getStates, getCities };

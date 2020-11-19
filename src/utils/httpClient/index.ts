import fetchWrapper from './FetchWrapper';

const DEFAULT_HTTP_CONFIGURATION = {
  baseURL: '',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
};

export const httpClient = fetchWrapper.createInstance(
  DEFAULT_HTTP_CONFIGURATION,
);

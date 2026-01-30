import { BASE_URL } from '@env';

export let urlConfig = {
  BASE_URL: BASE_URL,
  SEARCH: 'search',
};

export const getCompleteUrl = (endpoint: string) =>
  urlConfig.BASE_URL + endpoint;

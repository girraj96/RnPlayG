import AsyncStorage from '@react-native-async-storage/async-storage';

import { i18n } from '../constants/lang';

import { getCompleteUrl } from '../configs/urls';
import { APP_LOG, checkIsNetConnected } from './helperFunctions';
import { isEmpty } from 'lodash';

const t = i18n.t;

export async function getHeaders(): Promise<Record<string, string>> {
  let value = await getItem('token');
  if (value) {
    return {
      Authorization: `Bearer ${value}`,
    };
  }
  return {};
}

export function setItem(key: string, data: object | any): Promise<void> {
  data = JSON.stringify(data);
  return AsyncStorage.setItem(key, data);
}

export async function getItem(key: string): Promise<any> {
  return AsyncStorage.getItem(key).then((data: any) => JSON.parse(data));
}

export function removeItem(key: string): Promise<void> {
  return AsyncStorage.removeItem(key);
}

export function clearAsyncStorage(): Promise<void> {
  return AsyncStorage.clear();
}

export function setUserData(data: string | object): Promise<void> {
  data = JSON.stringify(data);
  return AsyncStorage.setItem('userData', data);
}

// export function setTokenData(data: string | object): Promise<void> {
//   data = JSON.stringify(data);
//   return AsyncStorage.setItem('token', data);
// }

export function setRemeberedData(data: string | object): Promise<void> {
  data = JSON.stringify(data);
  return AsyncStorage.setItem('remeberedData', data);
}

export function setIntroScreenStatus(data: boolean): Promise<void> {
  let newData = JSON.stringify(data);
  return AsyncStorage.setItem('isIntroFinished', newData);
}

export async function getUserData(): Promise<any> {
  return AsyncStorage.getItem('userData').then((data: any) => JSON.parse(data));
}
export async function getRemeberedData(): Promise<any> {
  return AsyncStorage.getItem('remeberedData').then((data: any) =>
    JSON.parse(data),
  );
}

export async function getIntroScreenStatus(): Promise<any> {
  return AsyncStorage.getItem('isIntroFinished').then((data: any) =>
    JSON.parse(data),
  );
}

export async function clearUserData(): Promise<void> {
  return AsyncStorage.removeItem('userData');
}

// export async function clearToken(): Promise<void> {
//   return AsyncStorage.removeItem('token');
// }

export async function clearRemeberedData(): Promise<void> {
  return AsyncStorage.removeItem('remeberedData');
}

export async function clearIntroScreenStatus(): Promise<void> {
  return AsyncStorage.removeItem('isIntroFinished');
}

interface ApiRequestOptions {
  headers?: Record<string, string>;
  [key: string]: any;
}

export async function apiReq(
  endPoint: string,
  data?: object | FormData, // Accept FormData as well
  method?: string,
  headers?: Record<string, string>,
  requestOptions?: ApiRequestOptions,
): Promise<any> {
  return new Promise(async (res, rej) => {
    const isConnected = await checkIsNetConnected();

    if (!isConnected) {
      return rej({ message: t('PLEASE_CONNECT_INTERNET') });
    }

    const getTokenHeader = await getHeaders();

    headers = {
      ...getTokenHeader,
      'Content-Type': 'application/json',

      ...headers,
    };
    let body;
    if (method === 'GET' || method === 'DELETE') {
      requestOptions = {
        params: data,
        headers,
        ...requestOptions,
      };
    } else {
      if (data instanceof FormData) {
        body = data;
        headers['Content-Type'] = 'multipart/form-data';
      } else {
        headers['Content-Type'] = 'application/json';
        body = JSON.stringify(data);
      }
    }

    const url = getCompleteUrl(endPoint);

    const fetchOptions: RequestInit = {
      method,
      headers,
      body,
    };
    APP_LOG(url, '<=:url sending');
    APP_LOG(data, '<=:data sending');
    APP_LOG(headers, '<=:headers sending');

    fetch(url, fetchOptions)
      .then(async response => {
        const responseData = await response.json();
        APP_LOG(`result: ${endPoint} 👉🥷 👉🥷 👉🥷 👉🥷 👉`, responseData);
        if (!isEmpty(responseData)) {
          return res(responseData);
        } else {
          return rej(responseData);
        }
      })
      .catch(error => {
        APP_LOG(error, '<===error 🚫💩🚫💩🚫💩🚫💩🚫');
        return rej({ error: t('NETWORK_ERROR'), message: t('NETWORK_ERROR') });
      });
  });
}

export function apiPost(
  endPoint: string,
  data: object | FormData,
  headers = {},
): Promise<any> {
  return apiReq(endPoint, data, 'POST', headers);
}

export function apiDelete(
  endPoint: string,
  data: object | FormData,
  headers = {},
): Promise<any> {
  return apiReq(endPoint, data, 'DELETE', headers);
}

export function apiGet(
  endPoint: string,
  data?: object,
  headers = {},
  requestOptions?: ApiRequestOptions,
): Promise<any> {
  return apiReq(endPoint, data, 'GET', headers, requestOptions);
}

export const apiPut = (
  endPoint: string,
  data: object | FormData,
  headers = {},
): Promise<any> => {
  return apiReq(endPoint, data, 'PUT', headers);
};

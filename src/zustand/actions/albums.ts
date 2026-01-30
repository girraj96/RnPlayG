import { urlConfig } from '../../configs/urls';
import { apiGet, apiPost } from '../../utils/utils';
import { ITunesSearchResponse, useAlbumStore } from '../albums';

export function getAlbumList(uri = '', data = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    apiGet(urlConfig.SEARCH + uri, data, headers)
      .then((res: ITunesSearchResponse) => {
        useAlbumStore.getState().addToAlbums(res);
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}

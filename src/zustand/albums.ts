import { create } from 'zustand';
import { debounce } from 'lodash';
import { immer } from 'zustand/middleware/immer';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Album {
  id: number;
  title: string;
  artist: string;
  image: string;
  genre?: string;
  price?: number;
  currency?: string;
  releaseDate?: string;
  description?: string;
}

export interface AlbumItem {
  wrapperType: string;
  kind?: string;

  artistId?: number;
  trackId: number;

  artistName: string;
  trackName: string;
  trackCensoredName?: string;

  artistViewUrl?: string;
  trackViewUrl?: string;
  previewUrl?: string;

  artworkUrl30?: string;
  artworkUrl60?: string;
  artworkUrl100?: string;

  collectionPrice?: number;
  trackPrice?: number;
  trackRentalPrice?: number;

  collectionHdPrice?: number;
  trackHdPrice?: number;
  trackHdRentalPrice?: number;

  releaseDate?: string;

  collectionExplicitness?: string;
  trackExplicitness?: string;

  trackTimeMillis?: number;

  country?: string;
  currency?: string;

  primaryGenreName?: string;
  contentAdvisoryRating?: string;

  shortDescription?: string;
  longDescription?: string;
}

export interface ITunesSearchResponse {
  resultCount: number;
  results: AlbumItem[];
}

export interface AlbumState {
  albumsList: AlbumItem[] | [];

  addToAlbums: (data: ITunesSearchResponse) => void;
}

const debouncedSetItem = debounce(
  AsyncStorage.setItem.bind(AsyncStorage),
  300,
  { leading: false, trailing: true },
);

const storageWrapper = {
  getItem: AsyncStorage.getItem.bind(AsyncStorage),
  setItem: (key: string, value: string) => debouncedSetItem(key, value),
  removeItem: AsyncStorage.removeItem.bind(AsyncStorage),
};

export const useAlbumStore = create<AlbumState>()(
  persist(
    immer((set, get) => ({
      albumsList: [],

      clearAlbums: () =>
        set(draft => {
          draft.albumsList = [];
        }),

      addToAlbums: data => {
        set(draft => {
          draft.albumsList = data.results;
        });
      },
    })),
    {
      name: 'Albums-storage',
      storage: createJSONStorage(() => storageWrapper as any),
      partialize: state => ({
        albumsList: state.albumsList,
      }),
    },
  ),
);

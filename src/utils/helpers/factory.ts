import { DataKey } from '@data/types/types';
import {
  FEEDS_BY_USERID_URL,
  FEEDS_METADATA_BY_USERID_URL,
  FEEDS_URL,
  TALES_METADATA_BY_USERID_URL,
  TALES_METADATA_URL,
  TALES_URL,
} from '@constants/urls';

export const keyFactory = (key: DataKey, id: string = '') => {
  switch (key) {
    case 'tale-by-taleid':
      return [key, id];

    case 'feed-by-feedid':
      return [key, id];

    case 'feeds-by-userid':
      return [key, id];

    case 'feeds':
      return [key, id];

    default:
      console.error('Key not supported');
      return [];
  }
};

export const urlFactory = (
  key: DataKey,
  options?: { id?: string; base64Key?: string },
) => {
  switch (key) {
    case 'feeds':
      return FEEDS_URL;

    case 'feed-by-feedid':
      if (options && options.id) {
        return `${FEEDS_URL}/${options.id}`;
      }
      throw Error(`id is required for key ${key}`);

    case 'feeds-by-userid':
      if (options && options.id) {
        return `${FEEDS_BY_USERID_URL}/${options.id}`;
      }
      throw Error(`id is required for key ${key}`);

    case 'feeds-metadata-by-userid':
      if (options && options.id) {
        return `${FEEDS_METADATA_BY_USERID_URL}/${options.id}`;
      }
      throw Error(`id is required for key ${key}`);

    case 'tales-metadata-by-userid':
      if (options && options.id) {
        return `${TALES_METADATA_BY_USERID_URL}/${options.id}`;
      }
      throw Error(`id is required for key ${key}`);

    case 'tales-metadata':
      if (options?.base64Key) {
        return `${TALES_METADATA_URL}?base64Key=${options.base64Key}`;
      }
      return TALES_METADATA_URL;

    case 'tale-by-taleid':
      if (options && options.id) {
        return `${TALES_URL}/${options.id}`;
      }
      throw Error(`id is required for key ${key}`);

    default:
      throw Error(`Key ${key} is not supported`);
  }
};

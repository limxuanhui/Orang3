import { DataKey } from '@data/types/types';
import {
  EDIT_FEED_URL,
  FEEDS_BY_USERID_URL,
  FEEDS_METADATA_BY_USERID_URL,
  FEEDS_URL,
  NEW_FEED_URL,
  TALES_METADATA_BY_USERID_URL,
  TALES_METADATA_URL,
  TALES_URL,
} from '@constants/urls';

export const keyFactory = (key: DataKey, id?: string) => {
  switch (key) {
    case 'tale-by-taleid':
      if (id) {
        return [key, id];
      }
      throw Error(`Key ${key} requires a valid id. ${id} is invalid.`);

    case 'tales-metadata-by-userid':
      if (id) {
        return [key, id];
      }
      throw Error(`Key ${key} requires a valid id. ${id} is invalid.`);

    case 'feed-by-feedid':
      if (id) {
        return [key, id];
      }
      throw Error(`Key ${key} requires a valid id. ${id} is invalid.`);

    case 'feeds-by-userid':
      if (id) {
        return [key, id];
      }
      throw Error(`Key ${key} requires a valid id. ${id} is invalid.`);

    case 'feeds-metadata-by-userid':
      if (id) {
        return [key, id];
      }
      throw Error(`Key ${key} requires a valid id. ${id} is invalid.`);

    case 'feeds':
      return [key];

    case 'tales-metadata':
      return [key];

    default:
      throw Error(`Key ${key} is not suppoted.`);
  }
};

export const urlFactory = (
  key: DataKey,
  options?: { id?: string; base64Key?: string },
) => {
  switch (key) {
    case 'feeds':
      if (options && options.base64Key) {
        return `${FEEDS_URL}?base64Key=${options.base64Key}`;
      }
      return FEEDS_URL;

    case 'feed-new':
      return NEW_FEED_URL;

    case 'feed-edit':
      return EDIT_FEED_URL;

    case 'feed-by-feedid':
      if (options && options.id) {
        return `${FEEDS_URL}/${options.id}`;
      }
      throw Error(`Key ${key} requires a valid id.`);

    case 'feeds-by-userid':
      if (options && options.id) {
        return `${FEEDS_BY_USERID_URL}/${options.id}`;
      }
      throw Error(`Key ${key} requires a valid id.`);

    case 'feeds-metadata-by-userid':
      console.log(`Running factory function to generate ${key}`);
      console.log(`Options ${options}`);
      if (options && options.id) {
        if (options.base64Key) {
          return `${FEEDS_METADATA_BY_USERID_URL}/${options.id}?base64Key=${options.base64Key}`;
        }
        return `${FEEDS_METADATA_BY_USERID_URL}/${options.id}`;
      }
      throw Error(`Key ${key} requires a valid id.`);

    case 'tales-metadata-by-userid':
      if (options && options.id) {
        return `${TALES_METADATA_BY_USERID_URL}/${options.id}`;
      }
      throw Error(`Key ${key} requires a valid id.`);

    case 'tales-metadata':
      if (options?.base64Key) {
        return `${TALES_METADATA_URL}?base64Key=${options.base64Key}`;
      }
      return TALES_METADATA_URL;

    case 'tale-by-taleid':
      if (options && options.id) {
        return `${TALES_URL}/${options.id}`;
      }
      throw Error(`Key ${key} requires a valid id.`);

    default:
      throw Error(`Key ${key} is not supported.`);
  }
};

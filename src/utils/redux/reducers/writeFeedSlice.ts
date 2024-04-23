import { createSlice } from '@reduxjs/toolkit';
import type { FeedItem, FeedMetadata } from '@components/feed/types/types';

export type WriteFeedState = Readonly<{
  metadata: FeedMetadata;
  items: FeedItem[];
  posting: boolean;
  selectedItemId: number;
  mode: 'NEW' | 'EDIT';
  changes: {
    type: 'NONE' | 'ONLY_CAPTIONS' | 'MUTATE';
    modified: FeedItem[];
    deleted: FeedItem[];
  };
}>;

const initialState: WriteFeedState = {
  metadata: {
    id: '',
    creator: {
      id: '',
      name: '',
      handle: '',
      email: '',
      avatar: {
        id: '',
        type: 'image/unknown',
        uri: '',
        height: -1,
        width: -1,
      },
    },
    thumbnail: {
      id: '',
      type: 'image/unknown',
      uri: '',
      height: -1,
      width: -1,
    },
  },
  items: [],
  posting: false,
  selectedItemId: 0,
  mode: 'NEW',
  changes: {
    type: 'NONE',

    // if only captions of any or all items changed, then modified = changed items
    // if any feeditem is added or deleted, clear modified and set it to items state
    modified: [],

    // deleted items should be added here
    deleted: [],
  },
};

const writeFeedSlice = createSlice({
  name: 'writeFeed',
  initialState,
  reducers: {
    writeFeed_initFeed: (state, action) => {
      state.metadata = action.payload.metadata;
      state.items = action.payload.items.map((el: FeedItem) => ({
        ...el,
        isRemote: true,
      }));
      state.mode = 'EDIT';
    },
    writeFeed_setMetadata: (state, action) => {
      state.metadata = action.payload.metadata;
    },
    writeFeed_addItems: (state, action) => {
      if (action.payload.id === 0 && state.items.length === 0) {
        state.items = action.payload.items;
      } else {
        state.items.splice(action.payload.id + 1, 0, ...action.payload.items);
      }

      if (state.mode === 'EDIT') {
        if (state.changes.type !== 'MUTATE') {
          state.changes.type = 'MUTATE';
        }
      }
    },
    writeFeed_deleteItemById: (state, action) => {
      const deleted = state.items[action.payload.id];

      if (action.payload.id === 0) {
        state.items = state.items.slice(action.payload.id + 1);
      } else if (
        action.payload.id > 0 &&
        action.payload.id < state.items.length - 1
      ) {
        state.items.splice(action.payload.id, 1);
      } else {
        state.items = state.items.slice(0, action.payload.id);
      }

      if (state.mode === 'EDIT') {
        if (deleted.isRemote) {
          state.changes.deleted.push(deleted);
        }
        if (state.changes.type !== 'MUTATE') {
          state.changes.type = 'MUTATE';
        }
      }
    },
    writeFeed_editCaption: (state, action) => {
      state.items[action.payload.id].caption = action.payload.caption;
      if (state.mode === 'EDIT') {
        if (state.changes.type !== 'MUTATE') {
          if (state.changes.type === 'NONE') {
            state.changes.type = 'ONLY_CAPTIONS';
          }

          state.changes.modified.push(state.items[action.payload.id]);
        } else {
          state.changes.modified = state.items;
        }
      }
    },
    writeFeed_updateModified: state => {
      if (state.changes.type === 'MUTATE') {
        state.changes.modified = state.items;
      }
    },
    writeFeed_setPosting: (state, action) => {
      state.posting = action.payload;
    },
    writeFeed_setSelectedItemId: (state, action) => {
      state.selectedItemId = action.payload.id;
    },
    writeFeed_reorderFeedItems: state => {
      state.items = state.items.map((feedItem, index) => ({
        ...feedItem,
        order: index,
      }));
    },
    writeFeed_resetWriteFeedSlice: () => initialState,
  },
});

export const {
  writeFeed_initFeed,
  writeFeed_setMetadata,
  writeFeed_addItems,
  writeFeed_deleteItemById,
  writeFeed_editCaption,
  writeFeed_updateModified,
  writeFeed_resetWriteFeedSlice,
  writeFeed_reorderFeedItems,
  writeFeed_setPosting,
  writeFeed_setSelectedItemId,
} = writeFeedSlice.actions;
export default writeFeedSlice.reducer;

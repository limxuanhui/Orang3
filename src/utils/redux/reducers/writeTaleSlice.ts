import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import type { WriteTale } from '@components/tale/types/types';
// import type { FeedItemThumbnail } from '@components/tale/types/types';
// import { DUMMY_FEEDS_ITEMS_THUMBNAILS } from '@data/feeds-thumbnails-list';
// import { BACKEND_BASE_URL } from '@env';

type WriteTaleState = Readonly<WriteTale>;

const initialState: WriteTaleState = {
  metadata: {
    id: '',
    creator: {
      id: '',
      name: '',
      handle: '',
      email: '',
      avatar: undefined,
    },
    cover: undefined,
    thumbnail: undefined,
    title: '',
  },
  itinerary: {
    id: '',
    creatorId: '',
    routes: [
      {
        id: '',
        name: '',
        routeNodes: [],
        encodedPolyline: '',
      },
    ],
  },
  story: [],
  posting: false,
  saving: false,
};

const writeTaleSlice = createSlice({
  name: 'writeTale',
  initialState,
  reducers: {
    writeTale_setFetchedTale: (state, action) => {
      state.metadata = action.payload.tale.metadata;
      state.itinerary = action.payload.tale.itinerary;
      state.story = action.payload.tale.story;
    },
    writeTale_setCover: (state, action) => {
      state.metadata.cover = action.payload;
    },
    writeTale_setTitle: (state, action) => {
      state.metadata.title = action.payload;
    },
    writeTale_createTaleItinerary: (state, action) => {
      state.itinerary = {
        id: uuidv4(),
        creatorId: action.payload.creatorId,
        routes: [
          {
            id: uuidv4(),
            name: 'Day 1',
            routeNodes: [],
            polyline: [],
            encodedPolyline: '',
          },
        ],
      };
    },
    writeTale_setTaleItinerary: (state, action) => {
      state.itinerary = action.payload.itinerary;
    },

    writeTale_addStoryItem: (state, action) => {
      state.story.push(action.payload.newStoryItem);
    },
    writeTale_deleteStoryItem: (state, action) => {
      state.story.splice(action.payload.itemId, 1);
    },
    writeTale_setStoryItemText: (
      state,
      action: PayloadAction<{ id: string; text: string }>,
    ) => {
      const currIndex = state.story.findIndex(
        el => el.id === action.payload.id,
      );
      const updatedStory = {
        ...state.story[currIndex],
        text: action.payload.text,
      };
      state.story = [
        ...state.story.slice(0, currIndex),
        updatedStory,
        ...state.story.slice(currIndex + 1),
      ];
    },
    writeTale_setPosting: (state, action) => {
      state.posting = action.payload;
    },
    // writeTale_setSaving: (state, action) => {
    //   state.saving = action.payload;
    // },
    writeTale_resetWriteTaleSlice: () => initialState,
  },
});

export const {
  writeTale_setFetchedTale,
  writeTale_setCover,
  writeTale_setTitle,
  writeTale_createTaleItinerary,
  writeTale_setTaleItinerary,
  writeTale_addStoryItem,
  writeTale_deleteStoryItem,
  writeTale_setStoryItemText,
  writeTale_setPosting,
  // writeTale_setSaving,
  writeTale_resetWriteTaleSlice,
} = writeTaleSlice.actions;
export default writeTaleSlice.reducer;

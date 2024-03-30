import { Draft, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import type { WriteTale } from '@components/tale/types/types';
import { StoryItem, StoryText } from 'components/post/types/types';
import { ulid } from 'ulid';

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
    metadata: {
      id: '',
      creator: {
        id: '',
        name: '',
        handle: '',
        email: '',
        avatar: undefined,
      },
    },
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
  selectedStoryItemIndex: 0,
};

const writeTaleSlice = createSlice({
  name: 'writeTale',
  initialState,
  reducers: {
    writeTale_initTale: (state, action) => {
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
        metadata: {
          id: ulid(),
          creator: action.payload.creator,
        },
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

    writeTale_addStoryItem: (
      state,
      action: PayloadAction<{
        newStoryItem: Draft<StoryItem>;
        insertAtIndex: number;
      }>,
    ) => {
      state.story.splice(
        action.payload.insertAtIndex,
        0,
        action.payload.newStoryItem,
      );
    },
    writeTale_deleteStoryItem: (
      state,
      action: PayloadAction<{ deleteFromIndex: number }>,
    ) => {
      state.story.splice(action.payload.deleteFromIndex, 1);
    },
    writeTale_setSelectedStoryItemIndex: (
      state,
      action: PayloadAction<{ selectedStoryItemIndex: number }>,
    ) => {
      state.selectedStoryItemIndex = action.payload.selectedStoryItemIndex;
    },
    writeTale_reorderStoryItems: state => {
      state.story = state.story.map((storyItem, index) => ({
        ...storyItem,
        order: index,
      }));
    },
    writeTale_setStoryItemText: (
      state,
      action: PayloadAction<{ id: string; text: string }>,
    ) => {
      const currIndex = state.story.findIndex(
        el => el.id === action.payload.id,
      );
      const selectedStoryItem = state.story[currIndex] as Draft<StoryText>;

      const updatedStoryText = {
        ...state.story[currIndex],
        data: {
          ...selectedStoryItem.data,
          text: action.payload.text,
        },
      } as Draft<StoryText>;

      state.story = [
        ...state.story.slice(0, currIndex),
        updatedStoryText,
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
  writeTale_initTale,
  writeTale_setCover,
  writeTale_setTitle,
  writeTale_createTaleItinerary,
  writeTale_setTaleItinerary,
  writeTale_addStoryItem,
  writeTale_deleteStoryItem,
  writeTale_setSelectedStoryItemIndex,
  writeTale_reorderStoryItems,
  writeTale_setStoryItemText,
  writeTale_setPosting,
  // writeTale_setSaving,
  writeTale_resetWriteTaleSlice,
} = writeTaleSlice.actions;
export default writeTaleSlice.reducer;

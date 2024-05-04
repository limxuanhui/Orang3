import { Draft, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import type { Tale, WriteTale } from '@components/tale/types/types';
import { StoryItem, StoryText } from 'components/post/types/types';
import { ulid } from 'ulid';
import { Itinerary, Route } from '@components/itinerary/types/types';
import { GypsieUser } from '@navigators/types/types';
import { Media } from '@components/feed/types/types';

type WriteTaleState = Readonly<WriteTale>;

const initialState: WriteTaleState = {
  mode: 'NEW',
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
        polyline: [],
        order: 0,
      },
    ],
  },
  story: [],
  posting: false,
  saving: false,
  selectedStoryItemIndex: -1,
  changes: {
    metadata: {
      type: 'NONE',
      modified: [
        {
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
      ],
      deleted: [],
    },
    routes: {
      type: 'NONE',
      modified: [],
      deleted: [],
    },
    storyItems: {
      type: 'NONE',
      modified: [],
      deleted: [],
    },
  },
};

const writeTaleSlice = createSlice({
  name: 'writeTale',
  initialState,
  reducers: {
    writeTale_initTale: (
      state,
      action: PayloadAction<{
        tale: Tale;
      }>,
    ) => {
      state.mode = 'EDIT';
      state.metadata = action.payload.tale.metadata;
      state.itinerary.metadata = action.payload.tale.itinerary.metadata;
      state.itinerary.routes = action.payload.tale.itinerary.routes.map(
        (el: Route) => ({ ...el, isRemote: true }),
      );
      state.story = action.payload.tale.story.map((el: StoryItem) => ({
        ...el,
        isRemote: true,
      }));
      state.changes.metadata.modified[0].id = action.payload.tale.metadata.id;
      state.changes.metadata.modified[0].creator =
        action.payload.tale.metadata.creator;
    },
    writeTale_createTaleItinerary: (
      state,
      action: PayloadAction<{
        creator: GypsieUser;
      }>,
    ) => {
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
            order: 0,
          },
        ],
      };
    },
    writeTale_setTaleItinerary: (
      state,
      action: PayloadAction<{
        itinerary: Itinerary;
      }>,
    ) => {
      state.itinerary = action.payload.itinerary;
    },
    writeTale_setCover: (
      state,
      action: PayloadAction<{
        cover?: Media;
      }>,
    ) => {
      state.metadata.cover = action.payload.cover;
    },
    writeTale_setTitle: (
      state,
      action: PayloadAction<{
        title: string;
      }>,
    ) => {
      state.metadata.title = action.payload.title;
    },
    writeTale_updateMetadataType: (
      state,
      action: PayloadAction<{
        type: 'ONLY_EDITED_TITLE' | 'MUTATE';
      }>,
    ) => {
      state.changes.metadata.type = action.payload.type;
    },
    writeTale_updateRoutesType: (
      state,
      action: PayloadAction<{
        type: 'ONLY_EDITED_ROUTES' | 'MUTATE';
      }>,
    ) => {
      state.changes.routes.type = action.payload.type;
    },
    writeTale_updateStoryItemsType: (
      state,
      action: PayloadAction<{
        type: 'ONLY_EDITED_STORY_TEXT' | 'MUTATE';
      }>,
    ) => {
      state.changes.storyItems.type = action.payload.type;
    },
    writeTale_updateModified: (
      state,
      action: PayloadAction<{
        type: 'METADATA' | 'ROUTES' | 'STORYITEMS';
        id?: string;
        mutateAction?: 'ADD' | 'DELETE';
      }>,
    ) => {
      if (state.mode === 'EDIT') {
        switch (action.payload.type) {
          case 'METADATA':
            if (state.changes.metadata.type === 'MUTATE') {
              if (action.payload.mutateAction === 'DELETE') {
                if (
                  action.payload.id &&
                  !state.changes.metadata.deleted.includes(action.payload.id)
                ) {
                  state.changes.metadata.deleted.push(action.payload.id);
                }
              }
              console.log('state.metadata.cover:', state.metadata.cover);
              state.changes.metadata.modified[0].cover = state.metadata.cover;
              state.changes.metadata.modified[0].title = state.metadata.title;
            } else if (state.changes.metadata.type === 'ONLY_EDITED_TITLE') {
              state.changes.metadata.modified[0].title = state.metadata.title;
            }

            // if (state.changes.metadata.modified.length === 0) {
            //   state.changes.metadata.modified.push(state.metadata);
            // } else {
            //   // any metadata change (title or cover) will copy entire state.metadata to changes
            //   state.changes.metadata.modified[0] = state.metadata;
            // }
            break;
          case 'ROUTES':
            if (state.changes.routes.type === 'MUTATE') {
              if (action.payload.mutateAction === 'DELETE') {
                if (action.payload.id) {
                  state.changes.routes.deleted.push(action.payload.id);
                }
              }

              state.changes.routes.modified = state.itinerary.routes;
            } else if (state.changes.routes.type === 'ONLY_EDITED_ROUTES') {
              const currIndex = state.itinerary.routes.findIndex(
                (el: Route) => el.id === action.payload.id,
              );

              if (currIndex === -1) {
                throw Error('Edits might not have been saved');
              }

              const selectedRoute = state.itinerary.routes[currIndex];

              // Check if selected route is already in modified
              const trackedRouteIndex = state.changes.routes.modified.findIndex(
                (el: Route) => el.id === selectedRoute.id,
              );

              if (trackedRouteIndex === -1) {
                state.changes.routes.modified.push(selectedRoute);
              } else {
                state.changes.routes.modified[trackedRouteIndex] =
                  selectedRoute;
              }
            }
            break;
          case 'STORYITEMS':
            if (state.changes.storyItems.type !== 'MUTATE') {
              if (state.changes.storyItems.type === 'NONE') {
                state.changes.storyItems.type = 'ONLY_EDITED_STORY_TEXT';
              }
              const currIndex = state.story.findIndex(
                el => el.id === action.payload.id,
              );

              if (currIndex === -1) {
                throw Error('Edits might not have been saved.');
              }

              const selectedStoryItem = state.story[
                currIndex
              ] as Draft<StoryText>;

              // Check if selected story item is already in modified
              const trackedStoryItemIndex =
                state.changes.storyItems.modified.findIndex(
                  el => el.id === selectedStoryItem.id,
                );
              if (trackedStoryItemIndex === -1) {
                state.changes.storyItems.modified.push(selectedStoryItem);
              } else {
                state.changes.storyItems.modified[trackedStoryItemIndex] =
                  selectedStoryItem;
              }
            } else {
              state.changes.storyItems.modified = state.story;
            }
            break;
          default:
            break;
        }
      }
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

      if (state.mode === 'EDIT') {
        if (state.changes.storyItems.type !== 'MUTATE') {
          state.changes.storyItems.type = 'MUTATE';
        }
      }
    },
    writeTale_deleteStoryItemByIndex: (
      state,
      action: PayloadAction<{ deleteFromIndex: number }>,
    ) => {
      const deleted = state.story[action.payload.deleteFromIndex];
      state.story.splice(action.payload.deleteFromIndex, 1);

      if (state.mode === 'EDIT') {
        if (deleted.isRemote) {
          state.changes.storyItems.deleted.push(deleted.id);
        }
        if (state.changes.storyItems.type !== 'MUTATE') {
          state.changes.storyItems.type = 'MUTATE';
        }
      }
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
  writeTale_createTaleItinerary,
  writeTale_setTaleItinerary,
  writeTale_setCover,
  writeTale_setTitle,
  writeTale_updateMetadataType,
  writeTale_updateRoutesType,
  writeTale_updateStoryItemsType,
  writeTale_updateModified,
  writeTale_addStoryItem,
  writeTale_deleteStoryItemByIndex,
  writeTale_setSelectedStoryItemIndex,
  writeTale_reorderStoryItems,
  writeTale_setStoryItemText,
  writeTale_setPosting,
  // writeTale_setSaving,
  writeTale_resetWriteTaleSlice,
} = writeTaleSlice.actions;
export default writeTaleSlice.reducer;

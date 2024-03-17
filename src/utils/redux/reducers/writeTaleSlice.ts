import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import type { FeedItemThumbnail } from '@components/tale/types/types';
import type { WriteTale } from '@components/tale/types/types';
import { DUMMY_FEEDS_ITEMS_THUMBNAILS } from '@data/feeds-thumbnails-list';
import { BACKEND_BASE_URL } from '@env';

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
  feedItemThumbnails: {
    data: [],
    status: 'idle',
    error: '',
  },
};

// Replace with useQuery
export const writeTale_fetchFeeds = createAsyncThunk(
  'newTale/fetchFeeds',
  async (userId: string, thunkAPI) => {
    try {
      const url = BACKEND_BASE_URL + '/api/userId';
      // const response = await axios.get(url);
      // console.log(JSON.stringify(response.data, null, 4));
      // return response.data;

      // ----------- Sample code for testing request -----------
      const fetchFeedsListPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(DUMMY_FEEDS_ITEMS_THUMBNAILS);
        }, 3000);
      });
      const result = fetchFeedsListPromise.then(v => v);
      console.log(result);
      // -------------------------------------------------------

      return result;
    } catch (err: unknown) {
      if (err instanceof Error) {
        return err.message;
      }
      // else if (err instanceof AxiosError) {}
    }
  },
);

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
  extraReducers: builder => {
    // fetchFeeds
    builder
      .addCase(writeTale_fetchFeeds.pending, (state, action) => {
        state.feedItemThumbnails.status = 'pending';
      })
      .addCase(writeTale_fetchFeeds.fulfilled, (state, action) => {
        state.feedItemThumbnails.status = 'succeeded';
        state.feedItemThumbnails.data = action.payload as FeedItemThumbnail[][];
      })
      .addCase(writeTale_fetchFeeds.rejected, (state, action) => {
        state.feedItemThumbnails.status = 'failed';
        state.feedItemThumbnails.error = action.error.message;
      });
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

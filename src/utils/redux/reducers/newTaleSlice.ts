import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import type { FeedItemThumbnail } from "../../../components/tale/types/types";
import type { NewTale } from "../../../components/tale/types/types";
import { BACKEND_BASE_URL } from "@env";
import { DUMMY_FEEDS_ITEMS_THUMBNAILS } from "../../../data/feeds-thumbnails-list";

type NewTaleState = Readonly<NewTale>;

const initialState: NewTaleState = {
  id: "",
  cover: null,
  title: "",
  itinerary: {
    id: "",
    creatorId: "",
    routes: [
      {
        id: "",
        name: "Day 1",
        routeNodes: [],
        isRouted: false,
        polyline: [],
      },
    ],
  },
  story: [],
  posting: false,
  saving: false,
  feedItemThumbnails: {
    data: [],
    status: "idle",
    error: "",
  },
  // selectedItemId: 0,
};

export const fetchFeeds = createAsyncThunk(
  "newItineraryPost/fetchFeeds",
  async (userId: string, thunkAPI) => {
    try {
      const url = BACKEND_BASE_URL + "/userId";
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

const newTaleSlice = createSlice({
  name: "newTale",
  initialState,
  reducers: {
    setCover: (state, action) => {
      state.cover = action.payload;
    },
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    createItinerary: (state, action) => {
      state.itinerary = {
        id: uuidv4(),
        creatorId: action.payload.creatorId,
        routes: [
          {
            id: uuidv4(),
            name: "Day 1",
            routeNodes: [],
            isRouted: false,
            polyline: [],
          },
        ],
      };
    },
    setItinerary: (state, action) => {
      state.itinerary.routes = action.payload.routes;
    },
    addStoryItem: (state, action) => {
      state.story.push(action.payload.newStoryItem);
    },
    deleteStoryItem: (state, action) => {
      state.story.splice(action.payload.itemId, 1);
    },
    setStoryItemText: (
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
    setPosting: (state, action) => {
      state.posting = action.payload;
    },
    setSaving: (state, action) => {
      state.saving = action.payload;
    },
  },
  extraReducers: builder => {
    // fetchFeeds
    builder
      .addCase(fetchFeeds.pending, (state, action) => {
        state.feedItemThumbnails.status = "pending";
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.feedItemThumbnails.status = "succeeded";
        state.feedItemThumbnails.data = action.payload as FeedItemThumbnail[][];
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.feedItemThumbnails.status = "failed";
        state.feedItemThumbnails.error = action.error.message;
      });
  },
});

export const {
  setCover,
  setTitle,
  createItinerary,
  setItinerary,
  addStoryItem,
  deleteStoryItem,
  setStoryItemText,
  setPosting,
  setSaving,
} = newTaleSlice.actions;
export default newTaleSlice.reducer;

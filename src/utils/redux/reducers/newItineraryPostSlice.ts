import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Asset } from "react-native-image-picker";
import axios, { AxiosError } from "axios";
import {
  StoryItemType,
  type ItineraryRow,
  type Story,
  StoryText,
} from "../../../components/post/types/types";
import type { LinkedFeedsListItem } from "../../../components/itinerary/types/types";
import { linkedFeedsList } from "../../../data/linkedFeedsList";

export type NewItineraryPostState = Readonly<{
  coverMedia: Asset | null;
  title: string;
  itineraryData: ItineraryRow[];
  storyData: Story;
  posting: boolean;
  saving: boolean;
  linkedFeedsList: {
    data: LinkedFeedsListItem[][];
    status: "idle" | "pending" | "succeeded" | "failed";
    error?: string;
  };
  // selectedItemId: number;
}>;

const initialState: NewItineraryPostState = {
  coverMedia: null,
  title: "",
  itineraryData: [],
  storyData: [],
  posting: false,
  saving: false,
  linkedFeedsList: {
    data: [],
    status: "idle",
  },
  // selectedItemId: 0,
};

export const fetchUserLinkedFeedsList = createAsyncThunk(
  "newItineraryPost/fetchUserLinkedFeedsList",
  async (userId: string, thunkAPI) => {
    try {
      // const url = "backend url to fetch linkedFeeds/userId";
      // const response = await axios.get(url);
      // console.log(JSON.stringify(response.data, null, 4));
      // return response.data;

      // ----------- Sample code for testing request -----------
      const fetchFeedsListPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(linkedFeedsList);
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

const newItineraryPostSlice = createSlice({
  name: "newItineraryPost",
  initialState,
  reducers: {
    setCoverMedia: (state, action) => {
      state.coverMedia = action.payload;
    },
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setItineraryData: (state, action) => {},
    addStoryItem: (state, action) => {
      state.storyData.push(action.payload.newStoryItem);
    },
    deleteStoryItem: (state, action) => {
      state.storyData.splice(action.payload.itemId, 1);
    },
    setStoryItemText: (
      state,
      action: PayloadAction<{ id: string; text: string }>,
    ) => {
      const currIndex = state.storyData.findIndex(
        el => el.id === action.payload.id,
      );
      const updatedStoryData = {
        ...state.storyData[currIndex],
        text: action.payload.text,
      };
      state.storyData = [
        ...state.storyData.slice(0, currIndex),
        updatedStoryData,
        ...state.storyData.slice(currIndex + 1),
      ];

      console.log("STATE IS AFTER: ", JSON.stringify(state.storyData, null, 4));
    },
    setPosting: (state, action) => {
      state.posting = action.payload;
    },
    setSaving: (state, action) => {
      state.saving = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserLinkedFeedsList.pending, (state, action) => {
        state.linkedFeedsList.status = "pending";
      })
      .addCase(fetchUserLinkedFeedsList.fulfilled, (state, action) => {
        state.linkedFeedsList.status = "succeeded";
        state.linkedFeedsList.data = action.payload as LinkedFeedsListItem[][];
      })
      .addCase(fetchUserLinkedFeedsList.rejected, (state, action) => {
        state.linkedFeedsList.status = "failed";
        state.linkedFeedsList.error = action.error.message;
      });
  },
});

export const {
  setCoverMedia,
  setTitle,
  setItineraryData,
  addStoryItem,
  deleteStoryItem,
  setStoryItemText,
  setPosting,
  setSaving,
} = newItineraryPostSlice.actions;
export default newItineraryPostSlice.reducer;

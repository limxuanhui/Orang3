import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Asset } from "react-native-image-picker";
import { v4 as uuidv4 } from "uuid";
import type { Story } from "../../../components/post/types/types";
import type {
  Itinerary,
  LinkedFeedsListItem,
  RouteInfo,
} from "../../../components/itinerary/types/types";
import { linkedFeedsList } from "../../../data/linkedFeedsList";
import { BACKEND_BASE_URL } from "@env";

export type NewItineraryPostState = Readonly<{
  coverMedia: Asset | null;
  title: string;
  itineraryData: Itinerary;
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
  itineraryData: {
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
      const url = BACKEND_BASE_URL + "/userId";
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
    createItineraryData: (state, action) => {
      state.itineraryData = {
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
    setItineraryData: (state, action) => {
      state.itineraryData.routes = action.payload.routes;
    },
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
    // fetchUserLinkedFeedsList
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
  createItineraryData,
  setItineraryData,
  addStoryItem,
  deleteStoryItem,
  setStoryItemText,
  setPosting,
  setSaving,
} = newItineraryPostSlice.actions;
export default newItineraryPostSlice.reducer;

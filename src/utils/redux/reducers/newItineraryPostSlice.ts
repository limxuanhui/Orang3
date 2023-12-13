import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { Asset } from "react-native-image-picker";
import {
  StoryItemType,
  type ItineraryRow,
  type Story,
  StoryText,
} from "../../../components/post/types/types";

export type NewItineraryPostState = Readonly<{
  coverMedia: Asset | null;
  title: string;
  itineraryData: ItineraryRow[];
  storyData: Story;
  posting: boolean;
  saving: boolean;
  // selectedItemId: number;
}>;

const initialState: NewItineraryPostState = {
  coverMedia: null,
  title: "",
  itineraryData: [],
  storyData: [],
  posting: false,
  saving: false,
  // selectedItemId: 0,
};

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

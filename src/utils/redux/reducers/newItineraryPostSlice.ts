import { createSlice } from "@reduxjs/toolkit";
import type { Asset } from "react-native-image-picker";
import type { ItineraryRow, Story } from "../../../components/post/types/types";

export type NewItineraryPostState = Readonly<{
  coverMedia: Asset | null;
  title: string;
  itineraryData: ItineraryRow[];
  storyData: Story;
  posting: boolean;
  saving: boolean;
  selectedItemId: number;
}>;

const initialState: NewItineraryPostState = {
  coverMedia: null,
  title: "",
  itineraryData: [],
  storyData: [],
  posting: false,
  saving: false,
  selectedItemId: 0,
};

const newItineraryPostSlice = createSlice({
  name: "newItineraryPost",
  initialState,
  reducers: {
    setCoverMedia: (state, action) => {
      console.log("Before: ", state.coverMedia);
      state.coverMedia = action.payload;
      console.log("After: ", state.coverMedia);
    },
    setTitle: (state, action) => {
      console.log("Before: ", state.title);
      state.title = action.payload;
      console.log("After: ", state.title);
    },
    setItineraryData: (state, action) => {},
    addStoryItem: (state, action) => {
    //   state.storyData.push(action.payload.newStoryItem);
      console.log("STATE IS: ", state.storyData);
      state.storyData = [...state.storyData, action.payload.newStoryItem]
      console.log("STATE IS AFTER: ", state.storyData);
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
  setPosting,
  setSaving,
} = newItineraryPostSlice.actions;
export default newItineraryPostSlice.reducer;

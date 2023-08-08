import { createSlice } from "@reduxjs/toolkit";
import type { FeedItem } from "../../../components/feed/types/types";

export type NewFeedPostState = Readonly<{
  items: FeedItem[];
  posting: boolean;
  saving: boolean;
  selectedItemId: number;
}>;

const initialState: NewFeedPostState = {
  items: [],
  posting: false,
  saving: false,
  selectedItemId: 0,
};

const newFeedPostSlice = createSlice({
  name: "newFeedPost",
  initialState,
  reducers: {
    addItems: (state, action) => {
      console.log("Before: ", state.items);
      state.items.splice(action.payload.id, 0, ...action.payload.items);
      console.log("After: ", state.items);
    },
    deleteItemById: (state, action) => {
      if (action.payload === state.items.length - 1) {
        state.selectedItemId = action.payload - 1;
      }
      state.items.splice(action.payload, 1);
      console.log("DeleteItemById ended: ", state);
    },
    editCaption: (state, action) => {
      console.log(action.payload);
      const items = state.items.map((item, index) => {
        if (index === action.payload.id) {
          const newItem = { ...item, caption: action.payload.caption };
          console.log("NewItem: ", JSON.stringify(newItem, null, 4));
          return newItem;
        }
        return item;
      });
      console.log(JSON.stringify(items, null, 4));
      return { ...state, items };
    },
    reset: () => {
      console.log("Resetting...");
      return initialState;
    },
    setPosting: (state, action) => {
      state.posting = action.payload;
    },
    setSaving: (state, action) => {
      state.saving = action.payload;
    },
    setSelectedItemId: (state, action) => {
      state.selectedItemId = action.payload;
    },
  },
});

export const {
  addItems,
  deleteItemById,
  editCaption,
  reset,
  setPosting,
  setSaving,
  setSelectedItemId,
} = newFeedPostSlice.actions;
export default newFeedPostSlice.reducer;

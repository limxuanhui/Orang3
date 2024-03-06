import { createSlice } from "@reduxjs/toolkit";
import type { FeedItem } from "../../../components/feed/types/types";

export type WriteFeedState = Readonly<{
  items: FeedItem[];
  posting: boolean;
  selectedItemId: number;
}>;

const initialState: WriteFeedState = {
  items: [],
  posting: false,
  selectedItemId: 0,
};

const writeFeedSlice = createSlice({
  name: "writeFeed",
  initialState,
  reducers: {
    writeFeed_addItems: (state, action) => {
      console.log("Before: ", state.items);
      state.items.splice(action.payload.id, 0, ...action.payload.items);
      console.log("After: ", state.items);
    },
    writeFeed_deleteItemById: (state, action) => {
      if (action.payload === state.items.length - 1) {
        state.selectedItemId = action.payload - 1;
      }
      state.items.splice(action.payload, 1);
      console.log("DeleteItemById ended: ", state);
    },
    writeFeed_editCaption: (state, action) => {
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
    writeFeed_setPosting: (state, action) => {
      state.posting = action.payload;
    },
    writeFeed_setSelectedItemId: (state, action) => {
      state.selectedItemId = action.payload;
    },
    writeFeed_resetWriteFeedSlice: () => initialState,
  },
});

export const {
  writeFeed_addItems,
  writeFeed_deleteItemById,
  writeFeed_editCaption,
  writeFeed_resetWriteFeedSlice,
  writeFeed_setPosting,
  writeFeed_setSelectedItemId,
} = writeFeedSlice.actions;
export default writeFeedSlice.reducer;

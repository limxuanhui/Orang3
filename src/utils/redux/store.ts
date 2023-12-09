import { combineReducers, configureStore } from "@reduxjs/toolkit";
import newFeedPostReducer from "./reducers/newFeedPostSlice";
import newItineraryPostReducer from "./reducers/newItineraryPostSlice";

const rootReducer = combineReducers({
  newFeedPost: newFeedPostReducer,
  newItineraryPost: newItineraryPostReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;

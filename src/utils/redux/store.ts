import { combineReducers, configureStore } from "@reduxjs/toolkit";
import newFeedReducer from "./reducers/newFeedSlice";
import newTaleReducer from "./reducers/newTaleSlice";

const rootReducer = combineReducers({
  newFeed: newFeedReducer,
  newTale: newTaleReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;

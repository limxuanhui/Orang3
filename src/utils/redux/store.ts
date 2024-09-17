import { combineReducers, configureStore } from '@reduxjs/toolkit';
import itineraryPlannerReducer from '@redux/reducers/itineraryPlannerSlice';
import writeFeedReducer from '@redux/reducers/writeFeedSlice';
import writeTaleReducer from '@redux/reducers/writeTaleSlice';
import userReducer from '@redux/reducers/userSlice';

const rootReducer = combineReducers({
  user: userReducer,
  itineraryPlanner: itineraryPlannerReducer,
  writeFeed: writeFeedReducer,
  writeTale: writeTaleReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;

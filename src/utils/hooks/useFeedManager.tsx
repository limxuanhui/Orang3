import { useCallback, useReducer, useState } from "react";

const FeedReducer = () => {
  return {};
};

const useFeedManager = () => {
  const [state, dispatch] = useReducer(FeedReducer, {});
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const refreshPostsHandler = useCallback(async () => {
    // To implement real refresh
    console.warn("Refreshing!");
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      console.warn("Refreshed!");
    }, 1000);
  }, []);

  return { refreshing, refreshPostsHandler };
};

export default useFeedManager;

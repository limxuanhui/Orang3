import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { BACKEND_BASE_URL } from "@env";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../redux/hooks";
import { QueryKey, queryOptions, useInfiniteQuery, useQuery } from "@tanstack/react-query";

type DataKey = "feed" | "itinerary" | "tale" | "user";
type DataMode = "dev" | "test" | "prod";

/**
 * This hook manages all the data of the app components, except components with infinite scrolling.
 * @param mode
 * @param key
 * @returns
 */
const useDataManager = (mode: DataMode, key: DataKey) => {
  const queryFn = async ({ queryKey }: { queryKey: QueryKey }) => {
    // Destructure queryKey
    const [key] = queryKey;

    const response = await axios.get(`${BACKEND_BASE_URL}/api/${key}`);
  };
  const groupOptions = (id: number) => {
    return queryOptions({
      queryKey: [key],
      queryFn,
      staleTime: 1000 * 60 * 10, // 10 min
      initialData:null,
      _defaulted: false,
      // _optimisticResults:null,
      // behavior,
      enabled: false,
      gcTime: 1000*60*5,


    })
  }
  const {
    // data,
    dataUpdatedAt,
    error,
    errorUpdateCount,
    errorUpdatedAt,
    failureCount,
    failureReason,
    fetchStatus,
    isError,
    isFetched,
    isFetchedAfterMount,
    isFetching,
    isLoading,
    isLoadingError,
    isPaused,
    isPending,
    isPlaceholderData,
    isRefetchError,
    isRefetching,
    isSuccess,
    isStale,
    status,
    refetch,
  } = useQuery(groupOptions(1));

  // const infiniteQuery = useInfiniteQuery({
  //   queryKey: [key],
  //   initialPageParam: 0,
  //   getNextPageParam: 1,
  // });

  /**
   * Include T type for state of data as a generic.
   */
  const [data, setData] = useState(null);
  const dispatch = useDispatch();
  // const data2 = useAppSelector(state => state[key]);
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  /**
   * Include a generic (id: string) as parameter for fetching corresponding data from api.
   */
  const refreshPostsHandler = useCallback(async () => {
    // To implement real refresh
    console.warn("Refreshing!");
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      console.warn("Refreshed!");
    }, 1000);
  }, [setRefreshing]);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async (dataKey: string) => {
      setLoading(true);

      switch (mode) {
        case "prod":
          // Use Axios for production mode
          try {
            const response = await axios.get(BACKEND_BASE_URL + "/" + dataKey);
            if (isMounted) {
              setData(response.data);
              setLoading(false);
            }
          } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
          }

        case "dev":
          // Simulate loading with setTimeout for development mode
          const dummyData = null;
          setTimeout(() => {
            if (isMounted) {
              setData(dummyData); // Replace dummyData with your desired constant dummy data
              setLoading(false);
            }
          }, 1000); // Simulating a 1-second delay

        default:
          console.info(`${mode} mode is not handled.`);
      }
    };

    fetchData(key);

    return () => {
      isMounted = false;
    };
  }, [mode]);

  return { data, loading, refreshing, refreshPostsHandler };
};

export default useDataManager;

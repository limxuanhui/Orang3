import { useMemo } from "react";
import axios from "axios";
import {
  QueryKey,
  queryOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { BACKEND_BASE_URL } from "@env";
import { DUMMY_DATABASE } from "../../data/database";
import type { DataKey, DataMode } from "../../data/types/types";

/**
 * This hook manages all the data of the app components, except components with infinite scrolling.
 * @param dataMode
 * @param dataKey
 * @returns
 */
const useDataManager = (dataKey: DataKey, dataMode: DataMode = "prod") => {
  const queryFn = async ({ queryKey }: { queryKey: QueryKey }) => {
    const [key] = queryKey;

    switch (dataMode) {
      case "prod":
        try {
          const response = await axios.get(`${BACKEND_BASE_URL}/api/${key}`);
          return response.data;
        } catch (err) {
          console.error(err);
        }

      case "dev":
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(DUMMY_DATABASE[key as DataKey]);
          }, 2000);
        });
      default:
        // Do I need to return a promise here?
        console.info(`${dataMode} mode is not handled.`);
    }
  };

  const options = useMemo(() => {
    return queryOptions({
      queryKey: [dataKey],
      queryFn,
      staleTime: 1000 * 60 * 10, // 10 min
      initialData: null,
      // _defaulted: false,
      // _optimisticResults:null,
      // behavior,
      enabled: false,
      gcTime: 1000 * 60 * 5,
    });
  }, [queryOptions]);

  const {
    data,
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
  } = useQuery(options);

  const mutation = useMutation({});

  return {
    data,
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
  };
};

export default useDataManager;

// /**
//  * Include T type for state of data as a generic.
//  */
// const [data, setData] = useState(null);
// const dispatch = useDispatch();
// const [loading, setLoading] = useState<boolean>(false);
// const [refreshing, setRefreshing] = useState<boolean>(false);

// /**
//  * Include a generic (id: string) as parameter for fetching corresponding data from api.
//  */
// const refreshPostsHandler = useCallback(async () => {
//   // To implement real refresh
//   console.warn("Refreshing!");
//   setRefreshing(true);
//   setTimeout(() => {
//     setRefreshing(false);
//     console.warn("Refreshed!");
//   }, 1000);
// }, [setRefreshing]);

// useEffect(() => {
//   let isMounted = true;

//   const fetchData = async (dataKey: string) => {
//     setLoading(true);

//     switch (mode) {
//       case "prod":
//         // Use Axios for production mode
//         try {
//           const response = await axios.get(BACKEND_BASE_URL + "/" + dataKey);
//           if (isMounted) {
//             setData(response.data);
//             setLoading(false);
//           }
//         } catch (error) {
//           console.error("Error fetching data:", error);
//           setLoading(false);
//         }

//       case "dev":
//         // Simulate loading with setTimeout for development mode
//         const dummyData = null;
//         setTimeout(() => {
//           if (isMounted) {
//             setData(dummyData); // Replace dummyData with your desired constant dummy data
//             setLoading(false);
//           }
//         }, 1000); // Simulating a 1-second delay

//       default:
//         console.info(`${mode} mode is not handled.`);
//     }
//   };

//   fetchData(key);

//   return () => {
//     isMounted = false;
//   };
// }, [mode]);

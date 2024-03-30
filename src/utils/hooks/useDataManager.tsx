import { useCallback, useMemo } from 'react';
import { QueryKey, queryOptions, useQuery } from '@tanstack/react-query';
import { DUMMY_DATABASE } from '@data/database';
import type { DataKey } from '@data/types/types';
import { axiosClient } from '@helpers/singletons';
import useGlobals from './useGlobals';
import { printPrettyJson } from '@helpers/functions';
import { AxiosResponse } from 'axios';

const generateGetTaleByIdsKey = (taleIds: string[]): [string, string[]] => {
  return ['tales', taleIds];
};

/**
 * This hook manages all the data of the app components, except components with infinite scrolling.
 * @param dataMode
 * @param dataKey
 * @returns
 */
const useDataManager = (key: DataKey, ids: string[]) => {
  const { mode } = useGlobals();
  // use some form of a key factory

  const queryFn = useCallback(
    async ({ queryKey }: { queryKey: QueryKey }) => {
      const [itemKey, itemIds] = queryKey;
      console.log('QUERY FUNCTION CALLED IN USEDATAMANAGER');

      const idsList = itemIds as string[];
      switch (mode) {
        case 'production':
          try {
            let response: AxiosResponse;
            if (idsList.length === 1) {
              console.log(
                `Production axios client getting data for /${itemKey}/${idsList[0]}`,
              );
              response = await axiosClient.get(`/${itemKey}/${idsList[0]}`);
            } else if (idsList.length > 1) {
              response = await axiosClient.post(`/${itemKey}/list`, {
                data: idsList,
              });
              console.log('FEEDS FETCHED!');
              console.log(response.data);
              return response.data;
            } else {
              return null;
            }

            printPrettyJson(response.data);
            console.log('==================== THE END ====================');
            return response.data;
          } catch (err) {
            console.error(err);
          }
          break;

        case 'testing':
          break;
        case 'development':
          return new Promise((resolve, _reject) => {
            setTimeout(() => {
              resolve(DUMMY_DATABASE[key as DataKey]);
            }, 2000);
          });
        default:
          // Do I need to return a promise here?
          console.info(`${mode} mode is not handled.`);
      }
    },
    [key, mode],
  );

  const options = useMemo(() => {
    return queryOptions({
      queryKey: generateGetTaleByIdsKey(ids),
      queryFn,
      // initialData: null,
      enabled: true,
      staleTime: 1000 * 60 * 10, // 10 min
      gcTime: 1000 * 60 * 5, // 5 min
      // _defaulted: false,
      // _optimisticResults:null,
      // behavior,
      // select: () => {}
    });
  }, [ids, queryFn]);

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

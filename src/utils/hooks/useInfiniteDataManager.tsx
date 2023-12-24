import { BACKEND_BASE_URL } from "@env";
import {
  QueryFunctionContext,
  infiniteQueryOptions,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { useCallback, useMemo } from "react";
import { DUMMY_TALE_THUMBNAILS } from "../../data/tales";
import { DUMMY_DATABASE } from "../../data/database";

type DataKey = "feeds" | "itineraries" | "tales" | "tales-md" | "users";
type DataMode = "dev" | "test" | "prod";

/**
 * useInfiniteDataManager manages the lifecycle of data (fetching, caching, invalidating)
 * that is used in screens with infinite scrolling.
 * @param dataMode
 * @param dataKey
 * @returns
 */
const useInfiniteDataManager = (dataKey: DataKey, dataMode?: DataMode) => {
  const queryClient = useQueryClient();
  const queryFn = useCallback(
    async ({ queryKey, signal, meta }: QueryFunctionContext) => {
      const [key] = queryKey;

      switch (dataMode) {
        case "prod":
          try {
            const url = `${BACKEND_BASE_URL}/api/${key}`;
            const response = await axios.get(url);
            return response.data;
          } catch (err) {
            console.error(err);
            // Throw error?
            // throw new Error(err);
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
    },
    [BACKEND_BASE_URL, DUMMY_DATABASE, setTimeout],
  );

  const options = useMemo(
    () =>
      infiniteQueryOptions({
        queryKey: [dataKey],
        queryFn,
        // gcTime,
        // enabled,
        networkMode: dataMode === "prod" ? "online" : "always",
        getNextPageParam: (
          lastPage,
          allPages,
          lastPageParam,
          allPageParams,
        ) => {
          //   console.log("=======getNextPageParam=========");
          //   console.log("lastPage len: ", lastPage.length);
          //   console.log("allPages len: ", allPages.length);
          //   console.log("lastPageParam: ", lastPageParam);
          //   console.log("allPageParams: ", allPageParams);
          //   console.log("===========================\n");
          return lastPageParam + 1;
        },
        // getPreviousPageParam: (
        //   firstPage,
        //   allPages,
        //   firstPageParam,
        //   allPageParams,
        // ) => {
        //   return firstPageParam;
        // },
        initialPageParam: 1,
        // initialData,
        // initialDataUpdatedAt,
        // meta,
        // notifyOnChangeProps,
        // placeholderData,
        // queryKeyHashFn,
        // refetchInterval,
        // refetchIntervalInBackground,
        // refetchOnMount,
        // refetchOnReconnect,
        // refetchOnWindowFocus,
        // retry,
        // retryOnMount,
        // retryDelay,
        // select,
        staleTime: 15000,
        // structuralSharing,
        // throwOnError,
      }),
    [infiniteQueryOptions],
  );

  const {
    data,
    dataUpdatedAt,
    error,
    errorUpdatedAt,
    errorUpdateCount,
    failureCount,
    failureReason,
    fetchStatus,
    isError,
    isFetched,
    isFetchedAfterMount,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    isInitialLoading,
    isLoading,
    isLoadingError,
    isPaused,
    isPending,
    isPlaceholderData,
    isRefetchError,
    isRefetching,
    isStale,
    isSuccess,
    hasNextPage,
    hasPreviousPage,
    status,
    fetchNextPage,
    fetchPreviousPage,
    refetch,
  } = useInfiniteQuery(options);

  return {
    data,
    error,
    hasNextPage,
    isFetching,
    isError,
    isLoading,
    isRefetching,
    queryClient,
    fetchNextPage,
    refetch,
  };
};

export default useInfiniteDataManager;

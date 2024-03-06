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
import type { DataKey, DataMode } from "../../data/types/types";

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
            console.log("Querying infinite data for: ", key);
            console.log("REsponse!!!", JSON.stringify(response.data));
            return response.data;
          } catch (err) {
            console.error(err);
          }
          break;

        case "dev":
          return new Promise((resolve, reject) => {
            const data =
              DUMMY_DATABASE[key as DataKey].length > 0
                ? DUMMY_DATABASE[key as DataKey]
                : [];
            setTimeout(() => {
              resolve(data);
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

  /**
   * onEndReached is called when end of list (determined by onEndReachedThreshold prop in Flatlist or similar components) is reached.
   * This will fetch the next set of data and append to the end of the current set.
   */
  const onEndReached = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  /**
   * Refreshing will invalidate/reset cache and fetch new set of data.
   * If the number of pages is > 2, reset cache.
   */
  const onRefresh = useCallback(() => {
    if (data && data?.pageParams.length > 2) {
      queryClient.resetQueries({ queryKey: [dataKey] });
    } else {
      queryClient.invalidateQueries({ queryKey: [dataKey] });
    }
  }, [data, dataKey, queryClient]);

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
    onEndReached,
    onRefresh,
  };
};

export default useInfiniteDataManager;

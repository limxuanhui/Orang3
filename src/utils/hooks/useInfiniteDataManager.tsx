import { useCallback, useMemo } from 'react';
import {
  infiniteQueryOptions,
  useInfiniteQuery,
  useQueryClient,
} from '@tanstack/react-query';
import axios from 'axios';
import { BACKEND_BASE_URL } from '@env';
import { DUMMY_DATABASE } from '@data/database';
import type { DataKey, DataMode } from '@data/types/types';

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
    // @ts-ignore
    async ({ queryKey, pageParam }) => {
      console.log('Query function running...');
      const [key] = queryKey;
      switch (dataMode) {
        case 'prod':
          try {
            let url = `${BACKEND_BASE_URL}/${key}`;
            if (pageParam) {
              url = `${url}?base64Key=${pageParam}`;
            }
            console.log('Querying infinite data for: ', key, ' @ ', url);
            const response = await axios.get(url);
            // printPrettyJson(response);

            return response.data;
          } catch (err) {
            console.error(err);
          }
          break;

        case 'dev':
          return new Promise((resolve, _reject) => {
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
    [dataMode],
  );

  const options = useMemo(
    () =>
      infiniteQueryOptions({
        queryKey: [dataKey],
        queryFn,
        // gcTime,
        // enabled,
        networkMode: dataMode === 'prod' ? 'online' : 'always',
        getNextPageParam: lastPage => {
          console.log('in getNextPageParam: ', lastPage.lastEvaluatedKey);
          //   console.log("=======getNextPageParam=========");
          //   console.log("lastPage len: ", lastPage.length);
          //   console.log("allPages len: ", allPages.length);
          //   console.log("lastPageParam: ", lastPageParam);
          //   console.log("allPageParams: ", allPageParams);
          //   console.log("===========================\n");
          return lastPage.lastEvaluatedKey || undefined;
        },
        // getPreviousPageParam: (
        //   firstPage,
        //   allPages,
        //   firstPageParam,
        //   allPageParams,
        // ) => {
        //   return firstPageParam;
        // },
        initialPageParam: null,
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
    [dataKey, dataMode, queryFn],
  );

  const {
    data,
    error,
    isError,
    isFetching,
    isLoading,
    isRefetching,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery(options);

  /**
   * onEndReached is called when end of list (determined by onEndReachedThreshold prop in Flatlist or similar components) is reached.
   * This will fetch the next set of data and append to the end of the current set.
   */
  const onEndReached = useCallback(() => {
    console.log('End reached! fetching next page...');
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

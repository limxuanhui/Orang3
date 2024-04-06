import { useCallback, useMemo } from 'react';
import {
  infiniteQueryOptions,
  useInfiniteQuery,
  useQueryClient,
} from '@tanstack/react-query';
import type { DataKey } from '@data/types/types';
import { axiosClient } from '@helpers/singletons';
import useGlobals from '@hooks/useGlobals';
import { AxiosResponse } from 'axios';
import { urlFactory } from '@helpers/factory';

/**
 * useInfiniteDataManager manages the lifecycle of data (fetching, caching, invalidating)
 * that is used in screens with infinite scrolling.
 * @param dataKey
 * @returns
 */
const useInfiniteDataManager = (dataKey: DataKey) => {
  const { mode } = useGlobals();
  const queryClient = useQueryClient();
  const queryFn = useCallback(
    // @ts-ignore
    async ({ queryKey, pageParam }) => {
      const [key] = queryKey;
      switch (mode) {
        case 'production':
          try {
            let url;
            if (pageParam) {
              url = urlFactory(key, { base64Key: pageParam });
            } else {
              url = urlFactory(key);
            }
            const response: AxiosResponse = await axiosClient.get(url);
            return response.data;
          } catch (err) {
            console.error(err);
          }
          break;
        case 'testing':
          break;
        case 'development':
          break;
        default:
          // Do I need to return a promise here?
          console.info(`${mode} mode is not handled.`);
      }
    },
    [mode],
  );

  const options = useMemo(
    () =>
      infiniteQueryOptions({
        queryKey: [dataKey],
        queryFn,
        networkMode: mode === 'production' ? 'online' : 'always',
        getNextPageParam: lastPage => {
          return lastPage.lastEvaluatedKey || undefined;
        },
        initialPageParam: null,
      }),
    [dataKey, mode, queryFn],
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
  const onRefresh = useCallback(async () => {
    if (data && data?.pageParams.length > 2) {
      await queryClient.resetQueries({ queryKey: [dataKey] });
    } else {
      await queryClient.invalidateQueries({ queryKey: [dataKey] });
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

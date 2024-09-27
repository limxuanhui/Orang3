import { useCallback, useMemo } from 'react';
import { AxiosResponse } from 'axios';
import {
  InfiniteData,
  QueryFunctionContext,
  QueryKey,
  UndefinedInitialDataInfiniteOptions,
  infiniteQueryOptions,
  useInfiniteQuery,
  useQueryClient,
} from '@tanstack/react-query';
import useAxiosManager from '@hooks/useAxiosManager';
import type { DataKey } from '@data/types/types';
import { keyFactory, urlFactory } from '@helpers/factory';

export type TInfiniteData<T> = {
  items: T;
  lastEvaluatedKey: string | null;
};

/**
 * useInfiniteDataManager manages the lifecycle of data (fetching, caching, invalidating)
 * that is used in screens with infinite scrolling.
 * @param dataKey
 * @param dataId
 * @param dataOptions
 * @returns
 */
const useInfiniteDataManager = <T,>(
  dataKey: DataKey,
  dataId?: string,
  dataOptions?: Omit<
    UndefinedInitialDataInfiniteOptions<
      TInfiniteData<T>,
      Error,
      InfiniteData<TInfiniteData<T>>,
      QueryKey,
      unknown
    >,
    'queryKey' | 'queryFn' | 'getNextPageParam' | 'initialPageParam'
  >,
) => {
  const { axiosPrivate } = useAxiosManager();
  const queryClient = useQueryClient();
  const queryFn = useCallback(
    // @ts-ignore
    async ({
      queryKey,
      pageParam,
    }: QueryFunctionContext<QueryKey, unknown>): Promise<TInfiniteData<T>> => {
      const [dKey, dId] = queryKey;
      const key = dKey as DataKey;
      const id = dId as string;
      const base64Key = pageParam as string;
      try {
        let url;
        if (pageParam) {
          url = urlFactory(key, { id, base64Key });
        } else {
          url = urlFactory(key, { id });
        }
        const response: AxiosResponse = await axiosPrivate.get(url);

        return response.data;
      } catch (err: unknown) {
        console.error(err);
        throw new Error('Unable to get content for you at the moment...');
        // return { items: [] as T, lastEvaluatedKey: null };
      }
    },
    [axiosPrivate],
  );

  const options = useMemo(
    () =>
      infiniteQueryOptions({
        queryKey: keyFactory(dataKey, dataId),
        queryFn,
        networkMode: 'online', // 'always'
        getNextPageParam: lastPage => {
          return lastPage.lastEvaluatedKey || undefined;
        },
        initialPageParam: null,
        staleTime: Infinity,
        gcTime: 0,
        ...dataOptions,
      }),
    [dataId, dataKey, dataOptions, queryFn],
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
  } = useInfiniteQuery<TInfiniteData<T>>(options);

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
    // if (data && data?.pageParams.length > 2) {
    //   await queryClient.resetQueries({ queryKey: [dataKey] });
    // } else {
    //   await queryClient.invalidateQueries({ queryKey: [dataKey] });
    // }
    await queryClient.invalidateQueries({
      queryKey: keyFactory(dataKey, dataId),
    });
  }, [dataId, dataKey, queryClient]);

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

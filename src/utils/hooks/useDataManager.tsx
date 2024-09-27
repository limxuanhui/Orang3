import { useCallback, useMemo } from 'react';
import { AxiosResponse } from 'axios';
import {
  QueryFunction,
  QueryKey,
  UndefinedInitialDataOptions,
  queryOptions,
  useQuery,
} from '@tanstack/react-query';
import useAxiosManager from '@hooks/useAxiosManager';
import type { DataKey } from '@data/types/types';
import { keyFactory, urlFactory } from '@helpers/factory';

/**
 * This hook manages all the data of the app components, except components with infinite scrolling.
 * @param dataKey
 * @param dataId
 * @param dataOptions
 * @returns T
 */
const useDataManager = <T,>(
  dataKey: DataKey,
  dataId: string,
  dataOptions?: Omit<
    UndefinedInitialDataOptions<T | null>,
    'queryKey' | 'queryFn'
  >,
) => {
  const { axiosPrivate } = useAxiosManager();
  const qKey = useMemo(
    () => (dataId ? keyFactory(dataKey, dataId) : []),
    [dataId, dataKey],
  );

  const queryFn: QueryFunction<T | null, QueryKey, never> = useCallback(
    async ({ queryKey }: { queryKey: QueryKey }): Promise<T> => {
      console.log('Query function called: ', queryKey);
      const [dKey, dId] = queryKey;
      const key = dKey as DataKey;
      const id = dId as string;
      try {
        const url: string = urlFactory(key, { id });
        const response: AxiosResponse = await axiosPrivate.get(url);

        if (response.data.items) {
          return response.data.items as T;
        }

        return response.data;
      } catch (err) {
        console.error(err);
        throw new Error('Unable to get content for you at the moment...');
        // return null;
      }
    },
    [axiosPrivate],
  );

  const options = useMemo(() => {
    return queryOptions<T | null, Error, T | null, QueryKey>({
      queryKey: qKey,
      queryFn,
      enabled: qKey.length !== 0,
      staleTime: Infinity,
      gcTime: 0,
      ...dataOptions,
    });
  }, [dataOptions, qKey, queryFn]);

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
  } = useQuery<T | null>(options);

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

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
  dataId?: string,
  dataOptions?: Omit<
    UndefinedInitialDataOptions<T | null>,
    'queryKey' | 'queryFn'
  >,
) => {
  const { axiosPrivate } = useAxiosManager();

  const queryFn: QueryFunction<T | null, QueryKey, never> = useCallback(
    async ({ queryKey }: { queryKey: QueryKey }): Promise<T | null> => {
      const [dKey, dId] = queryKey;
      const key = dKey as DataKey;
      const id = dId as string;
      try {
        const url: string = urlFactory(key, { id });
        const response: AxiosResponse = await axiosPrivate.get(url);
        // printPrettyJson(response.data);
        if (response.data.items) {
          return response.data.items as T;
        }

        return response.data;
      } catch (err) {
        console.error(err);
        return null;
      }
    },
    [axiosPrivate],
  );

  const options = useMemo(() => {
    return queryOptions<T | null, Error, T | null, QueryKey>({
      queryKey: dataId ? keyFactory(dataKey, dataId) : [],
      queryFn,
      enabled: !!dataId,
      // initialData: null,
      staleTime: 0,
      ...dataOptions,
    });
  }, [dataId, dataKey, dataOptions, queryFn]);

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

import { useCallback, useMemo } from 'react';
import {
  QueryFunction,
  QueryKey,
  UndefinedInitialDataOptions,
  queryOptions,
  useQuery,
} from '@tanstack/react-query';
import type { DataKey } from '@data/types/types';
import { axiosClient } from '@helpers/singletons';
import useGlobals from './useGlobals';
import { AxiosResponse } from 'axios';
import { keyFactory, urlFactory } from '@helpers/factory';
import { printPrettyJson } from '@helpers/functions';

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
  const { mode } = useGlobals();

  const queryFn: QueryFunction<T | null, QueryKey, never> = useCallback(
    async ({ queryKey }: { queryKey: QueryKey }): Promise<T | null> => {
      // async ({ queryKey }: { queryKey: QueryKey }) => {
      const [dKey, dId] = queryKey;
      const key = dKey as DataKey;
      const id = dId as string;

      switch (mode) {
        case 'production':
          try {
            const url: string = urlFactory(key, { id });
            const response: AxiosResponse = await axiosClient.get(url);
            printPrettyJson(response.data);
            if (response.data.items) {
              return response.data.items as T;
            }

            return response.data;
          } catch (err) {
            console.error(err);
            return null;
          }

        case 'testing':
          return null;
        case 'development':
          return null;
        default:
          console.info(`${mode} mode is not handled.`);
          return null;
      }
    },
    [mode],
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

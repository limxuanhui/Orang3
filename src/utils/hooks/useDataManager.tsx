import { useCallback, useMemo } from 'react';
import { QueryKey, queryOptions, useQuery } from '@tanstack/react-query';
import type { DataKey } from '@data/types/types';
import { axiosClient } from '@helpers/singletons';
import useGlobals from './useGlobals';
import { printPrettyJson } from '@helpers/functions';
import { AxiosResponse } from 'axios';
import { keyFactory, urlFactory } from '@helpers/factory';

/**
 * This hook manages all the data of the app components, except components with infinite scrolling.
 * @param key
 * @param id
 * @returns
 */
const useDataManager = <T,>(dataKey: DataKey, dataId?: string) => {
  const { mode } = useGlobals();
  // use some form of a key factory

  const queryFn = useCallback(
    async ({ queryKey }: { queryKey: QueryKey }): Promise<T | null> => {
      console.log('QUERY FUNCTION CALLED IN USEDATAMANAGER');
      const [dKey, dId] = queryKey;
      const key = dKey as DataKey;
      const id = dId as string;

      switch (mode) {
        case 'production':
          try {
            const url = urlFactory(key, { id });
            console.log(`Production axios client getting data for ${url}`);
            const response: AxiosResponse = await axiosClient.get(url);
            if (response.data.items) {
              return response.data.items;
            }
            printPrettyJson(response.data);
            console.log('==================== THE END ====================');
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
          // Do I need to return a promise here?
          console.info(`${mode} mode is not handled.`);
          return null;
      }
    },
    [mode],
  );

  const options = useMemo(() => {
    return queryOptions({
      queryKey: keyFactory(dataKey, dataId),
      queryFn,
      enabled: !!dataId,
      // initialData: null,
      // staleTime: 1000 * 60 * 10, // 10 min
      // gcTime: 1000 * 60 * 5, // 5 min
      // _defaulted: false,
      // _optimisticResults:null,
      // behavior,
      // select: () => {}
    });
  }, [dataId, dataKey, queryFn]);

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

import { BACKEND_BASE_URL } from '@env';
import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import axios, { AxiosInstance } from 'axios';

export const axiosClient: AxiosInstance = axios.create({
  baseURL: BACKEND_BASE_URL,
});

export const queryClient: QueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 600000, // 10 minutes
      gcTime: 900000, // 15 minutes
      refetchOnMount: false,
    },
  },
  queryCache: new QueryCache({
    onError: err => {
      console.error(err);
    },
  }),
  mutationCache: new MutationCache({
    onError: err => {
      console.error(err);
    },
  }),
});

import axios, { AxiosInstance } from 'axios';
import Config from 'react-native-config';
import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';

export const axiosPublic: AxiosInstance = axios.create({
  baseURL: Config.BACKEND_BASE_URL,
  timeout: 10000,
});

export const axiosPrivate: AxiosInstance = axios.create({
  baseURL: Config.BACKEND_BASE_URL,
  timeout: 15000,
});

export const queryClient: QueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 600000, // 10 minutes
      gcTime: 900000, // 15 minutes
      refetchOnMount: false,
      networkMode: 'online',
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

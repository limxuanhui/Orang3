import { useCallback, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { QueryKey, queryOptions, useQuery } from '@tanstack/react-query';
import FeedDisplay from '@components/feed/FeedDisplay';
import { Feed } from '@components/feed/types/types';
import type { FeedScreenProps } from './types/types';
import type { DataKey } from '@data/types/types';
import { DUMMY_DATABASE } from '@data/database';
import { PALETTE } from '@constants/palette';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '@constants/constants';
import useGlobals from '@hooks/useGlobals';
import { axiosClient } from '@helpers/singletons';
import { printPrettyJson } from '@helpers/functions';

const FeedScreen = ({ route }: FeedScreenProps) => {
  const { mode } = useGlobals();
  const { feedId } = route.params;

  const queryFn = useCallback(
    async ({ queryKey }: { queryKey: QueryKey }): Promise<Feed | undefined> => {
      console.log('QUERY FUNCTION CALLED');
      const [key, feedId] = queryKey;
      switch (mode) {
        case 'development':
          return new Promise((resolve, _reject) => {
            const feeds: Feed[] = DUMMY_DATABASE[key as DataKey] as Feed[];
            setTimeout(() => {
              resolve(feeds.find((el: Feed) => el.metadata.id === feedId));
            }, 2000);
          });

        case 'production':
          try {
            const response = await axiosClient.get(`/feeds/${feedId}`);
            printPrettyJson(response);
            return response.data;
          } catch (err) {
            console.error(err);
          }
          break;
      }
    },
    [mode],
  );

  const options = useMemo(() => {
    const queryKey = ['feeds', feedId];
    return queryOptions({
      queryKey,
      queryFn,
      networkMode: 'online',
      enabled: true,
      gcTime: 1000 * 60 * 5,
      // staleTime: 1000,
    });
  }, [feedId, queryFn]);

  const { data, isLoading } = useQuery(options);

  return !data && isLoading ? (
    <View style={styles.container}>
      <ActivityIndicator size={48} color={PALETTE.ORANGE} />
    </View>
  ) : (
    <FeedDisplay data={data as Feed} inView />
  );
};

const styles = StyleSheet.create({
  container: {
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PALETTE.GREYISHBLUE,
  },
});

export default FeedScreen;

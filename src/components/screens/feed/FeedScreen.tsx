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

const FeedScreen = ({ route }: FeedScreenProps) => {
  const { feedId } = route.params;

  const queryFn = useCallback(
    async ({ queryKey }: { queryKey: QueryKey }): Promise<Feed | undefined> => {
      const [key, feedId] = queryKey;
      console.log('QUERY FUNCTION CALLED');
      return new Promise((resolve, _reject) => {
        const feeds: Feed[] = DUMMY_DATABASE[key as DataKey] as Feed[];
        setTimeout(() => {
          resolve(feeds.find((el: Feed) => el.metadata.id === feedId));
        }, 2000);
      });
    },
    [],
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

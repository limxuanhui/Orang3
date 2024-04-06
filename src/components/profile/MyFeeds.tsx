import { memo, useCallback, useContext, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { BottomTabBarHeightContext } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ActivityIndicator } from 'react-native-paper';
import MasonryList from '@react-native-seoul/masonry-list';
import FeedThumbnail from '@components/feed/FeedThumbnail';
import type { FeedThumbnailInfo } from '@components/feed/types/types';
import type { MyFeedsProps } from './types/types';
import { DEVICE_HEIGHT } from '@constants/constants';
import { PALETTE } from '@constants/palette';
import { useQueryClient } from '@tanstack/react-query';
import MessageDisplay from '@components/common/MessageDisplay';

const MyFeeds = memo(({ data }: MyFeedsProps) => {
  const insets = useSafeAreaInsets();
  const bh = useContext(BottomTabBarHeightContext) || insets.bottom;
  const height = useMemo(() => (1 - 0.25 - 0.05) * DEVICE_HEIGHT - bh, [bh]);
  const queryClient = useQueryClient();

  const onRefresh = useCallback(async () => {
    console.warn('Refreshing!');
    if (data.length > 0) {
      // const creatorId: string = data[0].creator.id;
      console.warn('reached inside refresh');
      // Do we want to invalidate all feeds metadata for all user profiles, or just the current loaded one?
      await queryClient.invalidateQueries({ queryKey: ['feeds'] });
    }
  }, [data, queryClient]);

  return (
    <View style={[styles.container, { height }]}>
      {!data ? (
        <View style={styles.flexCenter}>
          <ActivityIndicator size={48} color={PALETTE.ORANGE} />
        </View>
      ) : data.length === 0 ? (
        <MessageDisplay message="No feeds to show..." />
      ) : (
        <MasonryList
          contentContainerStyle={styles.masonryListContentContainer}
          data={data}
          renderItem={el => (
            <FeedThumbnail data={el.item as FeedThumbnailInfo} />
          )}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          onRefresh={onRefresh}
        />
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {},
  flexCenter: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  message: {
    color: PALETTE.GREY,
    fontFamily: 'Futura',
    fontSize: 24,
    fontWeight: 'bold',
  },
  masonryListContentContainer: { paddingHorizontal: 2 },
});

export default MyFeeds;

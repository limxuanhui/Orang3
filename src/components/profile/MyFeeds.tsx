import { memo, useContext, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BottomTabBarHeightContext } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ActivityIndicator } from 'react-native-paper';
import MasonryList from '@react-native-seoul/masonry-list';
import FeedThumbnail from '@components/feed/FeedThumbnail';
import type { FeedThumbnailInfo } from '@components/feed/types/types';
import type { MyFeedsProps } from './types/types';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '@constants/constants';
import { PALETTE } from '@constants/palette';

const MyFeeds = memo(({ data }: MyFeedsProps) => {
  const insets = useSafeAreaInsets();
  const bh = useContext(BottomTabBarHeightContext) || insets.bottom;
  const height = useMemo(() => (1 - 0.25 - 0.05) * DEVICE_HEIGHT - bh, [bh]);

  return (
    <View style={[styles.container, { height }]}>
      {!data ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size={48} color={PALETTE.ORANGE} />
        </View>
      ) : data.length === 0 ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text
            style={{
              color: PALETTE.GREY,
              fontFamily: 'Futura',
              fontSize: 24,
              fontWeight: 'bold',
            }}>
            You have no feeds...
          </Text>
        </View>
      ) : (
        <MasonryList
          contentContainerStyle={{ paddingHorizontal: 2 }}
          data={data}
          renderItem={el => (
            <FeedThumbnail data={el.item as FeedThumbnailInfo} />
          )}
          numColumns={3}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    // backgroundColor: PALETTE.GREYISHBLUE,
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
  },
});

export default MyFeeds;

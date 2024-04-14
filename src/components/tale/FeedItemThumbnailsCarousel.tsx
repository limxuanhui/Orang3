import { useCallback } from 'react';
import { FlatList, Image, Pressable, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  FEED_ITEM_THUMBNAILS_DISPLAY_STYLES,
  type FeedItemThumbnailsCarouselProps,
} from './types/types';
import type { ModalNavigatorNavigationProp } from '@components/navigators/types/types';
import { DIMENSION } from '@constants/dimensions';
import { PALETTE } from '@constants/palette';
import { AWS_CLOUDFRONT_URL_THUMBNAIL } from '@env';
import { ActivityIndicator } from 'react-native-paper';
import { Feed } from '@components/feed/types/types';
import useDataManager from '@hooks/useDataManager';

const FeedItemThumbnailsCarousel = ({
  feedId,
  displayFormat,
  closeBottomSheet,
}: FeedItemThumbnailsCarouselProps) => {
  const navigation = useNavigation<ModalNavigatorNavigationProp>();
  const { data, isLoading } = useDataManager<Feed>('feed-by-feedid', feedId);

  const onPressLinkedFeed = useCallback(() => {
    closeBottomSheet();
    navigation.navigate('Modal', {
      screen: 'Feed',
      params: { feedId },
    });
  }, [closeBottomSheet, feedId, navigation]);

  if (isLoading) {
    return (
      <View style={styles.flexCenter}>
        <ActivityIndicator size={24} color={PALETTE.ORANGE} />
      </View>
    );
  }

  return (
    <FlatList
      style={[styles.linkedFeeds]}
      contentContainerStyle={styles.linkedFeedsContentContainer}
      data={data?.feedItems}
      renderItem={el => (
        <Pressable
          style={({ pressed }) => [
            styles.linkedFeed,
            {
              marginLeft: el.index === 0 ? 0 : 8,
              transform: [{ scale: pressed ? 0.99 : 1 }],
            },
            FEED_ITEM_THUMBNAILS_DISPLAY_STYLES[displayFormat],
          ]}
          onPress={onPressLinkedFeed}>
          <Image
            style={styles.imageStyle}
            source={{
              uri: `${AWS_CLOUDFRONT_URL_THUMBNAIL}/${el.item.thumbnail.uri}`,
            }}
          />
        </Pressable>
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  flexCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkedFeeds: {
    zIndex: 1,
  },
  linkedFeedsContentContainer: {
    alignSelf: 'center',
    height: 120,
  },
  linkedFeed: {
    height: DIMENSION.HUNDRED_PERCENT,
    width: 100,
    borderRadius: 8,
    backgroundColor: PALETTE.WHITE,
    shadowColor: PALETTE.BLACK,
    shadowOpacity: 0.2,
    shadowOffset: { height: 4, width: 0 },
    shadowRadius: 2,
  },
  imageStyle: { height: DIMENSION.HUNDRED_PERCENT, borderRadius: 8 },
});

export default FeedItemThumbnailsCarousel;

// const queryFn = useCallback(
//   async ({ queryKey }: { queryKey: QueryKey }): Promise<Feed | null> => {
//     const [key, fid] = queryKey;
//     try {
//       const response = await axiosClient.get(`/${key}/${fid}`);
//       return response.data;
//     } catch (err) {
//       console.error(err);
//       return null;
//     }
//   },
//   [],
// );

// const { data, isLoading } = useQuery({
//   queryKey: ['feeds', feedId],
//   queryFn,
//   enabled: !!feedId,
//   staleTime: Infinity,
// });

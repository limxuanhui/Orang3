import { useCallback } from 'react';
import { FlatList, Image, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { FeedItemThumbnailsCarouselProps } from './types/types';
import type { ModalNavigatorNavigationProp } from '@components/navigators/types/types';
import { DIMENSION } from '@constants/dimensions';
import { PALETTE } from '@constants/palette';
import { AWS_CLOUDFRONT_URL_THUMBNAIL } from '@env';

const FeedItemThumbnailsCarousel = ({
  data,
  style,
}: FeedItemThumbnailsCarouselProps) => {
  const navigation = useNavigation<ModalNavigatorNavigationProp>();

  const onPressLinkedFeed = useCallback(() => {
    navigation.navigate('Modal', {
      screen: 'Feed',
      params: { feedId: data.metadata.id },
    });
  }, [data.metadata.id, navigation]);

  return (
    <FlatList
      style={[styles.linkedFeeds, style]}
      contentContainerStyle={styles.linkedFeedsContentContainer}
      data={data.feedItems}
      renderItem={el => (
        <Pressable
          style={({ pressed }) => [
            styles.linkedFeed,
            {
              marginLeft: el.index === 0 ? 0 : 8,
              transform: [{ scale: pressed ? 0.99 : 1 }],
            },
            style,
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

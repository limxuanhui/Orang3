import { useCallback, useEffect, useRef } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  ViewToken,
} from 'react-native';
import EmptyFeed from '@components/feed/EmptyFeed';
import FeedDescription from '@components/feed/FeedDescription';
import VlogPlayer from '@components/vlog/VlogPlayer';
import PageIndicator from '@components/common/PageIndicator';
import type { FeedItem } from '@components/feed/types/types';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '@constants/constants';
import { DIMENSION } from '@constants/dimensions';
import { PALETTE } from '@constants/palette';
import { VIEWABILITY_CONFIG } from '@constants/feed';

type GypsieFeedCarouselProps = {
  items: FeedItem[];
  currIndex: number;
  handle?: string;
  inView?: boolean;
  onViewableItemsChanged: (info: {
    viewableItems: ViewToken[];
    changed: ViewToken[];
  }) => void;
};

const GypsieFeedCarousel = ({
  items,
  currIndex,
  handle = '',
  inView = true,
  onViewableItemsChanged,
}: GypsieFeedCarouselProps) => {
  const ref = useRef<FlatList>(null);

  useEffect(() => {
    if (items.length > 0) {
      ref.current?.scrollToIndex({
        index: currIndex,
        animated: false,
      });
    }
  }, [currIndex, items.length]);

  const getItemLayout = useCallback(
    (data: any[] | null | undefined, index: number) => ({
      length: DEVICE_WIDTH,
      offset: DEVICE_WIDTH * index,
      index,
    }),
    [],
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={ref}
        getItemLayout={getItemLayout}
        contentContainerStyle={styles.contentContainer}
        data={items}
        // initialScrollIndex={currIndex}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={32}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={VIEWABILITY_CONFIG}
        pagingEnabled
        scrollEnabled={items.length > 1}
        keyExtractor={el => el.id}
        renderItem={({ item, index }: { item: FeedItem; index: number }) => {
          if (item.media) {
            if (item.media.type.startsWith('video')) {
              return (
                <VlogPlayer
                  key={item.id}
                  vlog={item}
                  shouldPlay={inView && index === currIndex}
                />
              );
            } else if (item.media.type.startsWith('image')) {
              return (
                <View key={item.id} style={styles.imageContainer}>
                  <Image
                    style={[
                      styles.image,
                      // { aspectRatio: 1 },
                      { aspectRatio: item.media.width / item.media.height },
                    ]}
                    source={{
                      uri: item.media.uri,
                      // uri: '/Users/limxuanhui/bluextech/gypsie/assets/images/1024.png',
                    }}
                    resizeMode="contain"
                  />
                </View>
              );
            } else {
              return (
                <View key={item.id} style={styles.errorTextWrapper}>
                  <Text style={styles.errorText}>
                    Media format not supported at the moment
                  </Text>
                </View>
              );
            }
          } else {
            return <EmptyFeed key={item.id} />;
          }
        }}
      />
      {items.length > 1 ? (
        <PageIndicator index={currIndex + 1} maxIndex={items.length} />
      ) : null}
      {items[currIndex]?.caption ? (
        <FeedDescription handle={handle} caption={items[currIndex]?.caption} />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
  },
  contentContainer: {
    height: DIMENSION.HUNDRED_PERCENT,
    paddingBottom: 100,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
    // flex: 1,
    // borderWidth: 4,
    // borderColor: 'red',
  },
  image: {
    // height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
    backgroundColor: PALETTE.BLACK,
  },
  errorTextWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
    padding: 16,
  },
  errorText: {
    width: DIMENSION.HUNDRED_PERCENT,
    fontFamily: 'Futura',
    fontSize: 24,
    fontWeight: 'bold',
    color: PALETTE.OFFWHITE,
  },
});

export default GypsieFeedCarousel;

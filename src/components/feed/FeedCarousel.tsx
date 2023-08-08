import { useCallback, useMemo, useState } from "react";
import { Animated, Image, StyleSheet, Text, View } from "react-native";
import FeedDescription from "./FeedDescription";
import PageIndicator from "../common/PageIndicator";
import VlogPlayer from "../vlog/VlogPlayer";
import type { FeedCarouselProps } from "./types/types";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../utils/constants/constants";
import { DIMENSION } from "../../utils/constants/dimensions";
import { PALETTE } from "../../utils/constants/palette";
import EmptyFeed from "./EmptyFeed";

const FeedCarousel = ({
  handle,
  items,
  inView,
}: FeedCarouselProps) => {
  const [currIndex, setCurrIndex] = useState<number>(0); 

  const onViewableItemsChanged = useCallback(
    ({ viewableItems, itemsChanged }: any) => {
      if (viewableItems && viewableItems.length > 0) {
        setCurrIndex(viewableItems[0].index);
      }
    },
    [setCurrIndex],
  );

  const viewabilityConfig = useMemo(
    () => ({
      viewAreaCoveragePercentThreshold: 51,
      minimumViewTime: 200,
    }),
    [],
  );

  return (
    <View style={styles.container}>
      <Animated.FlatList
        contentContainerStyle={styles.contentContainer}
        data={items}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={32}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        pagingEnabled
        keyExtractor={el => el.id.toString()}
        renderItem={({ item, index }) => {
          if (item.media) {
            const media = item.media?.type.split("/");
            const mediaType = media[0]; // video, image
            const mediaFormat = media[1]; // mp4, jpg
            if (mediaType === "video") {
              return (
                <VlogPlayer
                  vlog={item}
                  shouldPlay={inView && index === currIndex}
                />
              );
            } else if (mediaType === "image") {
              return (
                <Image
                  style={styles.image}
                  source={{ uri: item.media.uri }}
                  resizeMode="contain"
                />
              );
            } else {
              return (
                <View style={styles.errorTextWrapper}>
                  <Text style={styles.errorText}>
                    Media format not supported at the moment
                  </Text>
                </View>
              );
            }
          } else {
            return <EmptyFeed />;
          }
        }}
      />
      {items.length > 0 ? (
        <PageIndicator index={currIndex + 1} maxIndex={items.length} />
      ) : null}
      {!!items[currIndex]?.caption ? (
        <FeedDescription handle={handle} caption={items[currIndex]?.caption} />
      ) : (
        <FeedDescription handle={handle} caption={""} />
      )}
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
  image: {
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
    backgroundColor: PALETTE.BLACK,
  },
  errorTextWrapper: {
    justifyContent: "center",
    alignItems: "center",
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
    padding: 16,
  },
  errorText: {
    width: DIMENSION.HUNDRED_PERCENT,
    fontFamily: "Futura",
    fontSize: 24,
    fontWeight: "bold",
    color: PALETTE.OFFWHITE,
  },
});

export default FeedCarousel;

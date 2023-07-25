import { useCallback, useMemo, useState } from "react";
import { Animated, Image, StyleSheet, Text, View } from "react-native";
import VlogDescription from "./FeedDescription";
import VlogPlayer from "../vlog/VlogPlayer";
import FeedReactionControls from "./FeedReactionControls";
import PageIndicator from "../common/PageIndicator";
import type { FeedProps } from "./types/types";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../utils/constants/constants";
import { PALETTE } from "../../utils/constants/palette";

const Feed = ({ feed, inView }: FeedProps) => {
  const {
    userId,
    avatarUri,
    handle,
    items,
    isLiked,
    isBookmarked,
    likes,
    comments,
    bookmarks,
    shares,
  } = feed;
  const [currIndex, setCurrIndex] = useState<number>(0);

  const onViewableItemsChanged = useCallback(
    ({ viewableItems, itemsChanged }: any) => {
      if (viewableItems && viewableItems.length > 0) {
        setCurrIndex(viewableItems[0].index);
      }
    },
    [],
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
        renderItem={el =>
          el.item.type === "video" ? (
            <VlogPlayer
              vlog={el.item}
              shouldPlay={inView && el.index === currIndex}
            />
          ) : (
            <Image
              style={styles.image}
              source={{ uri: el.item.uri }}
              resizeMode="contain"
            />
          )
        }
      />
      <PageIndicator index={currIndex + 1} maxIndex={feed.items.length} />
      <VlogDescription handle={handle} caption={items[currIndex].caption} />
      <FeedReactionControls
        userId={userId}
        avatarUri={avatarUri}
        isLiked={isLiked}
        isBookmarked={isBookmarked}
        likes={likes}
        comments={comments}
        bookmarks={bookmarks}
        shares={shares}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: { paddingBottom: 100 },
  container: {
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
  },
  image: {
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
    backgroundColor: PALETTE.BLACK,
  },
});

export default Feed;

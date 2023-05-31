import { useCallback, useRef, useState } from "react";
import { Animated, Image, StyleSheet, Text, View } from "react-native";

import VlogDescription from "../vlog/VlogDescription";
import VlogPlayer from "../vlog/VlogPlayer";
import VlogReactionControls from "../vlog/VlogReactionControls";
import PageIndicator from "../common/PageIndicator";

import type { FeedProps } from "../../utils/types/feed";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../utils/constants/constants";
import { PALETTE } from "../../utils/constants/palette";

const DATA = [
  {
    key: "3571572",
    title: "Multi-lateral intermediate moratorium",
    description:
      "I'll back up the multi-byte XSS matrix, that should feed the SCSI application!",
    image: "/Users/limxuanhui/bluextech/gypsie/assets/images/sample1.jpg",
  },
  {
    key: "3571747",
    title: "Automated radical data-warehouse",
    description:
      "Use the optical SAS system, then you can navigate the auxiliary alarm!",
    image: "/Users/limxuanhui/bluextech/gypsie/assets/images/sample2.jpg",
  },
  {
    key: "3571680",
    title: "Inverse attitude-oriented system engine",
    description:
      "The ADP array is down, compress the online sensor so we can input the HTTP panel!",
    image: "/Users/limxuanhui/bluextech/gypsie/assets/images/sample3.jpg",
  },
  {
    key: "3571603",
    title: "Monitored global data-warehouse",
    description: "We need to program the open-source IB interface!",
    image: "/Users/limxuanhui/bluextech/gypsie/assets/images/sample1.jpg",
  },
];

const Feed = ({ feed, inView }: FeedProps) => {
  const {
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

  const scrollX = new Animated.Value(0);
  const onViewableItemsChanged = useCallback(
    ({ viewableItems, itemsChanged }: any) => {
      if (viewableItems && viewableItems.length > 0) {
        console.log("Length: ", viewableItems[0].length);
        console.log("Active: ", viewableItems[0].index);
        console.log(viewableItems);
        setCurrIndex(viewableItems[0].index);
      }
    },
    [],
  );

  return (
    <View style={styles.container}>
      <Animated.FlatList
        contentContainerStyle={{ paddingBottom: 100 }}
        data={items}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={32}
        // onScroll={e => {
        //   console.log("EVENT: ", e);
        //   Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
        //     useNativeDriver: false,
        //   });
        // }}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 51,
          minimumViewTime: 200,
        }}
        pagingEnabled
        keyExtractor={item => item.id.toString()}
        renderItem={item =>
          item.item.type === "video" ? (
            <VlogPlayer
              vlog={item.item}
              shouldPlay={inView && item.index === currIndex}
            />
          ) : (
            <Image
              style={styles.image}
              source={{ uri: item.item.uri }}
              resizeMode="contain"
            />
          )
        }
        // onScroll={Animated.event(
        //   [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        //   { useNativeDriver: true })}
      />
      <PageIndicator index={currIndex + 1} maxIndex={feed.items.length} />
      <VlogDescription
        handle={handle}
        caption={items[currIndex].caption}
        // soundTrack={soundTrack}
      />
      <VlogReactionControls
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

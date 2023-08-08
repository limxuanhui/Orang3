import { StyleSheet, View } from "react-native";
import FeedCarousel from "./FeedCarousel";
import FeedReactionControls from "./FeedReactionControls";
import type { FeedDisplayProps } from "./types/types";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../utils/constants/constants";
import { PALETTE } from "../../utils/constants/palette";

const FeedDisplay = ({ data, inView }: FeedDisplayProps) => {
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
  } = data;

  return (
    <View style={styles.container}>
      <FeedCarousel handle={handle} items={items} inView={inView} />
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
  container: {
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
  },
  contentContainer: { paddingBottom: 100 },
  image: {
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
    backgroundColor: PALETTE.BLACK,
  },
});

export default FeedDisplay;

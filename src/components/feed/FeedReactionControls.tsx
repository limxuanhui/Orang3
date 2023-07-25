import { useCallback, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import type { FeedReactionControlsProps } from "./types/types";
import type { ModalNavigatorNavigationProp } from "../navigators/types/types";
import { DIMENSION } from "../../utils/constants/dimensions";
import { PALETTE } from "../../utils/constants/palette";

const FeedReactionControls = ({
  userId,
  avatarUri,
  isLiked,
  isBookmarked,
  likes,
  comments,
  bookmarks,
  shares,
}: FeedReactionControlsProps) => {
  const [reactionCounts, setReactionCounts] = useState({
    likes,
    comments,
    bookmarks,
    shares,
  });
  const navigation = useNavigation<ModalNavigatorNavigationProp>();
  const [liked, setLiked] = useState<boolean>(isLiked);
  const [bookmarked, setBookmarked] = useState<boolean>(isBookmarked);

  const parseCount = useCallback((count: number): string => {
    const parsedCount =
      count > 1000000
        ? Math.floor(count / 1000000) + "M"
        : count > 1000
        ? Math.floor(count / 1000) + "K"
        : count + "";
    return parsedCount;
  }, []);

  const onPressReactionControlStyle = useCallback(
    ({ pressed }: { pressed: boolean }) => {
      return [
        styles.reactionControl,
        {
          opacity: pressed ? 0.9 : 1.0,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
      ];
    },
    [],
  );

  const onPressAvatar = useCallback(() => {
    navigation.push("Modal", {
      screen: "Profile",
      params: { userId, avatarUri },
    });
  }, [navigation]);

  const onPressLike = useCallback(() => {
    const likesChange = liked ? -1 : 1;
    setReactionCounts(prevReactionCounts => ({
      ...prevReactionCounts,
      likes: reactionCounts.likes + likesChange,
    }));
    setLiked(prevLikedState => !prevLikedState);
  }, [liked, setLiked, setReactionCounts]);

  const onPressComment = useCallback(() => {
    navigation.getParent()?.navigate("comments", {
      count: parseCount(reactionCounts.comments),
    });
  }, [navigation]);

  const onPressBookmark = useCallback(() => {
    const bookmarksChange = bookmarked ? -1 : 1;
    setReactionCounts(prevReactionCounts => ({
      ...prevReactionCounts,
      bookmarks: reactionCounts.bookmarks + bookmarksChange,
    }));
    setBookmarked(prevLikedState => !prevLikedState);
  }, [bookmarked, setBookmarked]);

  const onPressLink = useCallback(() => {}, []);

  // useEffect(() => {
  //   // Send HTTP request to backend to update reactionCounts
  // }, [reactionCounts])

  return (
    <View style={styles.reactionControls}>
      <Pressable style={onPressReactionControlStyle} onPress={onPressAvatar}>
        <Image
          style={styles.avatar}
          source={{
            uri: avatarUri,
          }}
        />
      </Pressable>
      <Pressable style={onPressReactionControlStyle} onPress={onPressLike}>
        <FontAwesome
          name="heart"
          size={24}
          color={liked ? PALETTE.RED : PALETTE.WHITE}
        />
        <Text style={styles.reactionCount}>
          {parseCount(reactionCounts.likes)}
        </Text>
      </Pressable>
      {/* <Pressable style={onPressReactionControlStyle} onPress={onPressComment}>
        <FontAwesome name="commenting" size={24} color={PALETTE.WHITE} />
        <Text style={styles.reactionCount}>
          {parseCount(reactionCounts.comments)}
        </Text>
      </Pressable> */}
      <Pressable style={onPressReactionControlStyle} onPress={onPressBookmark}>
        <FontAwesome
          name="bookmark"
          size={24}
          color={bookmarked ? "orange" : "#ffffff"}
        />
        <Text style={styles.reactionCount}>
          {parseCount(reactionCounts.bookmarks)}
        </Text>
      </Pressable>
      {/* <Pressable style={onPressReactionControlStyle} onPress={onPressLink}>
        <FontAwesome name="share" size={24} color="#ffffff" />
        <Text style={styles.reactionCount}>
          {parseCount(reactionCounts.shares)}
        </Text>
      </Pressable> */}
    </View>
  );
};

const styles = StyleSheet.create({
  reactionControls: {
    justifyContent: "space-evenly",
    alignItems: "center",
    position: "absolute",
    right: 0,
    bottom: DIMENSION.THIRTY_PERCENT,
    marginRight: 8,
    height: DIMENSION.FORTY_PERCENT,
    width: DIMENSION.TEN_PERCENT,
    borderRadius: 8,
    zIndex: 100,
  },
  avatar: {
    height: 40,
    width: DIMENSION.HUNDRED_PERCENT,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: PALETTE.WHITE,
  },
  reactionControl: {
    justifyContent: "center",
    alignItems: "center",
    height: DIMENSION.FIFTEEN_PERCENT,
    width: DIMENSION.HUNDRED_PERCENT,
  },
  reactionCount: {
    marginTop: 2,
    color: PALETTE.WHITE,
    fontWeight: "500",
  },
});

export default FeedReactionControls;

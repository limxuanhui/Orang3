import { useCallback, useState } from "react";
import {
  Image,
  Pressable,
  PressableStateCallbackType,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AuxiliaryControls from "../common/AuxiliaryControls";
import BookmarkIcon from "../common/icons/BookmarkIcon";
import CommentIcon from "../common/icons/CommentIcon";
import GypsieButton from "../common/buttons/GypsieButton";
import HeartIcon from "../common/icons/HeartIcon";
import ShareIcon from "../common/icons/ShareIcon";
import type { FeedReactionControlsProps } from "./types/types";
import type { ModalNavigatorNavigationProp } from "../navigators/types/types";
import { DIMENSION } from "../../utils/constants/dimensions";
import { PALETTE } from "../../utils/constants/palette";
import LinkIcon from "../common/icons/LinkIcon";

const FeedReactionControls = ({
  creator,
  isLiked,
  isBookmarked,
  likes,
  comments,
  bookmarks,
  shares,
  taleId,
  onPressComments,
}: FeedReactionControlsProps) => {
  const navigation = useNavigation<ModalNavigatorNavigationProp>();
  const [reactionCounts, setReactionCounts] = useState<{
    likes: number;
    comments: number;
    bookmarks: number;
    shares: number;
  }>({
    likes: likes ?? 0,
    comments: comments ?? 0,
    bookmarks: bookmarks ?? 0,
    shares: shares ?? 0,
  });
  const [liked, setLiked] = useState<boolean>(isLiked || false);
  const [bookmarked, setBookmarked] = useState<boolean>(isBookmarked || false);

  const onPressAvatar = useCallback(() => {
    navigation.push("Modal", {
      screen: "Profile",
      params: { userId: creator.id, avatarUri: creator.avatarUri },
    });
  }, [navigation]);

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
    ({ pressed }: PressableStateCallbackType) => {
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

  const onPressLike = useCallback(() => {
    const likesChange = liked ? -1 : 1;
    setReactionCounts(prevReactionCounts => ({
      ...prevReactionCounts,
      likes: reactionCounts.likes + likesChange,
    }));
    setLiked(prevLikedState => !prevLikedState);
  }, [liked, reactionCounts, setLiked, setReactionCounts]);

  const onPressComment = useCallback(() => {
    // navigation.getParent()?.navigate("comments", {
    //   count: parseCount(reactionCounts.comments),
    // });
    if (onPressComments) {
      onPressComments();
    }
  }, [navigation]);

  const onPressBookmark = useCallback(() => {
    const bookmarksChange = bookmarked ? -1 : 1;
    setReactionCounts(prevReactionCounts => ({
      ...prevReactionCounts,
      bookmarks: reactionCounts.bookmarks + bookmarksChange,
    }));
    setBookmarked(prevLikedState => !prevLikedState);
  }, [bookmarked, reactionCounts, setBookmarked]);

  const onPressLink = useCallback(() => {
    if (taleId) {
      navigation.navigate("Modal", {
        screen: "TaleView",
        params: {
          id: taleId,
          creator,
        },
      });
    }
  }, [navigation]);

  // useEffect(() => {
  //   // Send HTTP request to backend to update reactionCounts
  // }, [reactionCounts])

  return (
    <AuxiliaryControls>
      <Pressable style={onPressReactionControlStyle} onPress={onPressAvatar}>
        <Image
          style={styles.avatar}
          source={{
            uri: creator.avatarUri,
          }}
        />
      </Pressable>
      <GypsieButton
        customButtonStyles={onPressReactionControlStyle}
        customIconStyles={[
          styles.reactionIcon,
          {
            color: liked ? PALETTE.RED : PALETTE.WHITE,
          },
        ]}
        customTextStyles={styles.reactionCount}
        Icon={HeartIcon}
        text={parseCount(reactionCounts.likes)}
        onPress={onPressLike}
      />
      <GypsieButton
        customButtonStyles={onPressReactionControlStyle}
        customIconStyles={[
          styles.reactionIcon,
          {
            color: bookmarked ? PALETTE.ORANGE : PALETTE.WHITE,
          },
        ]}
        customTextStyles={styles.reactionCount}
        Icon={BookmarkIcon}
        text={parseCount(reactionCounts.bookmarks)}
        onPress={onPressBookmark}
      />
      {taleId ? (
        <GypsieButton
          customButtonStyles={onPressReactionControlStyle}
          customIconStyles={[
            styles.reactionIcon,
            {
              color: PALETTE.OFFWHITE,
            },
          ]}
          customTextStyles={styles.reactionCount}
          Icon={LinkIcon}
          // text={"Tale"}
          onPress={onPressLink}
        />
      ) : null}
      {/* <GypsieButton
        customButtonStyles={onPressReactionControlStyle}
        customIconStyles={[
          styles.reactionIcon,
          {
            color: PALETTE.WHITE,
          },
        ]}
        customTextStyles={styles.reactionCount}
        Icon={CommentIcon}
        text={parseCount(reactionCounts.comments)}
        onPress={onPressComment}
      /> */}
      {/* <GypsieButton
        customButtonStyles={onPressReactionControlStyle}
        customIconStyles={[
          styles.reactionIcon,
          {
            color: PALETTE.WHITE,
          },
        ]}
        customTextStyles={styles.reactionCount}
        Icon={ShareIcon}
        text={parseCount(reactionCounts.shares)}
        onPress={onPressLink}
      /> */}
    </AuxiliaryControls>
  );
};

const styles = StyleSheet.create({
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
    height: 40,
    width: 40,
  },
  reactionIcon: {
    fontSize: 24,
  },
  reactionCount: {
    marginTop: 2,
    color: PALETTE.WHITE,
    fontWeight: "500",
    textAlign: "center",
  },
});

export default FeedReactionControls;

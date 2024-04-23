import { useCallback } from 'react';
import {
  Image,
  Pressable,
  PressableStateCallbackType,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuxiliaryControls from '../common/AuxiliaryControls';
import GypsieButton from '../common/buttons/GypsieButton';
import type { FeedReactionControlsProps } from './types/types';
import type { ModalNavigatorNavigationProp } from '../navigators/types/types';
import { DIMENSION } from '../../utils/constants/dimensions';
import { PALETTE } from '../../utils/constants/palette';
import LinkIcon from '../common/icons/LinkIcon';

const FeedReactionControls = ({
  creator,
  taleId,
}: FeedReactionControlsProps) => {
  const navigation = useNavigation<ModalNavigatorNavigationProp>();

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

  const onPressAvatar = useCallback(() => {
    navigation.push('Modal', {
      screen: 'Profile',
      params: { user: creator },
    });
  }, [creator, navigation]);

  const onPressLink = useCallback(() => {
    if (taleId) {
      navigation.navigate('Modal', {
        screen: 'TaleView',
        params: {
          id: taleId,
          creator,
        },
      });
    }
  }, [creator, navigation, taleId]);

  return (
    <AuxiliaryControls>
      <Pressable style={onPressReactionControlStyle} onPress={onPressAvatar}>
        <Image
          style={styles.avatar}
          source={{
            // uri: `${AWS_S3_MEDIA_URL}/${creator.avatar?.uri}`,
            uri: creator.avatar?.uri,
          }}
        />
      </Pressable>
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
          onPress={onPressLink}
        />
      ) : null}
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
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
  },
  reactionIcon: {
    fontSize: 24,
  },
  reactionCount: {
    marginTop: 2,
    color: PALETTE.WHITE,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default FeedReactionControls;

// isLiked,
// isBookmarked,
// likes,
// comments,
// bookmarks,
// shares,
// onPressComments,

// const [reactionCounts, setReactionCounts] = useState<{
//   likes: number;
//   comments: number;
//   bookmarks: number;
//   shares: number;
// }>({
//   likes: likes ?? 0,
//   comments: comments ?? 0,
//   bookmarks: bookmarks ?? 0,
//   shares: shares ?? 0,
// });
// const [liked, setLiked] = useState<boolean>(isLiked || false);
// const [bookmarked, setBookmarked] = useState<boolean>(isBookmarked || false);

// const parseCount = useCallback((count: number): string => {
//   const parsedCount =
//     count > 1000000
//       ? Math.floor(count / 1000000) + "M"
//       : count > 1000
//       ? Math.floor(count / 1000) + "K"
//       : count + "";
//   return parsedCount;
// }, []);

// const onPressLike = useCallback(() => {
//   const likesChange = liked ? -1 : 1;
//   setReactionCounts(prevReactionCounts => ({
//     ...prevReactionCounts,
//     likes: reactionCounts.likes + likesChange,
//   }));
//   setLiked(prevLikedState => !prevLikedState);
// }, [liked, reactionCounts, setLiked, setReactionCounts]);

// const onPressComment = useCallback(() => {
//   // navigation.getParent()?.navigate("comments", {
//   //   count: parseCount(reactionCounts.comments),
//   // });
//   if (onPressComments) {
//     onPressComments();
//   }
// }, [navigation]);

// const onPressBookmark = useCallback(() => {
//   const bookmarksChange = bookmarked ? -1 : 1;
//   setReactionCounts(prevReactionCounts => ({
//     ...prevReactionCounts,
//     bookmarks: reactionCounts.bookmarks + bookmarksChange,
//   }));
//   setBookmarked(prevLikedState => !prevLikedState);
// }, [bookmarked, reactionCounts, setBookmarked]);

{
  /* <GypsieButton
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
      /> */
}

{
  /* <GypsieButton
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
      /> */
}
{
  /* <GypsieButton
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
      /> */
}

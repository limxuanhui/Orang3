import { StyleSheet, View } from 'react-native';
import FeedCarousel from './FeedCarousel';
import FeedReactionControls from './FeedReactionControls';
import type { FeedDisplayProps } from './types/types';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '@constants/constants';
import { PALETTE } from '@constants/palette';
import { useCallback, useContext } from 'react';
import { AuthContext } from '@contexts/AuthContext';
import GypsieButton from '@components/common/buttons/GypsieButton';
import { useNavigation } from '@react-navigation/native';
import { ModalNavigatorNavigationProp } from '@navigators/types/types';
import EditIcon from '@icons/EditIcon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const FeedDisplay = ({ data, inView }: FeedDisplayProps) => {
  const insets = useSafeAreaInsets();
  const { user } = useContext(AuthContext);
  const navigation = useNavigation<ModalNavigatorNavigationProp>();
  const {
    metadata,
    feedItems,
    isLiked,
    isBookmarked,
    likes,
    comments,
    bookmarks,
    shares,
  } = data;

  const viewerIsCreator = user?.id === metadata.creator.id;
  const onPressEdit = useCallback(() => {
    //dispatch setFeed
    navigation.push('Modal', {
      screen: 'WriteFeed',
      params: { feedId: metadata.id },
    });
  }, [metadata.id, navigation]);

  return (
    <View style={styles.container}>
      {viewerIsCreator ? (
        <GypsieButton
          customButtonStyles={{
            position: 'absolute',
            top: insets.top,
            right: 10,
            backgroundColor: 'red',
            width: 'auto',
            zIndex: 1,
          }}
          customIconStyles={{
            fontSize: 24,
            color: PALETTE.ORANGE,
          }}
          Icon={EditIcon}
          onPress={onPressEdit}
        />
      ) : null}
      <FeedCarousel
        handle={metadata.creator.handle}
        items={feedItems}
        inView={inView}
      />
      <FeedReactionControls
        creator={metadata.creator}
        taleId={metadata.taleId}
        isLiked={isLiked}
        isBookmarked={isBookmarked}
        likes={likes}
        comments={comments}
        bookmarks={bookmarks}
        shares={shares}
        // onPressComments={() => openBottomSheet()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
    backgroundColor: PALETTE.GREYISHBLUE,
  },
  contentContainer: { paddingBottom: 100 },
  image: {
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
    backgroundColor: PALETTE.BLACK,
  },
});

export default FeedDisplay;

// const { bottomSheetRef, snapPoints, openBottomSheet, renderBackdrop } =
// useBottomSheetHandlers({ snapPointsArr: [1, "50%"] });

// const commentsData: string[] = [
//   "Occaecat sit dolor consectetur ullamco esse amet exercitation do irure aliquip deserunt quis.",
//   "Lorem sit ad aute proident consequat irure esse irure eu nostrud nulla Lorem veniam.",
// ];

{
  /* <Portal>
<BottomSheet
  ref={bottomSheetRef}
  backdropComponent={renderBackdrop}
  backgroundStyle={{ backgroundColor: "green" }}
  index={-1}
  snapPoints={snapPoints}>
  {commentsData.length === 0 ? (
    <View style={styles.commentInfo}>
      <Text style={styles.commentInfoText}>No comments...</Text>
      <TextInput
        style={styles.commentInput}
        placeholder="Write a comment"
      />
    </View>
  ) : commentsData.length > 0 ? (
    <BottomSheetScrollView
      style={{
        padding: 8,
      }}
      showsVerticalScrollIndicator={false}>
      {commentsData.map(el => (
        <View style={styles.commentsList}>
          <Text>{el}</Text>
          <TextInput
            style={styles.commentInput}
            placeholder="Write a comment"
          />
        </View>
      ))}
    </BottomSheetScrollView>
  ) : (
    <View style={{}}>
      <ActivityIndicator size={60} color={PALETTE.ORANGE} />
    </View>
  )}
</BottomSheet>
<PortalHost name="Home_ShowComments-host" />
</Portal> */
}

// commentsList: {},
// commentInput: {
//   height: 50,
//   width: "100%",
//   borderWidth: 1,
//   borderColor: "black",
//   backgroundColor: "skyblue",
// },
// commentInfo: {
//   flex: 1,
//   // flexDirection: 'row',
//   borderWidth: 4,
//   borderColor: "red",
//   justifyContent: "center",
//   alignItems: "center",
// },
// commentInfoText: {
//   fontFamily: "Futura",
//   fontSize: 24,
//   color: PALETTE.GREY,
// },

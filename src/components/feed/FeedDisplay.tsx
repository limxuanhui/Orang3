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
    navigation.push('Modal', {
      screen: 'WriteFeed',
      params: { feedId: metadata.id },
    });
  }, [metadata.id, navigation]);

  return (
    <View style={styles.container}>
      {viewerIsCreator ? (
        <GypsieButton
          customButtonStyles={[styles.editButton, { top: insets.top }]}
          customIconStyles={styles.editIcon}
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
  editButton: {
    position: 'absolute',
    right: 10,
    width: 'auto',
    zIndex: 1,
    // backgroundColor: 'red',
  },
  editIcon: {
    fontSize: 24,
    color: PALETTE.ORANGE,
  },
  image: {
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
    backgroundColor: PALETTE.BLACK,
  },
});

export default FeedDisplay;

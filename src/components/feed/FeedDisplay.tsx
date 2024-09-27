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
import {
  GypsieUser,
  ModalNavigatorNavigationProp,
} from '@navigators/types/types';
import EditIcon from '@icons/EditIcon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useDataManager from '@hooks/useDataManager';
import FullScreenLoading from '@components/common/FullScreenLoading';

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
  const { data: creator, isLoading: creatorIsLoading } =
    useDataManager<GypsieUser>('user-by-userid', metadata.creatorId);
  const viewerIsCreator = user?.id === metadata.creatorId;

  const onPressEdit = useCallback(() => {
    navigation.push('Modal', {
      screen: 'WriteFeed',
      params: { feedId: metadata.id },
    });
  }, [metadata.id, navigation]);

  if (creatorIsLoading) {
    return <FullScreenLoading />;
  }

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
        handle={creator?.handle as string}
        items={feedItems}
        inView={inView}
      />
      <FeedReactionControls
        creator={creator as GypsieUser}
        taleId={metadata.taleId}
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
    backgroundColor: PALETTE.GREYISHBLUE,
  },
  contentContainer: { paddingBottom: 100 },
  editButton: {
    position: 'absolute',
    right: 10,
    width: 'auto',
    zIndex: 1,
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

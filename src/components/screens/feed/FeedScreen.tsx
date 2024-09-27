import { StyleSheet } from 'react-native';
import FeedDisplay from '@components/feed/FeedDisplay';
import { Feed } from '@components/feed/types/types';
import type { FeedScreenProps } from './types/types';
import { PALETTE } from '@constants/palette';
import FullScreenLoading from '@components/common/FullScreenLoading';
import useDataManager from '@hooks/useDataManager';
import MessageDisplay from '@components/common/MessageDisplay';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '@constants/constants';
import { GypsieUser } from 'components/navigators/types/types';

const FeedScreen = ({ route }: FeedScreenProps) => {
  const { feedId } = route.params;
  const { data, isLoading } = useDataManager<Feed>('feed-by-feedid', feedId);
  const { data: creator, isLoading: creatorIsLoading } =
    useDataManager<GypsieUser>(
      'user-by-userid',
      data?.metadata.creatorId || '',
    );

  if (isLoading || creatorIsLoading) {
    return <FullScreenLoading />;
  }

  if (creator?.isDeactivated) {
    return (
      <MessageDisplay
        containerStyle={styles.container}
        message="This user has deactivated their account :("
      />
    );
  }

  return data && creator ? (
    <FeedDisplay data={data as Feed} inView />
  ) : (
    <MessageDisplay
      containerStyle={{ backgroundColor: PALETTE.GREYISHBLUE }}
      message="Unable to display feed at the moment..."
    />
  );
};

const styles = StyleSheet.create({
  container: {
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
    backgroundColor: PALETTE.GREYISHBLUE,
  },
});

export default FeedScreen;

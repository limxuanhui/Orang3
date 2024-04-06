import FeedDisplay from '@components/feed/FeedDisplay';
import { Feed } from '@components/feed/types/types';
import type { FeedScreenProps } from './types/types';
import { PALETTE } from '@constants/palette';
import FullScreenLoading from '@components/common/FullScreenLoading';
import useDataManager from '@hooks/useDataManager';
import MessageDisplay from '@components/common/MessageDisplay';

const FeedScreen = ({ route }: FeedScreenProps) => {
  const { feedId } = route.params;
  const { data, isLoading } = useDataManager('feed-by-feedid', feedId);

  if (isLoading) {
    return <FullScreenLoading />;
  }

  return data ? (
    <FeedDisplay data={data as Feed} inView />
  ) : (
    <MessageDisplay
      containerStyle={{ backgroundColor: PALETTE.GREYISHBLUE }}
      message="Unable to display feed at the moment..."
    />
  );
};

export default FeedScreen;

import type { FeedMetadata, Media } from '@components/feed/types/types';
import type { TaleMetadata } from '@components/tale/types/types';
import { GypsieUser } from 'components/navigators/types/types';

export type MyTalesProps = {
  creator: GypsieUser;
  data: TaleMetadata[];
  onRefresh: () => void;
};

export type MyFeedsProps = {
  data: FeedMetadata[];
  onRefresh: () => void;
};

export type EditProfile = {
  originalUser: GypsieUser;
  avatar?: Media;
  name: string;
  handle: string;
  bio: string;
  saving: boolean;
};

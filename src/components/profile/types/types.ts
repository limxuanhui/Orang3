import type { FeedMetadata } from '@components/feed/types/types';
import type { TaleMetadata } from '@components/tale/types/types';

export type MyTalesProps = {
  data: TaleMetadata[];
  onRefresh: () => void;
};

export type MyFeedsProps = {
  data: FeedMetadata[];
  onRefresh: () => void;
};

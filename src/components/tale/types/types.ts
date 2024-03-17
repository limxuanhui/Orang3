import type { StyleProp, ViewStyle } from 'react-native';
import type { Itinerary } from '@components/itinerary/types/types';
import type { Story } from '@components/post/types/types';
import type { Media } from '@components/feed/types/types';
import type { GypsieUser } from '@navigators/types/types';

// export type Creator = {
//   id: string;
//   handle: string;
//   avatarUri: string;
// }

export type Tale = {
  metadata: {
    id: string;
    creator: GypsieUser;
    cover?: Media;
    thumbnail?: Media;
    title: string;
  };
  itinerary: Itinerary;
  story: Story;
};

export type WriteTale = Tale & {
  posting: boolean;
  saving: boolean;
  feedItemThumbnails: {
    data: FeedItemThumbnail[][];
    status: 'idle' | 'pending' | 'succeeded' | 'failed';
    error?: string;
  };
};

export type TaleThumbnailInfo = {
  taleId: string;
  creator: GypsieUser;
  cover: Media;
  title: string;
};

export type TaleThumbnailProps = {
  data: TaleThumbnailInfo;
};

export type TaleThumbnailsFilterProps = {
  filter: string[];
};

export type FeedItemThumbnail = {
  feedId: string;
  uri: string;
};

export type FeedItemThumbnailsCarouselProps = {
  data: FeedItemThumbnail[];
  style?: StyleProp<ViewStyle>;
};

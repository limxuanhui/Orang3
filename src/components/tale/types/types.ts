import type { StyleProp, ViewStyle } from 'react-native';
import type { Itinerary } from '@components/itinerary/types/types';
import type { Story } from '@components/post/types/types';
import type { Feed, Media } from '@components/feed/types/types';
import type { GypsieUser } from '@navigators/types/types';

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
  data: Feed;
  style?: StyleProp<ViewStyle>;
};

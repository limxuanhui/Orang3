import type {
  Itinerary,
  ItineraryDto,
} from '@components/itinerary/types/types';
import type { Story } from '@components/post/types/types';
import type { Media } from '@components/feed/types/types';
import type { GypsieUser } from '@navigators/types/types';

export type TaleMetadata = {
  id: string;
  creator: GypsieUser;
  cover?: Media;
  thumbnail?: Media;
  title: string;
};

export type Tale = {
  metadata: TaleMetadata;
  itinerary: Itinerary;
  story: Story;
};

export type TaleDto = {
  metadata: {
    id: string;
    creator: GypsieUser;
    cover?: Media;
    thumbnail?: Media;
    title: string;
  };
  itinerary: ItineraryDto;
  story: Story;
};

export type WriteTale = Tale & {
  posting: boolean;
  saving: boolean;
  selectedStoryItemIndex: number;
};

export type TaleThumbnailInfo = {
  taleId: string;
  creator: GypsieUser;
  thumbnail: Media;
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

export enum FeedItemThumbnailsDisplayFormat {
  'CAROUSEL',
}

export const FEED_ITEM_THUMBNAILS_DISPLAY_STYLES = {
  0: {},
};

export type FeedItemThumbnailsCarouselProps = {
  feedId: string;
  displayFormat: FeedItemThumbnailsDisplayFormat.CAROUSEL;
};

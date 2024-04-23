import type {
  Itinerary,
  ItineraryDto,
  Route,
  RouteDto,
} from '@components/itinerary/types/types';
import type { Story, StoryItem } from '@components/post/types/types';
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

export type UpdateTaleDto = {
  taleId: string;
  metadata: {
    id: string;
    creator: GypsieUser;
    cover?: Media;
    thumbnail?: Media;
    title: string;
  } | null;
  routes: {
    modified: RouteDto[];
    deleted: string[];
  };
  storyItems: {
    modified: StoryItem[];
    deleted: string[];
  };
};

export type WriteTale = Tale & {
  mode: 'NEW' | 'EDIT';
  posting: boolean;
  saving: boolean;
  selectedStoryItemIndex: number;
  changes: {
    metadata: {
      type: 'NONE' | 'ONLY_EDITED_TITLE' | 'MUTATE';
      modified: TaleMetadata;
    };
    routes: {
      type: 'NONE' | 'ONLY_EDITED_ROUTES' | 'MUTATE';
      modified: Route[];
      deleted: string[];
    };
    storyItems: {
      type: 'NONE' | 'ONLY_EDITED_STORY_TEXT' | 'MUTATE';
      modified: StoryItem[];
      deleted: string[];
    };
  };
};

export type TaleThumbnailProps = {
  data: TaleMetadata;
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
  closeBottomSheet?: () => void;
};

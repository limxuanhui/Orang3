import { GypsieUser } from '../../navigators/types/types';

// Data types
export type FeedMetadata = {
  id: string;
  creatorId: string;
  thumbnail: Media;
  taleId?: string;
};

export type BaseFeed = {
  metadata: FeedMetadata;
  feedItems: FeedItem[];
};

export type Feed = BaseFeed & {
  isLiked?: boolean;
  isBookmarked?: boolean;
  likes?: number;
  comments?: number;
  bookmarks?: number;
  shares?: number;
};

export type FeedItem = {
  id: string;
  thumbnail: Media;
  media: Media;
  caption: string;
  feedId: string;
  order: number;
  isRemote?: boolean;
};

export type UpdateFeedDto = {
  metadata: FeedMetadata | null;
  modified: FeedItem[];
  deleted: FeedItem[];
};

export type MediaMimeType =
  | 'image/jpg'
  | 'image/jpeg'
  | 'image/png'
  | 'image/gif'
  | 'video/mp4'
  | 'image/unknown';

export type Media = {
  id: string;
  type: MediaMimeType;
  uri: string;
  height: number;
  width: number;
};

// Component properties
export type FeedDisplayProps = {
  data: Feed;
  inView: boolean;
};

export type FeedThumbnailProps = {
  data: FeedMetadata;
};

export type FeedDescriptionProps = {
  handle: string;
  caption?: string;
};

export type FeedReactionControlsProps = {
  creator: GypsieUser;
  isLiked?: boolean;
  isBookmarked?: boolean;
  likes?: number;
  comments?: number;
  bookmarks?: number;
  shares?: number;
  taleId?: string;
  onPressComments?: () => void;
};

export type FeedCarouselProps = {
  handle: string;
  items: FeedItem[];
  inView: boolean;
};

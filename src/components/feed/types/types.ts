import { GypsieUser } from '../../navigators/types/types';

// Data types
export type FeedMetadata = {
  id: string;
  creator: GypsieUser;
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
  media: Media;
  caption: string;
};

export type FeedThumbnailInfo = {
  feedId: string;
  creator: GypsieUser;
  media: Media;
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
  data: FeedThumbnailInfo;
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

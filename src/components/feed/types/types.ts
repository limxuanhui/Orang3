// Data types
export type BaseFeed = {
  id: string;
  userId: string;
  items: FeedItem[];
};

export type Feed = BaseFeed & {
  avatarUri: string;
  handle: string;
  isLiked: boolean;
  isBookmarked: boolean;
  likes: number;
  comments: number;
  bookmarks: number;
  shares: number;
};

export type FeedItem = {
  id: string;
  media?: Media;
  caption?: string;
  taleId?: string;
};

export type MediaMimeType =
  | "image/jpg"
  | "image/jpeg"
  | "image/png"
  | "image/gif"
  | "video/mp4";

export type Media = {
  id: string;
  type: MediaMimeType;
  uri: string;
  // aspectRatio?: number;
} | null;

// Component properties
export type FeedDisplayProps = {
  data: Feed;
  inView: boolean;
};

export type FeedThumbnailProps = {
  feed: Feed;
};

export type FeedDescriptionProps = {
  handle: string;
  caption?: string;
};

export type FeedReactionControlsProps = {
  userId: string;
  avatarUri: string;
  isLiked: boolean;
  isBookmarked: boolean;
  likes: number;
  comments: number;
  bookmarks: number;
  shares: number;
};

export type FeedCarouselProps = {
  handle: string;
  items: FeedItem[];
  inView: boolean;
};

import type { Creator } from "../../tale/types/types";

// Data types
export type BaseFeed = {
  id: string;
  creator: Creator;
  items: FeedItem[];
};

export type Feed = BaseFeed & {
  isLiked?: boolean;
  isBookmarked?: boolean;
  likes?: number;
  comments?: number;
  bookmarks?: number;
  shares?: number;
  taleId?: string;
};

export type FeedItem = {
  id: string;
  media: Media;
  caption?: string;
  taleId?: string; // Might be able to remove this property
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
  creator: Creator;
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

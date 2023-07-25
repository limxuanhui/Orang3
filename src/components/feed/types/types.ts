export type FeedProps = {
  feed: Feed;
  inView: boolean;
};

export type Feed = {
  id: number;
  items: Array<FeedItem>;
  userId: number;
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
  id: number;
  type: string;
  uri: string;
  caption?: string;
  maplink?: string;
};

export type FeedThumbnailProps = {
  feed: Feed;
};

export type FeedScreenParams = {
  feedId: number;
};

export type FeedDescriptionProps = {
  handle: string;
  caption?: string;
};

export type FeedReactionControlsProps = {
  userId: number;
  avatarUri: string;
  isLiked: boolean;
  isBookmarked: boolean;
  likes: number;
  comments: number;
  bookmarks: number;
  shares: number;
};

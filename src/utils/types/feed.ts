export type FeedProps = {
  feed: Feed;
  inView: boolean;
};

export type Feed = {
  id: number;
  items: Array<FeedItem>;
  avatarUri: string;
  handle: string;
  // soundTrack: string;
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

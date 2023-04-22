export type VlogDetails = {
  id: number;
  videoUri: string;
  avatarUri: string;
  handle: string;
  caption: string;
  soundTrack: string;
  isLiked: boolean;
  isBookmarked: boolean;
  likes: number;
  comments: number;
  bookmarks: number;
  shares: number;
};

export type VlogDescriptionProps = {
  handle: string;
  caption?: string;
  soundTrack?: string;
};

export type VlogPlayerProps = {
  vlog: GypsiePostItem;
  shouldPlay: boolean;
};

export enum VlogPlayerStatus {
  PLAYING,
  PAUSED,
  BUFFERING,
}

export type GypsiePostProps ={
  post: GypsiePost;
  inView: boolean;
}

export type GypsiePost = {
  id: number;
  items: Array<GypsiePostItem>;
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

export type GypsiePostItem = {
  id: number;
  type: string;
  uri: string;
  caption?: string;
  maplink?: string;
};

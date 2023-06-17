import { FeedItem } from "./feed";

export type VlogDescriptionProps = {
  handle: string;
  caption?: string;
  soundTrack?: string;
};

export type VlogPlayerProps = {
  vlog: FeedItem;
  shouldPlay: boolean;
};

export enum VlogPlayerStatus {
  PLAYING,
  PAUSED,
  BUFFERING,
}

export type VlogPlayerSliderProps = {
  value: number;
  maxValue: number;
};

import type { FeedItem } from '@components/feed/types/types';

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

import type { FeedThumbnailInfo } from "../../feed/types/types";
import type { TaleThumbnailInfo } from "../../tale/types/types";

export type MyTalesProps = {
  data: TaleThumbnailInfo[];
};

export type MyFeedsProps = {
  data: FeedThumbnailInfo[];
};

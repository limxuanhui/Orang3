import { StyleProp, ViewStyle } from "react-native";
import type { Asset } from "react-native-image-picker";
import type { Itinerary } from "../../itinerary/types/types";
import type { Story } from "../../post/types/types";
import type { Feed, Media } from "../../feed/types/types";

export type Creator = {
  id: string;
  handle: string;
  avatarUri: string;
}

export type Tale = {
  id: string;
  creator: Creator;
  cover: Media;
  title: string;
  feeds: Feed[];
  itinerary: Itinerary;
  story: Story;
};

export type NewTale = Tale & {
  posting: boolean;
  saving: boolean;
  feedItemThumbnails: {
    data: FeedItemThumbnail[][];
    status: "idle" | "pending" | "succeeded" | "failed";
    error?: string;
  };
  // selectedItemId: number;
};

export type TaleThumbnailInfo = {
  taleId: string;
  creator: Creator;
  cover: Media;
  title: string;
};

export type TaleThumbnailProps = {
  index: number;
  data: TaleThumbnailInfo;
};

export type TaleThumbnailsFilterProps = {
  filter: string[];
};

export type FeedItemThumbnail = {
  feedId: string;
  uri: string;
};

export type FeedItemThumbnailsCarouselProps = {
  data: FeedItemThumbnail[];
  style?: StyleProp<ViewStyle>;
};

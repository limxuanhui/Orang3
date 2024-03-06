import type { StyleProp, ViewStyle } from "react-native";
import type { Itinerary } from "../../itinerary/types/types";
import type { Story } from "../../post/types/types";
import type { Feed, Media } from "../../feed/types/types";
import type { GypsieUser } from "../../navigators/types/types";

// export type Creator = {
//   id: string;
//   handle: string;
//   avatarUri: string;
// }

export type Tale = {
  id: string;
  creator: GypsieUser;
  cover?: Media;
  title: string;
  feeds: Feed[];
  itinerary: Itinerary;
  story: Story;
};

export type WriteTale = Tale & {
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
  creator: GypsieUser;
  cover: Media;
  title: string;
};

export type TaleThumbnailProps = {  
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

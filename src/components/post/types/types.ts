import type { StyleProp, TextStyle } from "react-native";
import type { FeedItem } from "../../feed/types/types";
import type { Itinerary, LinkedFeedsListItem, RouteInfo } from "../../itinerary/types/types";

// Feed
export type NewFeedPostSideControlsProps = {
  onPressAdd: () => void;
  onPressDelete: () => void;
  onPressEdit: () => void;
  onPressPost: () => void;
};

export type NewFeedPostCarouselProps = {
  items: FeedItem[];
};

// Itinerary
// export type Itinerary = {
//   id: string;
//   routes: RouteInfo[];
// };

export type ItineraryTableProps = {
  data: Itinerary;
  clearDataHandler?: () => void;
};

export type ItineraryMapOverviewProps = {
  data: Itinerary;
  onPressClearPlan?: () => void;
};

export type StoryText = {
  id: string;
  type: StoryItemType.Text;
  text: string;
  style: StyleProp<TextStyle>;
};

export type StoryMedia = {
  id: string;
  type: StoryItemType.Media;
  data: LinkedFeedsListItem[];
};

export enum StoryItemType {
  "Text",
  "Media",
}

export type StoryItem = StoryText | StoryMedia;

export type Story = StoryItem[];

export type ItineraryStoryProps = {
  data: Story;
};

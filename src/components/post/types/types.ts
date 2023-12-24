import type { StyleProp, TextStyle } from "react-native";
import type { FeedItemThumbnail } from "../../tale/types/types";

// Feed
export type NewFeedSideControlsProps = {
  onPressAdd: () => void;
  onPressDelete: () => void;
  onPressEdit: () => void;
  onPressPost: () => void;
};

// Tale
export type ItineraryMapOverviewProps = {
  creatorId: string;
  itineraryId?: string;
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
  data: FeedItemThumbnail[];
};

export enum StoryItemType {
  "Text",
  "Media",
}

export type StoryItem = StoryText | StoryMedia;

export type Story = StoryItem[];

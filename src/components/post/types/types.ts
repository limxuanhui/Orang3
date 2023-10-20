import { FeedItem } from "../../feed/types/types";

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
export type ItineraryRow = {
  title: string;
  places: string[];
};

export type ItineraryTableProps = {
  data: ItineraryRow[];
  clearDataHandler?: () => void;
};
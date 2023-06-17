import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type MapStackNavigatorParamList = {
  map: undefined;
  // "feed": undefined;
  "itinerary-feed": undefined;
  "itinerary-planning": undefined;
  "itinerary-view": undefined;
  "place-search": { onAddPlace: () => void };
};

export type MapScreenNavigationProp = NativeStackNavigationProp<
  MapStackNavigatorParamList,
  "map"
>;

export type ItineraryFeedProps = {
  feed: ItineraryFeedItem[];
};

export type ItineraryFeedItem = {
  name: string;
};

export type ItineraryFilterProps = {
  filter: string[];
};

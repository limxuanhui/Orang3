import type { RouteProp } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { RouteNodeInfo } from "../../../itinerary/types/types";
import type { ModalNavigatorParamList } from "../../../navigators/types/types";

export type ItineraryStackNavigatorParamList = {
  ItineraryFeed: undefined;
  NewPostOptions: undefined;
};

// --------------------------- ItineraryViewScreen ---------------------------
export type ItineraryViewScreenProps = {
  navigation: ItineraryViewNavigationProp;
};

export type ItineraryViewNavigationProp = StackNavigationProp<
  ModalNavigatorParamList,
  "ItineraryView"
>;

// --------------------------- PlaceSearchScreen ---------------------------

export type PlaceSearchScreenParams = {
  onAddPlace: (routeNode: RouteNodeInfo) => void;
};

export type PlaceSearchScreenProps = {
  route: RouteProp<ModalNavigatorParamList, "PlaceSearch">;
};

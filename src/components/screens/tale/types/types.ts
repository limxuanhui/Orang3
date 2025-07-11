import type { RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RouteNode } from '@components/itinerary/types/types';
import type { ModalNavigatorParamList } from '@navigators/types/types';

export type TaleStackNavigatorParamList = {
  TalesOverview: undefined;
  NewPostOptions: undefined;
};

// --------------------------- ItineraryScreen ---------------------------
export type ItineraryScreenParams = {};

export type ItineraryScreenProps = {
  navigation: ItineraryNavigationProp;
};

export type ItineraryNavigationProp = StackNavigationProp<
  ModalNavigatorParamList,
  'Itinerary'
>;

export type ItineraryRouteProp = RouteProp<
  ModalNavigatorParamList,
  'Itinerary'
>;

// --------------------------- PlaceSearchScreen ---------------------------

export type PlaceSearchScreenParams = {
  onAddPlace: (routeNode: RouteNode) => void;
};

export type PlaceSearchScreenProps = {
  route: RouteProp<ModalNavigatorParamList, 'PlaceSearch'>;
};

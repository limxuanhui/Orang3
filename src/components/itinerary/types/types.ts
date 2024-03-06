import { StyleProp, ViewStyle } from "react-native";
import { GooglePlaceDetail } from "react-native-google-places-autocomplete";
import { LatLng, MapPolyline } from "react-native-maps";
import { Media } from "../../feed/types/types";

// Data types
export type Itinerary = {
  id: string;
  creatorId: string;
  routes: RouteInfo[];
};

export type RouteNodeInfo = {
  placeId: string;
  name: string;
  address: string;
  coord: RouteNodeCoord;
  openNow?: boolean;
};

export type RouteInfo = {
  id: string;
  name: string;
  routeNodes: RouteNodeInfo[];
  isRouted: boolean;
  encodedPolyline: string;
};

export type RouteNodeCoord = LatLng;

// Component properties
export type ItineraryPlannerMode = "view" | "edit";

export type MapPinProps = {
  routeNode: RouteNodeInfo;
  // color: 
};

export type RouteBottomControlsProps = {
  isRouted: boolean;
  oneRouteLeft: boolean;
  routeLength: number;
};

export type RouteButtonProps = {
  route: RouteInfo;
  selected: boolean;
};

export type RouteNodeProps = {
  routeNode: RouteNodeInfo;
};

export type RouteConnectorProps = {
  horizontal: boolean;
  connectorText?: string;
};

export type RouteStepperProps = {
  route: RouteInfo | null;
};

export type RouteControlsProps = {
  routes: RouteInfo[];
  selectedRouteId: string;
};

export type RouteDisplayProps = {
  selectedRoute: RouteInfo;
};

export type RouteNameModalProps = {
  initialValue: string;
};

export type RoutePlannerProps = {
  routes: RouteInfo[];
  selectedRouteId: string;
  selectedRoute: RouteInfo;
};

export type SearchPlaceButtonProps = {};

export type GooglePlacesInputProps = {
  onReceiveResults: (details: GooglePlaceDetail | null) => void;
};

import { StyleProp, ViewStyle } from "react-native";
import { GooglePlaceDetail } from "react-native-google-places-autocomplete";
import { LatLng } from "react-native-maps";
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
  polyline: RouteNodeCoord[];
};

export type RouteNodeCoord = LatLng;

// Component properties
export type MapPinProps = {
  routeNode: RouteNodeInfo;
  onDeleteMarker: (placeId: string) => void;
};

export type RouteBottomControlsProps = {
  isRouted: boolean;
  oneRouteLeft: boolean;
  routeLength: number;
  onClearRoute: () => void;
  onDeleteRoute: () => void;
  onStartRouting: () => void;
};

export type RouteButtonProps = {
  route: RouteInfo;
  selected: boolean;
  onSelectRoute: (routeId: string) => void;
  onHoldRoute: (routeName: string) => void;
};

export type RouteNodeProps = {
  routeNode: RouteNodeInfo;
  onDeletePlace: (placeId: string) => void;
};

export type RouteConnectorProps = {
  horizontal: boolean;
  connectorText?: string;
};

export type RouteStepperProps = {
  route: RouteInfo | null;
  onDeletePlace: (placeId: string) => void;
};

export type RouteControlsProps = {
  routes: RouteInfo[];
  selectedRouteId: string;
  onAddRoute: (name: string) => void;
  onHoldRoute: (routeName: string) => void;
  onSelectRoute: (routeId: string) => void;
};

export type RouteDisplayProps = {
  selectedRoute: RouteInfo;
  onAddPlace: (routeNode: RouteNodeInfo) => void;
  onDeletePlace: (placeId: string) => void;
};

export type RouteNameModalProps = {
  initialValue: string;
  onCancel: () => void;
  onAddRoute: (name: string) => void;
  onUpdateRouteName: (name: string) => void;
};

export type RoutePlannerProps = {
  routes: RouteInfo[];
  selectedRouteId: string;
  selectedRoute: RouteInfo;
  onAddPlace: (routeNode: RouteNodeInfo) => void;
  onDeletePlace: (placeId: string) => void;
  onAddRoute: (name: string) => void;
  onClearRoute: () => void;
  onDeleteRoute: () => void;
  onHoldRoute: (routeName: string) => void;
  onSelectRoute: (routeId: string) => void;
  onStartRouting: () => void;
};

export type SearchPlaceButtonProps = {
  onAddPlace: (routeNode: RouteNodeInfo) => void;
};

export type GooglePlacesInputProps = {
  onReceiveResults: (details: GooglePlaceDetail | null) => void;
};

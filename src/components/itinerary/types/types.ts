import { GooglePlaceDetail } from 'react-native-google-places-autocomplete';
import { LatLng } from 'react-native-maps';

// Data types
export type Itinerary = {
  id: string;
  creatorId: string;
  routes: RouteInfo[];
};

export type RouteNodeInfo = {
  id: string;
  placeId: string;
  name: string;
  address: string;
  coord: RouteNodeCoord;
  colour: string;
  order?: number;
  openNow?: boolean;
};

export type RouteInfo = {
  id: string;
  name: string;
  routeNodes: RouteNodeInfo[];
  encodedPolyline: string;
  polyline?: RouteNodeCoord[];
};

export type RouteNodeCoord = LatLng;

// Component properties
export type ItineraryPlannerMode = 'view' | 'edit';

export type MapPinProps = {
  routeNode: RouteNodeInfo;
  // color: string;
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

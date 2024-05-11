import { GypsieUser } from 'components/navigators/types/types';
import { GooglePlaceDetail } from 'react-native-google-places-autocomplete';
import { LatLng } from 'react-native-maps';

// Data types
export type Itinerary = {
  metadata: {
    id: string;
    creator: GypsieUser;
  };
  routes: Route[];
};

export type ItineraryDto = {
  metadata: {
    id: string;
    creator: GypsieUser;
  };
  routes: RouteDto[];
};

export type RouteNode = {
  id: string;
  placeId: string;
  name: string;
  address: string;
  coord: RouteNodeCoord;
  colour: string;
  order: number;
  openNow?: boolean;
};

export type Route = {
  id: string;
  name: string;
  routeNodes: RouteNode[];
  encodedPolyline: string;
  order: number;
  polyline?: RouteNodeCoord[];
  isRemote?: boolean;
};

export type RouteDto = {
  id: string;
  name: string;
  routeNodes: RouteNode[];
  encodedPolyline: string;
  order: number;
};

export type RouteNodeCoord = LatLng;

// Component properties
export type ItineraryPlannerMode = 'VIEW' | 'EDIT';

export type MapPinProps = {
  routeNode: RouteNode;
};

export type RouteBottomControlsProps = {
  isRouted: boolean;
  oneRouteLeft: boolean;
  routeLength: number;
};

export type RouteButtonProps = {
  route: Route;
  selected: boolean;
};

export type RouteNodeProps = {
  routeNode: RouteNode;
};

export type RouteConnectorProps = {
  horizontal: boolean;
  connectorText?: string;
};

export type RouteStepperProps = {
  route: Route | null;
};

export type RouteControlsProps = {
  routes: Route[];
  selectedRouteId: string;
};

export type RouteDisplayProps = {
  selectedRoute: Route;
};

export type RouteNameModalProps = {
  initialValue: string;
};

export type RoutePlannerProps = {
  routes: Route[];
  selectedRouteId: string;
  selectedRoute: Route;
};

export type SearchPlaceButtonProps = {};

export type GooglePlacesInputProps = {
  onReceiveResults: (details: GooglePlaceDetail | null) => void;
};

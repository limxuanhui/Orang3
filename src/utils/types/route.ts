import { LatLng } from "react-native-maps";

export type RouteNodeInfo = {
  placeId: string;
  name: string;
  address: string;
  openNow: boolean;
  coord: RouteNodeCoord;
};

export type RouteNodeProps = {
  routeNode: RouteNodeInfo;
  onDeletePlace: (placeId: string) => void;
};

export type RouteInfo = {
  id: string;
  name: string;
  routeNodes: RouteNodeInfo[];
  isRouted: boolean;
};

export type RouteNodeCoord = LatLng;

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
  onAddRoute: () => void;
  onHoldRoute: (routeName: string) => void;
  onSelectRoute: (routeId: string) => void;
};

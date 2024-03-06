import { Modal, StyleSheet, View } from "react-native";
import MapView, {
  Polyline,
  PROVIDER_GOOGLE,
  type Provider,
  Region,
} from "react-native-maps";
import useMapHandlers from "../../utils/hooks/useMapHandlers";
import BottomSheet from "../common/BottomSheet";
import MapPin from "./MapPin";
import RoutePlanner from "./RoutePlanner";
import RouteNameModal from "./RouteNameModal";
import type {
  ItineraryPlannerMode,
  RouteInfo,
  RouteNodeInfo,
} from "./types/types";
import {
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
  INITIAL_POSITION,
  LATITUDE_DELTA,
  LONGITUDE_DELTA,
  MAP_SCREEN_BOTTOM_SHEET_CONSTANTS,
} from "../../utils/constants/constants";
import { PALETTE } from "../../utils/constants/palette";
import useModalHandlers from "../../utils/hooks/useModalHandlers";
import { useState, useCallback, useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/redux/hooks";
import {
  itineraryPlanner_closeModal,
  itineraryPlanner_setSelectedRouteId,
} from "../../utils/redux/reducers/itineraryPlannerSlice";
import { ActivityIndicator } from "react-native-paper";
import MapBoxPolyline from "@mapbox/polyline";

type ItineraryPlannerProps = {
  mode: ItineraryPlannerMode;
  itineraryId?: string;
};

const ItineraryPlanner = ({ mode, itineraryId }: ItineraryPlannerProps) => {
  const mapRef = useRef<MapView | null>(null);
  const provider: Provider = PROVIDER_GOOGLE;
  const dispatch = useAppDispatch();
  const { selectedRouteId, modalInitialValue, modalIsOpen, itinerary } =
    useAppSelector(state => state.itineraryPlanner);
  const routes = itinerary.routes;
  const selectedRoute = routes.filter(
    (route: RouteInfo) => route.id === selectedRouteId,
  )[0];
  console.log("routes: ", routes);

  const onCloseModal = useCallback(
    () => dispatch(itineraryPlanner_closeModal()),
    [itineraryPlanner_closeModal, dispatch],
  );

  useEffect(() => {
    dispatch(itineraryPlanner_setSelectedRouteId());
  }, [itineraryPlanner_setSelectedRouteId, dispatch]);

  useEffect(() => {
    // Add animation to a certain location without places added
    console.log("Selected route: ", selectedRoute);

    if (selectedRoute?.routeNodes.length === 1) {
      // Modify to use average of all routeNodes as region
      const { latitude, longitude } = selectedRoute.routeNodes[0].coord;
      const region: Region = {
        latitude,
        longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      };
      mapRef.current?.animateToRegion(region, 200);
    } else if (selectedRoute?.routeNodes.length > 1) {
      mapRef.current?.fitToCoordinates(
        selectedRoute.routeNodes.map(
          (routeNode: RouteNodeInfo) => routeNode.coord,
        ),
        {
          edgePadding: { top: 80, right: 50, bottom: 200, left: 50 },
          animated: false,
        },
      );
    }
  }, [mapRef, selectedRoute]);

  console.log("itinerary: ", JSON.stringify(itinerary, null, 4));

  // useEffect(() => {
  //   console.log("ItineraryPlanner mounted");
  //   // If itinerary id does not exist, create itinerary
  //   if (!itinerary.id) {
  //     // Use user id from global object as creatorId
  //     dispatch(createItinerary({ creatorId: "" }));
  //   }

  //   // Load routes from backend based on itineraryId and call setRoutes

  //   return () => {
  //     console.log("ItineraryPlanner unmounted");
  //     // Dispatch an action to update itinerary in NewItineraryPost.
  //     dispatch(setItinerary({ routes }));
  //   };
  // }, [routes, createItinerary, setItinerary, dispatch]);

  return (
    <View style={styles.container}>
      <Modal
        transparent
        visible={modalIsOpen}
        presentationStyle="overFullScreen"
        onRequestClose={onCloseModal}
        animationType="none">
        <RouteNameModal initialValue={modalInitialValue} />
      </Modal>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={provider}
        region={INITIAL_POSITION}>
        {selectedRoute?.routeNodes.map((routeNode: RouteNodeInfo) => (
          // <MapPin routeNode={routeNode} onDeleteMarker={onDeleteMarker} />
          <MapPin routeNode={routeNode} />
        ))}
        {selectedRoute?.isRouted && selectedRoute?.polyline.length > 1 && (
          <Polyline
            coordinates={selectedRoute.polyline}
            strokeColor={PALETTE.ORANGE}
            strokeWidth={6}
            lineJoin="round"
            lineCap="round"
            geodesic={true}
          />
        )}
      </MapView>
      <BottomSheet
        height={MAP_SCREEN_BOTTOM_SHEET_CONSTANTS.height}
        width={MAP_SCREEN_BOTTOM_SHEET_CONSTANTS.width}
        maxTranslateY={MAP_SCREEN_BOTTOM_SHEET_CONSTANTS.maxTranslateY}>
        {selectedRoute ? (
          <RoutePlanner
            routes={routes}
            selectedRouteId={selectedRouteId}
            selectedRoute={selectedRoute}
          />
        ) : (
          <View style={{ width: "100%", height: "100%" }}>
            <ActivityIndicator size={24} color={PALETTE.ORANGE} />
          </View>
        )}
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default ItineraryPlanner;

// const {
//   mapRef,
//   routes,
//   selectedRouteId,
//   selectedRoute,
//   // modalIsOpen,
//   // modalInitialValue,
//   onAddRoute,
//   onClearRoute,
//   onDeleteRoute,
//   // onHoldRoute,
//   onSelectRoute,
//   onAddMarker,
//   onDeleteMarker,
//   onAddPlace,
//   onDeletePlace,
//   onMapPress,
//   onUpdateRouteName,
//   onStartRouting,
//   onCloseModal,
// } = useMapHandlers({ mode, itineraryId });

// const { modalIsOpen, closeModal, openModal } = useModalHandlers();

// const [modalInitialValue, setModalInitialValue] = useState<string>(
//   selectedRoute.name,
// );

// const onHoldRoute = useCallback(
//   (routeName: string) => {
//     console.warn("clicked holdroute")
//     setModalInitialValue(routeName);
//     openModal();
//   },
//   [openModal, setModalInitialValue],
// );

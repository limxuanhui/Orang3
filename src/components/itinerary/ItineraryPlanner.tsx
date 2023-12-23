import { useContext, useEffect, useRef } from "react";
import { Modal, StyleSheet, View } from "react-native";
import MapView, { Polyline, PROVIDER_GOOGLE, Region } from "react-native-maps";
import { v4 as uuidv4 } from "uuid";
import useMapHandlers from "../../utils/hooks/useMapHandlers";
import BottomSheet from "../common/BottomSheet";
import MapPin from "./MapPin";
import RoutePlanner from "./RoutePlanner";
import RouteNameModal from "./RouteNameModal";
import type { RouteNodeInfo } from "./types/types";
import {
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
  INITIAL_POSITION,
  LATITUDE_DELTA,
  LONGITUDE_DELTA,
  MAP_SCREEN_BOTTOM_SHEET_CONSTANTS,
} from "../../utils/constants/constants";
import { PALETTE } from "../../utils/constants/palette";
import { useAppDispatch, useAppSelector } from "../../utils/redux/hooks";
import {
  createItinerary,
  setItinerary,
} from "../../utils/redux/reducers/newTaleSlice";
import { AuthContext } from "../../utils/contexts/AuthContext";

const ItineraryPlanner = () => {
  const mapRef = useRef<MapView | null>(null);
  const provider = PROVIDER_GOOGLE;
  const {
    routes,
    selectedRouteId,
    selectedRoute,
    modalIsOpen,
    modalInitialValue,
    onAddRoute,
    onClearRoute,
    onDeleteRoute,
    onHoldRoute,
    onSelectRoute,
    onAddMarker,
    onDeleteMarker,
    onAddPlace,
    onDeletePlace,
    onMapPress,
    onUpdateRouteName,
    onStartRouting,
    onCloseModal,
  } = useMapHandlers();
  const dispatch = useAppDispatch();
  const { itinerary } = useAppSelector(state => state.newTale);

  useEffect(() => {
    // Add animation to a certain location without places added
    console.log("Selected route: ", selectedRoute);

    if (selectedRoute.routeNodes.length === 1) {
      // Modify to use average of all routeNodes as region
      const { latitude, longitude } = selectedRoute.routeNodes[0].coord;
      const region: Region = {
        latitude,
        longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      };
      mapRef.current?.animateToRegion(region, 200);
    } else if (selectedRoute.routeNodes.length > 1) {
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

  useEffect(() => {
    console.log("ItineraryPlanner mounted");
    // If itinerary id does not exist, create itinerary
    if (!itinerary.id) {
      // Use user id from global object as creatorId
      dispatch(createItinerary({ creatorId: "" }));
    }

    return () => {
      console.log("ItineraryPlanner unmounted");
      // Dispatch an action to update itinerary in NewItineraryPost.
      // Should we actually be creating a new uuid everytime we dispatch => everytime we edit/or just dismounts ItineraryPlanner? Might need optimisation here.
      dispatch(setItinerary({ routes }));
    };
  }, [routes, createItinerary, setItinerary, dispatch]);
  return (
    <View style={styles.container}>
      <Modal
        transparent
        visible={modalIsOpen}
        presentationStyle="overFullScreen"
        onRequestClose={onCloseModal}
        animationType="none">
        <RouteNameModal
          initialValue={modalInitialValue}
          onCancel={onCloseModal}
          onAddRoute={onAddRoute}
          onUpdateRouteName={onUpdateRouteName}
        />
      </Modal>
      <MapView
        style={styles.map}
        ref={mapRef}
        provider={provider}
        region={INITIAL_POSITION}>
        {selectedRoute.routeNodes.map((routeNode: RouteNodeInfo) => (
          <MapPin routeNode={routeNode} onDeleteMarker={onDeleteMarker} />
        ))}
        {selectedRoute.isRouted && selectedRoute.polyline.length > 1 && (
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
        <RoutePlanner
          routes={routes}
          selectedRouteId={selectedRouteId}
          selectedRoute={selectedRoute}
          onAddPlace={onAddPlace}
          onDeletePlace={onDeletePlace}
          onAddRoute={onAddRoute}
          onClearRoute={onClearRoute}
          onDeleteRoute={onDeleteRoute}
          onHoldRoute={onHoldRoute}
          onSelectRoute={onSelectRoute}
          onStartRouting={onStartRouting}
        />
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

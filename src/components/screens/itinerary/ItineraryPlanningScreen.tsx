import { useEffect, useRef } from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import MapView, { Polyline, PROVIDER_GOOGLE, Region } from "react-native-maps";
import { getStatusBarHeight } from "react-native-status-bar-height";
import Ionicons from "react-native-vector-icons/Ionicons";

import useMapHandlers from "../../../utils/hooks/useMapHandlers";
import BottomSheet from "../../common/BottomSheet";
import MapPin from "../../map/MapPin";
import RoutePlanner from "../../map/RoutePlanner";
import RouteNameModal from "../../map/RouteNameModal";

import {
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
  INITIAL_POSITION,
  LATITUDE_DELTA,
  LONGITUDE_DELTA,
  MAP_SCREEN_BOTTOM_SHEET_CONSTANTS,
} from "../../../utils/constants/constants";
import { PALETTE } from "../../../utils/constants/palette";

const ItineraryPlanningScreen = ({ navigation }: any) => {
  const mapRef = useRef<MapView | null>(null);

  const provider = PROVIDER_GOOGLE;

  const {
    routes,
    selectedRouteId,
    selectedRoute,
    polylines,
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
    onExit,
    onCloseModal,
  } = useMapHandlers(navigation);

  useEffect(() => {
    // Add animation to a certain location without places added

    if (selectedRoute.routeNodes.length === 1) {
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
        selectedRoute.routeNodes.map(routeNode => routeNode.coord),
        {
          edgePadding: { top: 80, right: 50, bottom: 200, left: 50 },
          animated: true,
        },
      );
    }
  }, [selectedRoute]);

  return (
    <View style={styles.container}>
      <Pressable style={styles.backButton} onPress={onExit}>
        <Ionicons name="arrow-back-circle" size={30} color={PALETTE.GREY} />
      </Pressable>
      <Modal
        transparent
        visible={modalIsOpen}
        onRequestClose={onCloseModal}
        animationType="fade">
        <RouteNameModal
          initialValue={modalInitialValue}
          onCancel={onCloseModal}
          onAddRoute={onAddRoute}
          onUpdateRouteName={onUpdateRouteName}
        />
      </Modal>
      <MapView
        ref={mapRef}
        provider={provider}
        style={styles.map}
        region={INITIAL_POSITION}>
        {selectedRoute.routeNodes.map(routeNode => (
          <MapPin routeNode={routeNode} onDeleteMarker={onDeleteMarker} />
        ))}
        {selectedRoute.isRouted && (
          <Polyline
            coordinates={polylines}
            strokeColor="#000000"
            strokeWidth={6}
            lineJoin="round"
            lineCap="round"
            // geodesic={true}
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
      {/* <Ruler /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // ...StyleSheet.absoluteFillObject,
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
    // justifyContent: "flex-end",
    // alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: getStatusBarHeight(),
    left: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 32,
    width: 32,
    zIndex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default ItineraryPlanningScreen;

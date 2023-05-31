import { StyleSheet, View } from "react-native";

import RouteBottomControls from "./RouteBottomControls";
import RouteControls from "./RouteControls";
import RouteDisplay from "./RouteDisplay";

const RoutePlanner = ({
  routes,
  selectedRouteId,
  selectedRoute,
  onAddPlace,
  onDeletePlace,
  onAddRoute,
  onClearRoute,
  onDeleteRoute,
  onHoldRoute,
  onSelectRoute,
  onStartRouting,
}: any) => {
  return (
    <View style={styles.planner}>
      <RouteControls
        routes={routes}
        selectedRouteId={selectedRouteId}
        onAddRoute={onAddRoute}
        onHoldRoute={onHoldRoute}
        onSelectRoute={onSelectRoute}
      />
      <RouteDisplay
        selectedRoute={selectedRoute}
        onAddPlace={onAddPlace}
        onDeletePlace={onDeletePlace}
      />
      <RouteBottomControls
        isRouted={selectedRoute.isRouted}
        oneRouteLeft={routes.length === 1}
        routeLength={selectedRoute.routeNodes.length}
        onClearRoute={onClearRoute}
        onDeleteRoute={onDeleteRoute}
        onStartRouting={onStartRouting}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  planner: {
    alignSelf: "center",
    height: "40%",
    width: "100%",
    borderWidth: 1,
    borderColor: "green",
  },
});

export default RoutePlanner;

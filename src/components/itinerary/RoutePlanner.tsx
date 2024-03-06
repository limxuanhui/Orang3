import { StyleSheet, View } from "react-native";
import RouteBottomControls from "./RouteBottomControls";
import RouteControls from "./RouteControls";
import RouteDisplay from "./RouteDisplay";
import type { RoutePlannerProps } from "./types/types";
import { DIMENSION } from "../../utils/constants/dimensions";
import { useAppSelector } from "../../utils/redux/hooks";

const RoutePlanner = ({
  routes,
  selectedRouteId,
  selectedRoute,
}: RoutePlannerProps) => {
  const { mode } = useAppSelector(state => state.itineraryPlanner);

  return (
    <View style={styles.planner}>
      <RouteControls routes={routes} selectedRouteId={selectedRouteId} />
      <RouteDisplay selectedRoute={selectedRoute} />
      {mode === "edit" ? (
        <RouteBottomControls
          isRouted={selectedRoute.isRouted}
          oneRouteLeft={routes.length === 1}
          routeLength={selectedRoute.routeNodes.length}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  planner: {
    alignSelf: "center",
    height: "42%",
    width: DIMENSION.HUNDRED_PERCENT,
  },
});

export default RoutePlanner;

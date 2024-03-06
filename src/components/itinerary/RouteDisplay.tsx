import { StyleSheet, View } from "react-native";
import RouteStepper from "./RouteStepper";
import SearchPlaceButton from "./SearchPlaceButton";
import type { RouteDisplayProps } from "./types/types";
import { DIMENSION } from "../../utils/constants/dimensions";
import { useAppSelector } from "../../utils/redux/hooks";

const RouteDisplay = ({ selectedRoute }: RouteDisplayProps) => {
  const { mode } = useAppSelector(state => state.itineraryPlanner);

  return (
    <View style={styles.routeContainer}>
      <View style={styles.routeDisplayBox}>
        <RouteStepper route={selectedRoute} />
        {mode === "edit" ? <SearchPlaceButton /> : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  routeContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  routeDisplayBox: {
    maxHeight: DIMENSION.HUNDRED_PERCENT,
  },
});

export default RouteDisplay;

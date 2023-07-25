import { StyleSheet, View } from "react-native";
import RouteStepper from "./RouteStepper";
import SearchPlaceButton from "./SearchPlaceButton";
import type { RouteDisplayProps } from "./types/types";
import { DIMENSION } from "../../utils/constants/dimensions";

const RouteDisplay = ({
  selectedRoute,
  onAddPlace,
  onDeletePlace,
}: RouteDisplayProps) => {
  // Get owner state by comparing userId in redux with ownerId
  const isOwner = true;

  return (
    <View style={styles.routeContainer}>
      <View style={styles.routeDisplayBox}>
        <RouteStepper route={selectedRoute} onDeletePlace={onDeletePlace} />
        {isOwner && <SearchPlaceButton onAddPlace={onAddPlace} />}
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

import { ScrollView, StyleSheet } from "react-native";
import RouteConnector from "./RouteConnector";
import RouteNode from "./RouteNode";
import type { RouteNodeInfo, RouteStepperProps } from "./types/types";
import { DIMENSION } from "../../utils/constants/dimensions";
import { PALETTE } from "../../utils/constants/palette";

const RouteStepper = ({ route }: RouteStepperProps) => {
  return (
    <ScrollView
      style={styles.routeStepper}
      contentContainerStyle={styles.contentContainerStyle}
      showsVerticalScrollIndicator={false}>
      {route?.routeNodes.map((routeNode: RouteNodeInfo, index: number) => (
        <>
          <RouteNode
            key={Math.random.toString()} // To change to uuid
            routeNode={routeNode}
          />
          {index !== route.routeNodes.length - 1 ? (
            <RouteConnector horizontal={false} />
          ) : null}
        </>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  routeStepper: {
    maxHeight: "100%",
    width: "100%",
  },
  contentContainerStyle: {
    // flex: 1,
    // justifyContent: 'flex-end',
  },
  searchNavButton: {
    justifyContent: "center",
    alignItems: "flex-start",
    height: 40,
    width: DIMENSION.HUNDRED_PERCENT,
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: PALETTE.LIGHTGREY,
  },
});

export default RouteStepper;

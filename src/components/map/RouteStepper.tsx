import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import RouteConnector from "./RouteConnector";
import RouteNode from "./RouteNode";

import type { RouteStepperProps } from "../../utils/types/route";
import { useNavigation } from "@react-navigation/native";
import { MapScreenNavigationProp } from "../../utils/types/map";

const RouteStepper = ({
  route,
  onDeletePlace,
}: RouteStepperProps): JSX.Element => {
  const navigation = useNavigation<MapScreenNavigationProp>();

  return (
    <ScrollView
      style={styles.routeStepper}
      // contentContainerStyle={styles.contentContainerStyle}
      showsVerticalScrollIndicator={false}
    >
      {route?.routeNodes.map((routeNode) => (
        <>
          <RouteNode
            key={Math.random.toString()} // To change to other id
            routeNode={routeNode} 
            onDeletePlace={onDeletePlace}
          />
          {/* <RouteConnector horizontal={false} /> */}
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
    width: "100%",
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#cccccc",
  },
});

export default RouteStepper;

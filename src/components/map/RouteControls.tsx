import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "react-native-linear-gradient";
import Ionicons  from "react-native-vector-icons/Ionicons";

import RouteButton from "./RouteButton";
import type { RouteControlsProps, RouteInfo } from "../../utils/types/route";

const RouteControls = ({
  routes,
  selectedRouteId,
  onHoldRoute,
  onSelectRoute,
}: RouteControlsProps) => {
  return (
    <View style={styles.routeControls}>
      <View style={styles.routeSliderBox}>
        <ScrollView
          style={styles.routeSlider}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {routes.map((route: RouteInfo) => (
            <RouteButton
              key={Math.random().toString()} // change to uuid
              route={route}
              selected={route.id === selectedRouteId}
              onHoldRoute={onHoldRoute}
              onSelectRoute={onSelectRoute}
            />
          ))}
        </ScrollView>
        {/* <LinearGradient
          style={styles.linearGradient}
          start={[0, 0]}
          end={[1, 0]}
          colors={["rgba(240,240,240,0.1)", "rgba(0,0,0,0.3)"]}
        /> */}
      </View>
      <Pressable style={styles.addButton} onPress={() => onHoldRoute("")}>
        <Ionicons name="add-circle-outline" size={16} color="black" />
        <Text>Add</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  routeControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 40,
    width: "100%",
    marginBottom: 8,
    backgroundColor: "#ffffff",
  },
  routeSliderBox: {
    flex: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },
  routeSlider: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#ffffff",
    shadowColor: "#000000",
    shadowOpacity: 1,
    shadowOffset: { height: 2, width: 2 },
  },
  linearGradient: {
    flexDirection: "row",
    position: "absolute",
    right: 0,
    height: 30,
    width: 10,
    backgroundColor: "#dddddd",
    opacity: 0.1,
  },
  addButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RouteControls;

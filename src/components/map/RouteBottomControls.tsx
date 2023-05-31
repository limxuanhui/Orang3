import { Pressable, StyleSheet, Text, View } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const RouteBottomControls = ({
  isRouted,
  oneRouteLeft,
  routeLength,
  onClearRoute,
  onDeleteRoute,
  onStartRouting,
}: any) => {
  const clearButtonIsDisabled = oneRouteLeft && routeLength === 0;
  const routeButtonIsDisabled = routeLength <= 1 || isRouted;
  const clearButtonColor = clearButtonIsDisabled ? "#cccccc" : "#000000";
  const routeButtonColor = routeButtonIsDisabled ? "#cccccc" : "#0000ff";

  return (
    <View style={styles.bottomControls}>
      <Pressable
        style={({ pressed }) => [
          styles.bottomControl,
          {
            opacity: pressed ? 0.7 : 1,
          },
        ]}
        onPress={routeLength === 0 ? onDeleteRoute : onClearRoute}
        disabled={clearButtonIsDisabled}
      >
        <MaterialCommunityIcons
          name="delete-outline"
          size={24}
          color={clearButtonColor}
        />
        <Text style={{ color: clearButtonColor }}>
          {routeLength !== 0 ? "Clear places" : "Delete route"}
        </Text>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          styles.bottomControl,
          { opacity: pressed ? 0.7 : 1 },
        ]}
        onPress={onStartRouting}
        disabled={routeButtonIsDisabled}
      >
        <FontAwesome5 name="route" size={24} color={routeButtonColor} />
        <Text style={{ color: routeButtonColor }}>Start routing</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // height: "20%",
    width: "100%",
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#eeeeee",
  },
  bottomControl: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // height: "80%",
    // width: "35%",
    height: 50,
    width: "40%",
    borderWidth: 1,
    borderRadius: 16,
    borderColor: "#cccccc",
    // backgroundColor: "#ff0000",
  },
});

export default RouteBottomControls;

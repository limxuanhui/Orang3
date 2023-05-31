import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Feather from "react-native-vector-icons/Feather";

import RouteStepper from "./RouteStepper";
import { MapScreenNavigationProp } from "../../utils/types/map";

const RouteDisplay = ({ selectedRoute, onAddPlace, onDeletePlace }: any) => {
  const navigation = useNavigation<MapScreenNavigationProp>();

  return (
    <View style={styles.routeContainer}>
      <View style={styles.routeDisplayBox}>
        <RouteStepper route={selectedRoute} onDeletePlace={onDeletePlace} />
        <Pressable
          style={({ pressed }) => [
            styles.searchNavButton,
            { opacity: pressed ? 0.7 : 1 },
          ]}
          onPress={() => navigation.navigate("place-search", { onAddPlace })} // Solve non-serializable issue
        >
          <Feather name="search" size={24} color="black" />
          <Text>Search for place</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  routeContainer: {
    flex: 1,
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "blue",
  },
  routeDisplayBox: {
    maxHeight: "100%",
    borderWidth: 1,
    borderColor: "red",
  },
  searchNavButton: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 40,
    width: "100%",
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#cccccc",
  },
});

export default RouteDisplay;

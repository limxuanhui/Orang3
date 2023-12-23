import { StyleSheet, View } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import ItineraryPlanner from "../../itinerary/ItineraryPlanner";
import type { ItineraryViewScreenProps } from "./types/types";

const ItineraryViewScreen = ({ navigation }: ItineraryViewScreenProps) => {
  const isOwner = true;

  // if user is owner of Itinerary (Read/Write access), show edit functionality

  // if user is not owner of Itinerary (Read access), only show existing state and clone functionality

  return (
    <View style={styles.container}>
      <ItineraryPlanner />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  backButton: {
    position: "absolute",
    top: getStatusBarHeight(),
    left: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 32,
    width: 32,
    zIndex: 2,
  },
});

export default ItineraryViewScreen;

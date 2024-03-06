import { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import ItineraryPlanner from "../../itinerary/ItineraryPlanner";
import { ItineraryRouteProp, type ItineraryScreenProps } from "./types/types";
import { AuthContext } from "../../../utils/contexts/AuthContext";
import { useAppDispatch, useAppSelector } from "../../../utils/redux/hooks";

const ItineraryScreen = ({ navigation }: ItineraryScreenProps) => {
  const { user } = useContext(AuthContext);
  const { params } = useRoute<ItineraryRouteProp>();
  const dispatch = useAppDispatch();
  const { mode } = useAppSelector(state => state.itineraryPlanner);

  return (
    <View style={styles.container}>
      <ItineraryPlanner mode={mode} itineraryId={params.id} />
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

export default ItineraryScreen;

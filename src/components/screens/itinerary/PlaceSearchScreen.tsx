import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import Ionicons from "react-native-vector-icons/Ionicons";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../utils/constants/constants";
import { MapScreenNavigationProp } from "../../utils/types/map";
import GooglePlacesInput from "../map/GooglePlacesInput";

const PlaceSearchScreen = ({ route }: any) => {
  const navigation = useNavigation<MapScreenNavigationProp>();
  const { onAddPlace } = route.params;

  const onExit = useCallback(() => {
    navigation.goBack();
  }, []);

  const onReceiveResults = (details: any) => {
    const location = details.geometry.location;
    console.log("details of capitaspring", details);
    console.log(
      "details of capitaspring",
      details?.opening_hours?.open_now === false,
    );
    const newRouteNode = {
      placeId: details.place_id,
      name: details.name,
      address: details.formatted_address,
      openNow: details?.opening_hours?.open_now,
      coord: { latitude: location?.lat, longitude: location?.lng },
    };
    onAddPlace(newRouteNode);
    onExit();
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          styles.backButton,
          { opacity: pressed ? 0.7 : 1 },
        ]}
        onPress={onExit}>
        <Ionicons name="arrow-back-circle" size={32} color="#000000" />
      </Pressable>
      <View style={styles.googlePlacesInputBox}>
        <GooglePlacesInput
          onAddPlace={route.params.onAddPlace}
          onReceiveResults={onReceiveResults}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
    padding: 20,
    paddingTop: getStatusBarHeight() + 10,
    backgroundColor: "#ffffff",
  },
  backButton: {
    position: "absolute",
    top: getStatusBarHeight() + 20,
    left: 20,
    justifyContent: "center",
    alignItems: "center",
    height: 32,
    width: 32,
  },
  googlePlacesInputBox: {
    width: "90%",
  },
});

export default PlaceSearchScreen;

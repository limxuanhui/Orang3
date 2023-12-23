import { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { GooglePlaceDetail } from "react-native-google-places-autocomplete";
import { getStatusBarHeight } from "react-native-status-bar-height";
import GooglePlacesInput from "../../itinerary/GooglePlacesInput";
import type { RouteNodeInfo } from "../../itinerary/types/types";
import type { PlaceSearchScreenProps } from "./types/types";
import type { ModalNavigatorNavigationProp } from "../../navigators/types/types";
import {
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
} from "../../../utils/constants/constants";
import { DIMENSION } from "../../../utils/constants/dimensions";
import { PALETTE } from "../../../utils/constants/palette";

const PlaceSearchScreen = ({ route }: PlaceSearchScreenProps) => {
  const navigation = useNavigation<ModalNavigatorNavigationProp>();
  const { onAddPlace } = route.params;

  const onExit = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onReceiveResults = useCallback(
    (details: GooglePlaceDetail | null) => {
      if (details === null) {
        onExit();
        return;
      }

      const location = details.geometry.location;
      const newRouteNode: RouteNodeInfo = {
        placeId: details.place_id,
        name: details.name,
        address: details.formatted_address,
        // openNow: details.opening_hours?.open_now,
        coord: { latitude: location.lat, longitude: location.lng },
      };
      onAddPlace(newRouteNode);
      onExit();
    },
    [onAddPlace, onExit],
  );

  return (
    <View style={styles.container}>
      <View style={styles.googlePlacesInputBox}>
        <GooglePlacesInput onReceiveResults={onReceiveResults} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
    padding: 30,
    paddingTop: getStatusBarHeight() + 10,
    backgroundColor: PALETTE.WHITE,
  },
  googlePlacesInputBox: {
    width: DIMENSION.HUNDRED_PERCENT,
  },
});

export default PlaceSearchScreen;

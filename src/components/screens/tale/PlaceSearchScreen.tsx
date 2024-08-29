import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GooglePlaceDetail } from 'react-native-google-places-autocomplete';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { nanoid } from '@reduxjs/toolkit';
import GooglePlacesInput from '@components/itinerary/GooglePlacesInput';
import type { RouteNode } from '@components/itinerary/types/types';
import type { PlaceSearchScreenProps } from './types/types';
import type { ModalNavigatorNavigationProp } from '@navigators/types/types';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '@constants/constants';
import { DIMENSION } from '@constants/dimensions';
import { PALETTE } from '@constants/palette';
import { useAppSelector } from '@redux/hooks';

const PlaceSearchScreen = ({ route }: PlaceSearchScreenProps) => {
  const navigation = useNavigation<ModalNavigatorNavigationProp>();
  const { onAddPlace } = route.params;
  const { selectedRouteId, itinerary } = useAppSelector(
    state => state.itineraryPlanner,
  );
  const selectedRoute = itinerary.routes.find(r => r.id === selectedRouteId);

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
      if (selectedRoute) {
        const newRouteNode: RouteNode = {
          id: nanoid(),
          placeId: details.place_id,
          name: details.name,
          address: details.formatted_address,
          coord: { latitude: location.lat, longitude: location.lng },
          colour: '#f44336ff',
          order: selectedRoute?.routeNodes.length + 1,
          // openNow: details.opening_hours?.open_now,
        };

        onAddPlace(newRouteNode);
      }

      onExit();
    },
    [onAddPlace, onExit, selectedRoute],
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
    flexDirection: 'row',
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
    padding: 30,
    paddingTop: getStatusBarHeight() + 50,
    backgroundColor: PALETTE.WHITE,
  },
  googlePlacesInputBox: {
    width: DIMENSION.HUNDRED_PERCENT,
  },
});

export default PlaceSearchScreen;

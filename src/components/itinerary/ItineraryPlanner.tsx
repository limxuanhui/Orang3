import { useCallback, useRef, useEffect } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ActivityIndicator } from 'react-native-paper';
import MapView, {
  Polyline,
  PROVIDER_GOOGLE,
  type Provider,
  Region,
} from 'react-native-maps';
import BottomSheet, { type BottomSheetRefProps } from '../common/BottomSheet';
import MapPin from './MapPin';
import RoutePlanner from './RoutePlanner';
import RouteNameModal from './RouteNameModal';
import type { Route, RouteNode } from './types/types';
import {
  CUSTOM_DARK_MAP_STYLE,
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
  INITIAL_POSITION,
  LATITUDE_DELTA,
  LONGITUDE_DELTA,
  MAP_SCREEN_BOTTOM_SHEET_CONSTANTS,
} from '../../utils/constants/constants';
import { PALETTE } from '../../utils/constants/palette';
import { useAppDispatch, useAppSelector } from '../../utils/redux/hooks';
import { itineraryPlanner_closeModal } from '../../utils/redux/reducers/itineraryPlannerSlice';
import ColourPickerModal from './ColourPickerModal';
import GypsieButton from '../common/buttons/GypsieButton';
import ChevronsUpIcon from '../common/icons/ChevronsUp';

type ItineraryPlannerProps = {};

const ItineraryPlanner = ({}: ItineraryPlannerProps) => {
  const bottomSheetRef = useRef<BottomSheetRefProps>(null);
  const insets = useSafeAreaInsets();
  const mapRef = useRef<MapView | null>(null);
  const provider: Provider = PROVIDER_GOOGLE;
  const dispatch = useAppDispatch();
  const {
    selectedRouteId,
    modalInitialValue,
    modalIsOpen,
    modalType,
    itinerary,
  } = useAppSelector(state => state.itineraryPlanner);
  const routes = itinerary.routes;
  const selectedRoute = routes.filter(
    (route: Route) => route.id === selectedRouteId,
  )[0];

  const onCloseModal = useCallback(
    () => dispatch(itineraryPlanner_closeModal()),
    [dispatch],
  );

  const onPressExpandBottomSheet = useCallback(() => {
    bottomSheetRef.current?.scrollTo(-DEVICE_HEIGHT / 4);
  }, [bottomSheetRef]);

  useEffect(() => {
    // Add animation to a certain location without places added
    console.log('Selected route: ', selectedRoute);

    if (selectedRoute?.routeNodes.length === 1) {
      // Modify to use average of all routeNodes as region
      const { latitude, longitude } = selectedRoute.routeNodes[0].coord;
      const region: Region = {
        latitude,
        longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      };
      mapRef.current?.animateToRegion(region, 200);
      console.log('Animating to Tampines');
    } else if (selectedRoute?.routeNodes.length > 1) {
      console.log('Animating to coords');
      mapRef.current?.fitToCoordinates(
        selectedRoute.routeNodes.map((routeNode: RouteNode) => routeNode.coord),
        {
          edgePadding: { top: 160, right: 100, bottom: 240, left: 100 },
          animated: true,
        },
      );
    }
  }, [mapRef, selectedRoute]);

  return (
    <View style={styles.container}>
      <Modal
        transparent
        visible={modalIsOpen}
        presentationStyle="overFullScreen"
        onRequestClose={onCloseModal}
        animationType="none">
        {modalType === 'ROUTE_NAME' ? (
          <RouteNameModal initialValue={modalInitialValue} />
        ) : (
          <ColourPickerModal initialColour={modalInitialValue} />
        )}
      </Modal>
      <MapView
        ref={mapRef}
        style={styles.map}
        customMapStyle={CUSTOM_DARK_MAP_STYLE}
        provider={provider}
        region={INITIAL_POSITION}>
        {selectedRoute.routeNodes.map((routeNode: RouteNode) => (
          <MapPin key={routeNode.id} routeNode={routeNode} />
        ))}
        {selectedRoute.polyline && selectedRoute.polyline.length > 0 && (
          <Polyline
            coordinates={selectedRoute.polyline}
            strokeColor={PALETTE.ORANGE}
            strokeWidth={6}
            lineJoin="round"
            lineCap="round"
            geodesic={true}
          />
        )}
      </MapView>
      <GypsieButton
        customButtonStyles={{ position: 'absolute', bottom: insets.bottom }}
        customIconStyles={{ color: 'orange', fontSize: 40 }}
        Icon={ChevronsUpIcon}
        onPress={onPressExpandBottomSheet}
      />
      <BottomSheet
        ref={bottomSheetRef}
        height={MAP_SCREEN_BOTTOM_SHEET_CONSTANTS.height}
        width={MAP_SCREEN_BOTTOM_SHEET_CONSTANTS.width}
        maxTranslateY={MAP_SCREEN_BOTTOM_SHEET_CONSTANTS.maxTranslateY}>
        <RoutePlanner
          routes={routes}
          selectedRouteId={selectedRouteId}
          selectedRoute={selectedRoute}
        />
      </BottomSheet>
      <View
        style={{
          position: 'absolute',
          right: '5%',
          top: '5%',
          alignItems: 'flex-end',
          // backgroundColor: "red",
        }}>
        <ActivityIndicator
          size={24}
          color={PALETTE.ORANGE}
          style={{ right: '5%', top: '5%' }}
        />
        <Text
          style={{
            color: PALETTE.OFFWHITE,
            fontSize: 12,
            fontWeight: 'bold',
            right: '5%',
            top: '5%',
          }}>
          Saved
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bottomSheet: {
    paddingHorizontal: 16,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
});

export default ItineraryPlanner;

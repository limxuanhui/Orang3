import { FlatList, StyleSheet, View } from 'react-native';
import React, { useCallback, useEffect, useRef } from 'react';
import MapView, {
  PROVIDER_GOOGLE,
  Polyline,
  Provider,
  Region,
} from 'react-native-maps';
import {
  CUSTOM_DARK_MAP_STYLE,
  INITIAL_POSITION,
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
  LATITUDE_DELTA,
  LONGITUDE_DELTA,
} from '@constants/constants';
import { PALETTE } from '@constants/palette';
import MapPin from './MapPin';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { Route, RouteNode } from './types/types';
import RouteViewer from './RouteViewer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { itineraryPlanner_selectRoute } from '@redux/reducers/itineraryPlannerSlice';

const ItineraryViewer = () => {
  const insets = useSafeAreaInsets();
  const mapRef = useRef<MapView | null>(null);
  const provider: Provider = PROVIDER_GOOGLE;
  const dispatch = useAppDispatch();
  const { selectedRouteId, itinerary } = useAppSelector(
    state => state.itineraryPlanner,
  );
  const routes = itinerary.routes;
  const selectedRoute = routes.filter(
    (route: Route) => route.id === selectedRouteId,
  )[0];

  const onViewableItemsChanged = useCallback(
    ({ viewableItems, _itemsChanged }: any) => {
      if (viewableItems && viewableItems.length > 0) {
        dispatch(
          itineraryPlanner_selectRoute({
            selectedRouteId: viewableItems[0].item.id,
          }),
        );
      }
    },
    [dispatch],
  );

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
      <FlatList
        style={{
          position: 'absolute',
          bottom: insets.bottom + 20,
          width: DEVICE_WIDTH,
          //   backgroundColor: 'red',
        }}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'flex-end',
        }}
        data={routes}
        pagingEnabled
        renderItem={el => <RouteViewer route={el.item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        onViewableItemsChanged={onViewableItemsChanged}
      />
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
});

export default ItineraryViewer;

import { StyleSheet, View } from 'react-native';
import RouteBottomControls from './RouteBottomControls';
import RouteControls from './RouteControls';
import RouteDisplay from './RouteDisplay';
import type { RoutePlannerProps } from './types/types';
import { DIMENSION } from '@constants/dimensions';

const RoutePlanner = ({
  routes,
  selectedRouteId,
  selectedRoute,
}: RoutePlannerProps) => {
  return (
    <View style={styles.planner}>
      <RouteControls routes={routes} selectedRouteId={selectedRouteId} />
      <RouteDisplay selectedRoute={selectedRoute} />
      <RouteBottomControls
        isRouted={selectedRoute.encodedPolyline !== ''}
        oneRouteLeft={routes.length === 1}
        routeLength={selectedRoute.routeNodes.length}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  planner: {
    alignSelf: 'center',
    height: '42%',
    // height: "90%",
    width: DIMENSION.HUNDRED_PERCENT,
    // backgroundColor:'skyblue'
  },
});

export default RoutePlanner;

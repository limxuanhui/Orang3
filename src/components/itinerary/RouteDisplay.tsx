import { StyleSheet, View } from 'react-native';
import RouteStepper from './RouteStepper';
import SearchPlaceButton from './SearchPlaceButton';
import type { RouteDisplayProps } from './types/types';
import { DIMENSION } from '@constants/dimensions';

const RouteDisplay = ({ selectedRoute }: RouteDisplayProps) => {
  return (
    <View style={styles.routeContainer}>
      <View style={styles.routeDisplayBox}>
        <RouteStepper route={selectedRoute} />
        <SearchPlaceButton />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  routeContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  routeDisplayBox: {
    maxHeight: DIMENSION.HUNDRED_PERCENT,
  },
});

export default RouteDisplay;

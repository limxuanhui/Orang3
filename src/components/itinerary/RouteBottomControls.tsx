import { useCallback } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import type { RouteBottomControlsProps } from './types/types';
import { DIMENSION } from '@constants/dimensions';
import { PALETTE } from '@constants/palette';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import {
  itineraryPlanner_clearRoute,
  itineraryPlanner_deleteRoute,
  itineraryPlanner_setRoute,
  itineraryPlanner_startRouting,
} from '@redux/reducers/itineraryPlannerSlice';

const RouteBottomControls = ({
  isRouted,
  oneRouteLeft,
  routeLength,
}: RouteBottomControlsProps) => {
  const dispatch = useAppDispatch();
  const selectedRoute = useAppSelector(state =>
    state.itineraryPlanner.itinerary.routes.find(
      route => route.id === state.itineraryPlanner.selectedRouteId,
    ),
  );
  const clearButtonIsDisabled = oneRouteLeft && routeLength === 0;
  const routeButtonIsDisabled = routeLength <= 1 || isRouted;
  const clearButtonColor = clearButtonIsDisabled
    ? PALETTE.LIGHTGREY
    : PALETTE.RED;
  const routeButtonColor = routeButtonIsDisabled
    ? PALETTE.LIGHTGREY
    : PALETTE.BLACK;

  const onDeleteRoute = useCallback(() => {
    dispatch(itineraryPlanner_deleteRoute());
  }, [dispatch]);
  const onClearRoute = useCallback(() => {
    dispatch(itineraryPlanner_clearRoute());
  }, [dispatch]);

  const onStartRouting = useCallback(async () => {
    if (selectedRoute) {
      console.log('Starting to route...');
      try {
        const routedRoute = await dispatch(
          itineraryPlanner_startRouting(selectedRoute),
        ).unwrap();

        if (routedRoute) {
          dispatch(itineraryPlanner_setRoute({ route: routedRoute }));
        }
      } catch (err) {
        console.error('An error occured while routing: ', err);
      }
    }
  }, [selectedRoute, dispatch]);

  return (
    <View style={styles.bottomControls}>
      <Pressable
        style={({ pressed }) => [
          styles.bottomControl,
          {
            opacity: pressed ? 0.7 : 1,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          },
        ]}
        onPress={routeLength === 0 ? onDeleteRoute : onClearRoute}
        disabled={clearButtonIsDisabled}>
        <MaterialCommunityIcons
          name="delete-outline"
          size={24}
          color={clearButtonColor}
        />
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          styles.bottomControl,
          {
            opacity: pressed ? 0.7 : 1,
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            borderLeftWidth: 0,
            backgroundColor: routeButtonIsDisabled
              ? PALETTE.OFFWHITE
              : PALETTE.ORANGE,
          },
        ]}
        onPress={onStartRouting}
        disabled={routeButtonIsDisabled}>
        <FontAwesome5 name="route" size={24} color={routeButtonColor} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 36,
    width: DIMENSION.HUNDRED_PERCENT,
    backgroundColor: PALETTE.OFFWHITE,
    borderRadius: 4,
  },
  bottomControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: DIMENSION.HUNDRED_PERCENT,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: PALETTE.LIGHTERGREY,
    backgroundColor: PALETTE.OFFWHITE,
  },
});

export default RouteBottomControls;

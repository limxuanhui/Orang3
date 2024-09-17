import { useCallback, useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { nanoid } from '@reduxjs/toolkit';
import RouteButton from './RouteButton';
import type { RouteControlsProps, Route } from './types/types';
import { DIMENSION } from '@constants/dimensions';
import { PALETTE } from '@constants/palette';
import { useAppDispatch } from '@redux/hooks';
import { itineraryPlanner_openModal } from '@redux/reducers/itineraryPlannerSlice';

const RouteControls = ({ routes, selectedRouteId }: RouteControlsProps) => {
  const dispatch = useAppDispatch();

  const onPressAdd = useCallback(() => {
    dispatch(
      itineraryPlanner_openModal({
        modalType: 'ROUTE_NAME',
        modalInitialValue: '',
      }),
    );
  }, [dispatch]);

  const sliderBorderRightStyle = useMemo(
    () => ({
      borderRightWidth: 1,
      borderRightColor: PALETTE.LIGHTERGREY,
    }),
    [],
  );

  return (
    <View style={styles.routeControls}>
      <View style={styles.routeSliderBox}>
        <ScrollView
          style={[styles.routeSlider, sliderBorderRightStyle]}
          horizontal
          showsHorizontalScrollIndicator={false}>
          {routes.map((route: Route) => (
            <RouteButton
              key={nanoid()}
              route={route}
              selected={route.id === selectedRouteId}
            />
          ))}
        </ScrollView>
      </View>
      <Pressable
        style={({ pressed }) => [
          styles.addButton,
          { opacity: pressed ? 0.7 : 1 },
        ]}
        onPress={onPressAdd}>
        <Ionicons name="add-circle" size={24} color={PALETTE.ORANGE} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  routeControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    width: DIMENSION.HUNDRED_PERCENT,
    marginBottom: 8,
    backgroundColor: PALETTE.OFFWHITE,
    borderRadius: 4,
  },
  routeSliderBox: {
    flex: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: DIMENSION.HUNDRED_PERCENT,
  },
  routeSlider: {
    flexDirection: 'row',
    width: DIMENSION.HUNDRED_PERCENT,
    backgroundColor: PALETTE.OFFWHITE,
    shadowColor: PALETTE.BLACK,
    shadowOpacity: 1,
    shadowOffset: { height: 2, width: 2 },
  },
  addButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RouteControls;

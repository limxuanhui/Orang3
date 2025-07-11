import { useCallback } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import type { RouteButtonProps } from './types/types';
import { DIMENSION } from '../../utils/constants/dimensions';
import { PALETTE } from '../../utils/constants/palette';
import { useAppDispatch, useAppSelector } from '../../utils/redux/hooks';
import {
  itineraryPlanner_openModal,
  itineraryPlanner_selectRoute,
} from '../../utils/redux/reducers/itineraryPlannerSlice';

const RouteButton = ({ route, selected }: RouteButtonProps) => {
  const dispatch = useAppDispatch();
  const { mode } = useAppSelector(state => state.itineraryPlanner);

  const onPress = useCallback(() => {
    if (!selected) {
      dispatch(itineraryPlanner_selectRoute({ selectedRouteId: route.id }));
    }
  }, [selected, dispatch, route.id]);

  const onLongPress = useCallback(() => {
    if (mode === 'EDIT') {
      onPress();
      dispatch(
        itineraryPlanner_openModal({
          modalType: 'ROUTE_NAME',
          modalInitialValue: route.name,
        }),
      );
    }
  }, [route, mode, onPress, dispatch]);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.routeButton,
        {
          opacity: pressed ? 0.7 : 1,
          borderColor: selected ? PALETTE.ORANGE : PALETTE.LIGHTERGREY,
          backgroundColor: selected ? PALETTE.ORANGE : PALETTE.WHITE,
        },
      ]}
      onPress={onPress}
      onLongPress={onLongPress}>
      <Text
        style={[
          styles.routeButtonText,
          { fontWeight: selected ? '700' : 'normal' },
        ]}>
        {route.name}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  routeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: DIMENSION.HUNDRED_PERCENT,
    minWidth: 80,
    marginRight: 4,
    paddingHorizontal: 4,
    borderRadius: 4,
    borderWidth: 1,
  },
  routeButtonText: {
    fontFamily: 'Futura',
  },
});

export default RouteButton;

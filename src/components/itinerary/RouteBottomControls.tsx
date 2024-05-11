import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import type { RouteBottomControlsProps } from './types/types';
import { DIMENSION } from '@constants/dimensions';
import { PALETTE } from '@constants/palette';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import {
  itineraryPlanner_clearRoute,
  itineraryPlanner_deleteRoute,
  itineraryPlanner_reorderRoutes,
  itineraryPlanner_setIsRouting,
  itineraryPlanner_setRoute,
  itineraryPlanner_startRouting,
} from '@redux/reducers/itineraryPlannerSlice';
import {
  writeTale_updateModified,
  writeTale_updateRoutesType,
} from '@redux/reducers/writeTaleSlice';
import GypsieButton from '@components/common/buttons/GypsieButton';
import DeleteOutlineIcon from '@icons/DeleteOutlineIcon';
import RouteIcon from '@icons/RouteIcon';
import Toast from 'react-native-toast-message';
import { TOAST_TITLE_STYLE } from '@constants/constants';

const RouteBottomControls = ({
  isRouted,
  oneRouteLeft,
  routeLength,
}: RouteBottomControlsProps) => {
  const dispatch = useAppDispatch();
  const { mode, changes } = useAppSelector(state => state.writeTale);
  const { itinerary, selectedRouteId, isRouting } = useAppSelector(
    state => state.itineraryPlanner,
  );

  const selectedRoute = itinerary.routes.find(
    route => route.id === selectedRouteId,
  );
  const clearButtonIsDisabled =
    isRouting || (oneRouteLeft && routeLength === 0);
  const routeButtonIsDisabled = isRouting || routeLength <= 1 || isRouted;
  const clearButtonColor = clearButtonIsDisabled
    ? PALETTE.LIGHTGREY
    : PALETTE.RED;
  const routeButtonColor = routeButtonIsDisabled
    ? PALETTE.LIGHTGREY
    : PALETTE.BLACK;

  const onDeleteRoute = useCallback(() => {
    dispatch(itineraryPlanner_deleteRoute());
    dispatch(itineraryPlanner_reorderRoutes());

    if (mode === 'EDIT') {
      if (changes.routes.type !== 'MUTATE') {
        dispatch(writeTale_updateRoutesType({ type: 'MUTATE' }));
      }

      dispatch(
        writeTale_updateModified({
          type: 'ROUTES',
          id: selectedRoute?.id,
          mutateAction: 'DELETE',
        }),
      );
    }
  }, [changes.routes.type, dispatch, mode, selectedRoute?.id]);

  const onClearRoute = useCallback(() => {
    dispatch(itineraryPlanner_clearRoute());

    if (mode === 'EDIT') {
      if (changes.routes.type === 'NONE') {
        dispatch(writeTale_updateRoutesType({ type: 'ONLY_EDITED_ROUTES' }));
      }
      dispatch(
        writeTale_updateModified({ type: 'ROUTES', id: selectedRoute?.id }),
      );
    }
  }, [changes.routes.type, dispatch, mode, selectedRoute?.id]);

  const onStartRouting = useCallback(async () => {
    if (selectedRoute) {
      console.log('Starting to route...');
      dispatch(itineraryPlanner_setIsRouting({ isRouting: true }));
      try {
        const routedRoute = await dispatch(
          itineraryPlanner_startRouting(selectedRoute),
        ).unwrap();

        if (routedRoute) {
          dispatch(itineraryPlanner_setRoute({ route: routedRoute }));
        }
      } catch (err: unknown) {
        const error: Error = err as Error;
        Toast.show({
          type: 'error',
          swipeable: true,
          text1: error.message,
          text1Style: TOAST_TITLE_STYLE,
        });
      }
      dispatch(itineraryPlanner_setIsRouting({ isRouting: false }));
    }
  }, [selectedRoute, dispatch]);

  return (
    <View style={styles.bottomControls}>
      <GypsieButton
        customButtonStyles={[
          styles.bottomControl,
          {
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          },
        ]}
        customIconStyles={{ fontSize: 24, color: clearButtonColor }}
        Icon={DeleteOutlineIcon}
        onPress={routeLength === 0 ? onDeleteRoute : onClearRoute}
        disabled={clearButtonIsDisabled}
      />
      <GypsieButton
        customButtonStyles={[
          styles.bottomControl,
          {
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            borderLeftWidth: 0,
            backgroundColor: routeButtonIsDisabled
              ? PALETTE.OFFWHITE
              : PALETTE.ORANGE,
          },
        ]}
        customIconStyles={{ fontSize: 24, color: routeButtonColor }}
        Icon={RouteIcon}
        onPress={onStartRouting}
        disabled={routeButtonIsDisabled}
        loading={isRouting}
      />
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

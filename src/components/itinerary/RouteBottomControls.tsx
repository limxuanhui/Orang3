import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import type {
  Route,
  RouteBottomControlsProps,
  RouteNode,
  RouteNodeCoord,
} from './types/types';
import { DIMENSION } from '@constants/dimensions';
import { PALETTE } from '@constants/palette';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import {
  itineraryPlanner_clearRoute,
  itineraryPlanner_deleteRoute,
  itineraryPlanner_reorderRoutes,
  itineraryPlanner_setIsRouting,
  itineraryPlanner_setRoute,
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
import { decode, encode } from '@googlemaps/polyline-codec';
import { urlFactory } from '@helpers/factory';
import useAxiosManager from '@hooks/useAxiosManager';

const RouteBottomControls = ({
  isRouted,
  oneRouteLeft,
  routeLength,
}: RouteBottomControlsProps) => {
  const { axiosPrivate } = useAxiosManager();
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

  const onStartRouting = useCallback(
    async (currRoute: Route) => {
      console.log('Data prepared. Beginning to hit api');
      const data = currRoute.routeNodes.map(
        (routeNode: RouteNode) => routeNode.coord,
      );
      const options = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };

      try {
        const directionsResponse = await axiosPrivate.post(
          urlFactory('itinerary-routing'),
          JSON.stringify(data),
          options,
        );

        let orderedRouteNodes: RouteNode[] = [];
        directionsResponse.data.order.forEach((id: number) => {
          const currentNode = currRoute.routeNodes[id];
          if (currentNode) {
            orderedRouteNodes.push(currentNode);
          }
        });
        console.log(directionsResponse.data.order);
        orderedRouteNodes = orderedRouteNodes.map((routeNode, index) => ({
          ...routeNode,
          order: index + 1,
        }));

        let polyline: RouteNodeCoord[] = [];
        console.log('\n======Results======');
        console.log(
          JSON.stringify(directionsResponse.data.directionsResultList, null, 4),
        );
        console.log('\n');
        if (directionsResponse.data.directionsResultList.length === 0) {
          throw new Error('No directions available');
        }

        // Backend will return an array of polylines,
        // where each polyline defines the route between two places
        directionsResponse.data.directionsResultList.forEach(
          (direction: {
            routes: { overviewPolyline: { encodedPath: string } }[];
          }) => {
            // const directionCoords = Polyline.decode(
            const directionCoords = decode(
              direction.routes[0].overviewPolyline.encodedPath,
            ).map((coord: any[]) => ({
              latitude: coord[0],
              longitude: coord[1],
            }));
            // polylines.push(directionCoords) --> multiple polylines, each representing the route between 2 places
            polyline = polyline.concat(directionCoords);
          },
        );

        const encodedPolyline = encode(
          polyline.map(coord => [coord.latitude, coord.longitude]),
        );

        return {
          ...currRoute,
          routeNodes: orderedRouteNodes,
          polyline,
          encodedPolyline,
        };
      } catch (err: unknown) {
        throw err;
      }
    },
    [axiosPrivate],
  );

  const onPressRoute = useCallback(async () => {
    if (selectedRoute) {
      console.log('Starting to route...');
      dispatch(itineraryPlanner_setIsRouting({ isRouting: true }));
      try {
        const routedRoute = await onStartRouting(selectedRoute);

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
  }, [selectedRoute, dispatch, onStartRouting]);

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
        onPress={onPressRoute}
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

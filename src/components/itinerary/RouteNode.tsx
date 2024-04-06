import { useCallback } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import type { RouteNodeProps } from './types/types';
import { DIMENSION } from '@constants/dimensions';
import { PALETTE } from '@constants/palette';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import {
  itineraryPlanner_deletePlace,
  itineraryPlanner_openModal,
  itineraryPlanner_setSelectedRouteNodeId,
} from '@redux/reducers/itineraryPlannerSlice';
import GypsieButton from '../common/buttons/GypsieButton';
import CopyIcon from '../common/icons/CopyIcon';
import Clipboard from '@react-native-clipboard/clipboard';

const RouteNode = ({ routeNode }: RouteNodeProps) => {
  const dispatch = useAppDispatch();
  const { mode } = useAppSelector(state => state.itineraryPlanner);

  const onDeletePlace = useCallback(
    (routeNodeId: string) => {
      dispatch(itineraryPlanner_deletePlace({ routeNodeId }));
    },
    [dispatch],
  );

  const onPressDelete = useCallback(() => {
    onDeletePlace(routeNode.id);
  }, [routeNode, onDeletePlace]);

  const onPressColourTab = useCallback(() => {
    dispatch(
      itineraryPlanner_setSelectedRouteNodeId({
        selectedRouteNodeId: routeNode.id,
      }),
    );
    dispatch(
      itineraryPlanner_openModal({
        modalType: 'COLOUR_PICKER',
        modalInitialValue: routeNode.colour,
      }),
    );
  }, [dispatch, routeNode.id, routeNode.colour]);

  return (
    <View style={styles.routeNode}>
      <Pressable
        style={({ pressed }) => [
          styles.colourTab,
          {
            backgroundColor: routeNode.colour,
            opacity: pressed ? 0.7 : 1,
          },
        ]}
        disabled={mode === 'VIEW'}
        onPress={onPressColourTab}
      />
      <View style={styles.topRow}>
        <Text style={styles.routeNodeName}>{routeNode.name}</Text>
        <Text
          style={[
            styles.routeNodeOpenNow,
            {
              color: routeNode.openNow ? PALETTE.ORANGE : PALETTE.RED,
              fontWeight: routeNode.openNow ? 'bold' : 'bold',
              fontFamily: 'Futura',
              fontSize: 16,
            },
          ]}>
          {routeNode.openNow === true
            ? 'Open'
            : routeNode.openNow === false
            ? 'Closed'
            : ''}
        </Text>
        <GypsieButton
          customButtonStyles={{ width: 20, height: 20 }}
          customIconStyles={{ fontSize: 14, color: PALETTE.DARKGREY }}
          Icon={CopyIcon}
          onPress={() => {
            Clipboard.setString(routeNode.address);
            Alert.alert('Address copied to clipboard');
          }}
        />
      </View>
      <Text style={styles.routeNodeAddress}>{routeNode.address}</Text>
      {mode === 'EDIT' ? (
        <Pressable style={styles.deleteButton} onPress={onPressDelete}>
          <Entypo name="cross" size={16} color={PALETTE.GREY} />
        </Pressable>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  routeNode: {
    minHeight: 55,
    // height: 55,
    justifyContent: 'center',
    width: DIMENSION.HUNDRED_PERCENT,
    marginBottom: 4,
    padding: 8,
    paddingLeft: 16,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: PALETTE.LIGHTGREY,
    backgroundColor: PALETTE.WHITE,
    overflow: 'hidden',
  },
  colourTab: {
    position: 'absolute',
    height: '100%',
    width: 8,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  topRow: {
    flexDirection: 'row',
  },
  routeNodeName: {
    fontSize: 16,
    color: PALETTE.BLACK,
  },
  routeNodeAddress: {
    fontSize: 12,
    color: PALETTE.DARKGREY,
  },
  routeNodeOpenNow: {
    fontSize: 16,
    marginLeft: 8,
  },
  deleteButton: {
    position: 'absolute',
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: 20,
    width: 20,
    borderRadius: 4,
    // marginVertical: 15,
    // backgroundColor:'red'
  },
});

export default RouteNode;

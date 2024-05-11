import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Marker } from 'react-native-maps';
import { MapPinProps } from './types/types';
import { nanoid } from '@reduxjs/toolkit';
import LocationPinIcon from '@icons/LocationPinIcon';
import { PALETTE } from '@constants/palette';

const MapPin = ({ routeNode }: MapPinProps) => {
  return (
    <Marker
      key={nanoid()}
      coordinate={routeNode.coord}
      pinColor={routeNode.colour}
      // title="100m"
      // description="1h"
      // image={}
      // icon={}
      // style={{width:20,height:20}}
      // onPress={onPress}
      // tracksViewChanges={false}
    >
      <View style={styles.routeNodePinWrapper}>
        <LocationPinIcon style={{ color: routeNode.colour, fontSize: 48 }} />
        <View style={styles.routeNodeNumberCircle}>
          {routeNode.order !== -1 ? (
            <Text style={styles.routeNodeNumber}>{routeNode.order}</Text>
          ) : null}
        </View>
      </View>
      {/* <MapCallout style={{ width: 30, height: 40, backgroundColor: "red" }} />
      <Callout style={{ width: 30, height: 40, backgroundColor: "blue" }} /> */}
    </Marker>
  );
};

const styles = StyleSheet.create({
  routeNodePinWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  routeNodeNumberCircle: {
    position: 'absolute',
    top: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#555555',
  },
  routeNodeNumber: {
    color: PALETTE.WHITE,
    fontFamily: 'Futura',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default memo(MapPin);

// const onPress = useCallback(
//   // (event: MapEvent) => {
//   (event: any) => {
//     event.stopPropagation();
//     if (onDeleteMarker) {
//       onDeleteMarker(routeNode.placeId);
//     }
//   },
//   [routeNode, onDeleteMarker],
// );

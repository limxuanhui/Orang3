import { memo, useCallback } from "react";
import { StyleSheet } from "react-native";
// import { MapEvent, Marker } from "react-native-maps";
import { Marker } from "react-native-maps";

const MapPin = ({ routeNode, onDeleteMarker }: any) => {
  const onPress = useCallback(
    // (event: MapEvent) => {
    (event: any) => {
      event.stopPropagation();
      onDeleteMarker(routeNode.placeId);
    },
    [routeNode, onDeleteMarker]
  );

  return (
    <Marker
      key={Math.random()}
      coordinate={routeNode.coord}
      onPress={onPress}
      // tracksViewChanges={false}
    />
  );
};

const styles = StyleSheet.create({});

export default memo(MapPin);

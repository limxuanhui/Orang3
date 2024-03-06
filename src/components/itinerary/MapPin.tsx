import { memo, useCallback } from "react";
import { StyleSheet } from "react-native";
// import { MapEvent, Marker } from "react-native-maps";
import { Marker } from "react-native-maps";
import { MapPinProps } from "./types/types";

const MapPin = ({ routeNode }: MapPinProps) => {
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

  return (
    <Marker
      key={Math.random()}
      coordinate={routeNode.coord}
      // style={{backgroundColor:'blue'}}
      pinColor="plum"
      // onPress={onPress}
      // tracksViewChanges={false}
    />
  );
};

const styles = StyleSheet.create({});

export default memo(MapPin);

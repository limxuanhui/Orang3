import { useCallback } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import type { RouteNodeProps } from "./types/types";
import { DIMENSION } from "../../utils/constants/dimensions";
import { PALETTE } from "../../utils/constants/palette";

const RouteNode = ({ routeNode, onDeletePlace }: RouteNodeProps) => {
  const onPressDelete = useCallback(() => {
    onDeletePlace(routeNode.placeId);
  }, [routeNode, onDeletePlace]);

  return (
    <View style={styles.routeNode}>
      <View style={styles.topRow}>
        <Text style={styles.routeNodeName}>{routeNode.name}</Text>
        <Text
          style={[
            styles.routeNodeOpenNow,
            {
              color: routeNode.openNow ? PALETTE.ORANGE : PALETTE.RED,
              fontWeight: routeNode.openNow ? "bold" : "bold",
              fontFamily: "Futura",
              fontSize: 16,
            },
          ]}>
          {routeNode.openNow === true
            ? "Open"
            : routeNode.openNow === false
            ? "Closed"
            : ""}
        </Text>
      </View>
      <Text style={styles.routeNodeAddress}>{routeNode.address}</Text>
      <Pressable style={styles.deleteButton} onPress={onPressDelete}>
        <Entypo name="cross" size={16} color={PALETTE.GREY} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  routeNode: {
    minHeight: 50,
    width: DIMENSION.HUNDRED_PERCENT,
    marginBottom: 4,
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: PALETTE.LIGHTGREY,
  },
  topRow: {
    flexDirection: "row",
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
    position: "absolute",
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    height: 20,
    width: 20,
    marginVertical: 15,
  },
});

export default RouteNode;

import { useCallback } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import type { RouteNodeProps } from "./types/types";
import { DIMENSION } from "../../utils/constants/dimensions";
import { PALETTE } from "../../utils/constants/palette";
import { useAppDispatch, useAppSelector } from "../../utils/redux/hooks";
import { deletePlace } from "../../utils/redux/reducers/itineraryPlannerSlice";

const RouteNode = ({ routeNode }: RouteNodeProps) => {
  const dispatch = useAppDispatch();
  const { mode } = useAppSelector(state => state.itineraryPlanner);

  const onDeletePlace = useCallback(
    (placeId: string) => {
      dispatch(deletePlace({ placeId }));
    },
    [deletePlace, dispatch],
  );

  const onPressDelete = useCallback(() => {
    onDeletePlace(routeNode.placeId);
  }, [routeNode, onDeletePlace]);

  return (
    <View style={styles.routeNode}>
      <View
        style={{
          position: "absolute",
          height: '100%',
          backgroundColor: "red",
          width: 8,
          borderTopRightRadius: 4,
          borderBottomRightRadius: 4,
        }}
      />
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
      {mode === "edit" ? (
        <Pressable style={styles.deleteButton} onPress={onPressDelete}>
          <Entypo name="cross" size={16} color={PALETTE.GREY} />
        </Pressable>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  routeNode: {
    // minHeight: 50,
    height: 55,
    justifyContent: 'center',
    width: DIMENSION.HUNDRED_PERCENT,
    marginBottom: 4,
    padding: 8,
    paddingLeft: 16,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: PALETTE.LIGHTGREY,
    overflow: "hidden",
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
    borderRadius: 4,
    // marginVertical: 15,
    // backgroundColor:'red'
  },
});

export default RouteNode;

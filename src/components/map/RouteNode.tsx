import { Pressable, StyleSheet, Text, View } from "react-native";
import Entypo from 'react-native-vector-icons/Entypo';

import type { RouteNodeProps } from "../../utils/types/route";

const RouteNode = ({ routeNode, onDeletePlace }: RouteNodeProps) => {
  console.log("===== ", routeNode?.openNow)
  return (
    <View style={styles.routeNode}>
      <View style={styles.topRow}>
        <Text style={styles.routeNodeName}>{routeNode.name}</Text>
        <Text
          style={[
            styles.routeNodeOpenNow,
            { color: routeNode.openNow ? "#2299dd" : "#dd9922" },
          ]}
        >
          {routeNode.openNow === true ? "Open" : routeNode.openNow === false ? "Closed" : ""}
        </Text>
      </View>
      <Text style={styles.routeNodeAddress}>{routeNode.address}</Text>
      <Pressable style={styles.deleteButton} onPress={() => onDeletePlace(routeNode.placeId)} >
      <Entypo name="cross" size={16} color="#888888" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  routeNode: {
    // flexDirection: 'row',
    height: 50,
    width: "100%",
    marginBottom: 4,
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#cccccc",
  },
  topRow: {
    flexDirection: "row",
    // justifyContent: "space-between" ,
    // width: '60%'
  },
  routeNodeName: {
    fontSize: 16,
    color: "#000000",
  },
  routeNodeAddress: {
    fontSize: 12,
    color: "#555555",
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
    marginVertical: 15,
    // backgroundColor: '#ff0000'
  }
});

export default RouteNode;

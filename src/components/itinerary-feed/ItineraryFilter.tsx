import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useCallback } from "react";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { useNavigation } from "@react-navigation/native";
import {
  ItineraryFilterProps,
  MapScreenNavigationProp,
} from "../../utils/types/map";
import { DEVICE_WIDTH } from "../../utils/constants/constants";

const ItineraryFilter = ({ filter }: ItineraryFilterProps) => {
  const navigation = useNavigation<MapScreenNavigationProp>();

  const onPressFilter = useCallback(
    () => navigation.push("itinerary-view"),
    [],
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filter}
        renderItem={item => (
          <Pressable
            style={({ pressed }) => [
              styles.filterTab,
              { opacity: pressed ? 0.7 : 1 },
            ]}
            onPress={onPressFilter}>
            <Text style={styles.filterText}>{item.item}</Text>
          </Pressable>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 10,
  },
  filterTab: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    minWidth: 80,
    marginHorizontal: 4,
    padding: 4,
    borderRadius: 8,
    backgroundColor: "orange",
    shadowColor: "#cccccc",
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: { height: 0, width: 0 },
  },
  filterText: {
    fontSize: 16,
    fontWeight: "normal",
  },
});

export default ItineraryFilter;

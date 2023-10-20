import { useCallback } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import type { ItineraryFilterProps } from "./types/types";
import { DIMENSION } from "../../utils/constants/dimensions";
import { PALETTE } from "../../utils/constants/palette";

const ItineraryFilter = ({ filter }: ItineraryFilterProps) => {
  const onPressFilter = useCallback((item: string) => {
    console.warn(`${item} pressed`);
  }, []);

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
            onPress={() => onPressFilter(item.item)}>
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
    width: DIMENSION.HUNDRED_PERCENT,
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
    backgroundColor: PALETTE.ORANGE,
    shadowColor: PALETTE.LIGHTGREY,
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

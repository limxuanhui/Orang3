import { useCallback } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Feather from "react-native-vector-icons/Feather";
import type { ModalNavigatorNavigationProp } from "../navigators/types/types";
import type { SearchPlaceButtonProps } from "./types/types";
import { DIMENSION } from "../../utils/constants/dimensions";
import { PALETTE } from "../../utils/constants/palette";

const SearchPlaceButton = ({ onAddPlace }: SearchPlaceButtonProps) => {
  const navigation = useNavigation<ModalNavigatorNavigationProp>();

  const onPressSearchPlace = useCallback(() => {
    navigation.navigate("Modal", {
      screen: "PlaceSearch",
      params: { onAddPlace },
    });
  }, [navigation, onAddPlace]);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.searchNavButton,
        { opacity: pressed ? 0.7 : 1 },
      ]}
      onPress={onPressSearchPlace} // Solve non-serializable issue
    >
      <Feather name="search" size={24} color={PALETTE.BLACK} />
      <Text>Search for place</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  searchNavButton: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 40,
    width: DIMENSION.HUNDRED_PERCENT,
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: PALETTE.LIGHTGREY,
  },
});

export default SearchPlaceButton;

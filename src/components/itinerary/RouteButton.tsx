import { useCallback } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import type { RouteButtonProps } from "./types/types";
import { DIMENSION } from "../../utils/constants/dimensions";
import { PALETTE } from "../../utils/constants/palette";

const RouteButton = ({
  route,
  selected,
  onHoldRoute,
  onSelectRoute,
}: RouteButtonProps) => {
  const onPress = useCallback(() => {
    if (!selected) {
      onSelectRoute(route.id);
    }
  }, [route, selected, onSelectRoute]);

  const onLongPress = useCallback(() => {
    onPress();
    onHoldRoute(route.name);
  }, [route, onHoldRoute, onPress]);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.routeButton,
        {
          opacity: pressed ? 0.7 : 1,
          borderColor: selected ? PALETTE.ORANGE : PALETTE.LIGHTERGREY,
          backgroundColor: selected ? PALETTE.ORANGE : PALETTE.WHITE,
        },
      ]}
      onPress={onPress}
      onLongPress={onLongPress}>
      <Text
        style={[
          styles.routeButtonText,
          { fontWeight: selected ? "700" : "normal" },
        ]}>
        {route.name}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  routeButton: {
    justifyContent: "center",
    alignItems: "center",
    height: DIMENSION.HUNDRED_PERCENT,
    minWidth: 80,
    marginRight: 4,
    paddingHorizontal: 4,
    borderRadius: 4,
    borderWidth: 1,
  },
  routeButtonText: {
    fontFamily: "Futura",
  },
});

export default RouteButton;

import { Pressable, StyleSheet, Text, View } from "react-native";
import type { RouteInfo } from "../../utils/types/route";

type RouteButtonProps = {
  route: RouteInfo;
  selected: boolean;
  onSelectRoute: (routeId: string) => void;
  onHoldRoute: (routeName: string) => void;
};

const RouteButton = ({
  route,
  selected,
  onHoldRoute,
  onSelectRoute,
}: RouteButtonProps) => {
  const onPress = () => {
    if (!selected) {
      onSelectRoute(route.id);
    }
  };

  const onLongPress = () => {
    onPress();
    onHoldRoute(route.name);
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.routeButton,
        {
          opacity: pressed ? 0.7 : 1,
          borderColor: selected ? "#0000ff" : "#cccccc",
          // backgroundColor: selected ? "#eeeeee" : "#ffffff",
        },
      ]}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <Text>{route.name}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  routeButton: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    minWidth: 80,
    marginRight: 4,
    paddingHorizontal: 4,
    borderRadius: 4,
    borderWidth: 1,
  },
});

export default RouteButton;

import { StyleSheet, Text, View } from "react-native";
import { DIMENSION } from "../../utils/constants/dimensions";
import { PALETTE } from "../../utils/constants/palette";

enum Thickness {
  "thin",
  "normal",
  "thick",
}

enum Shade {
  "light",
  "normal",
  "dark",
}

type DividerProps = {
  thickness?: "thin" | "normal" | "thick";
  shade?: "light" | "normal" | "dark";
};

const Divider = ({ thickness = "normal", shade = "normal" }: DividerProps) => {
  const height = thickness === "thin" ? 1 : thickness === "thick" ? 3 : 2;
  const backgroundColor =
    shade === "light"
      ? PALETTE.LIGHTGREY
      : shade === "dark"
      ? PALETTE.DARKGREY
      : PALETTE.GREY;

  return <View style={[styles.divider, { height, backgroundColor }]} />;
};

const styles = StyleSheet.create({
  divider: {
    width: DIMENSION.HUNDRED_PERCENT,
  },
});

export default Divider;

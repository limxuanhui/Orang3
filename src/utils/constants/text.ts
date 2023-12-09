import { StyleProp, TextStyle } from "react-native";
import { PALETTE } from "./palette";

export const storyTitleStyle: StyleProp<TextStyle> = {
  fontFamily: "Futura",
  fontSize: 24,
  fontWeight: "bold",
  color: PALETTE.GREYISHBLUE,
  backgroundColor: PALETTE.OFFWHITE,
};

export const storyBodyStyle: StyleProp<TextStyle> = {
  fontFamily: "Futura",
  fontSize: 16,
  fontWeight: "normal",
  color: PALETTE.GREYISHBLUE,
};

import { StyleProp, TextStyle, ViewStyle } from "react-native";

export type GypsieButtonProps = {
  customButtonStyles?: StyleProp<ViewStyle>;
  customTextStyles?: StyleProp<TextStyle>;
  customIconStyles?: StyleProp<TextStyle>;
  icon?: string;
  text?: string;
  loading?: boolean;
  onPress: () => void;
};

export type LinkButtonProps = {
  customLinkButtonStyles?: StyleProp<TextStyle>;
  customLinkTextStyles?: StyleProp<TextStyle>;
  text: string;
  onPress: () => void;
};

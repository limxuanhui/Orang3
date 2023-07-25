import { Pressable, StyleSheet, Text } from "react-native";
import type { LinkButtonProps } from "./types/types";
import { GYPSIE_THEME } from "../../../utils/constants/palette";

const LinkButton = ({
  customLinkButtonStyles,
  customLinkTextStyles,
  text,
  onPress,
}: LinkButtonProps) => {
  return (
    <Pressable
      style={({ pressed }) => [
        { opacity: pressed ? 0.7 : 1 },
        styles.linkButton,
        customLinkButtonStyles,
      ]}
      onPress={onPress}>
      <Text style={[styles.linkText, customLinkTextStyles]}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  linkButton: {},
  linkText: {
    color: GYPSIE_THEME.SECONDARY,
    fontWeight: "bold",
  },
});

export default LinkButton;

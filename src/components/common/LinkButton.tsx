import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
} from "react-native";
import { GYPSIE_THEME } from "../../utils/constants/palette";

type LinkButtonProps = {
  customLinkButtonStyles?: StyleProp<TextStyle>;
  customLinkTextStyles?: StyleProp<TextStyle>;
  text: string;
  onPress: () => void;
};

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
  linkButton: {
    // borderWidth: 1,
    // borderColor: "#000",
  },
  linkText: {
    color: GYPSIE_THEME.SECONDARY,
    fontWeight: "bold",
  },
});

export default LinkButton;

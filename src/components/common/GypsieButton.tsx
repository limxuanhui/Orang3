import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

type GypsieButtonProps = {
  customButtonStyles?: StyleProp<ViewStyle>;
  customTextStyles?: StyleProp<TextStyle>;
  customIconStyles?: StyleProp<TextStyle>;
  icon?: string;
  text: string;
  loading?: boolean;
  onPress: () => void;
};

const GypsieButton = ({
  customButtonStyles,
  customTextStyles,
  customIconStyles,
  loading,
  icon,
  text,
  onPress,
}: GypsieButtonProps) => {
  return (
    <Pressable
      style={({ pressed }) => [
        { opacity: pressed ? 0.7 : 1 },
        styles.defaultButtonStyles,
        customButtonStyles,
      ]}
      disabled={loading}
      onPress={onPress}>
      {icon && (
        <Icon name={icon} style={[styles.icon, customIconStyles]} size={20} />
      )}
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Text style={[styles.defaultTextStyles, customTextStyles]}>{text}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  defaultButtonStyles: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    borderRadius: 4,
  },
  defaultTextStyles: {},
  icon: {
    position: "absolute",
    top: 10,
    left: 20,
    zIndex: 1,
  },
});

export default GypsieButton;

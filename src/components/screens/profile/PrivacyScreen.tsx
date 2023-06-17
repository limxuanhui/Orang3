import { StyleSheet, Text, View } from "react-native";
import {
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
} from "../../../utils/constants/constants";
import { PALETTE } from "../../../utils/constants/palette";

const PrivacyScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Privacy settings</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
    backgroundColor: PALETTE.OFFWHITE,
  },
});

export default PrivacyScreen;

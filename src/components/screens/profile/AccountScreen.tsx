import { StyleSheet, Text, View } from "react-native";
import {
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
} from "../../../utils/constants/constants";
import { PALETTE } from "../../../utils/constants/palette";

const AccountScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Phone number</Text>
      <Text>Email</Text>
      <Text>Password</Text>
      <Text>Date of birth</Text>
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

export default AccountScreen;

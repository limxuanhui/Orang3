import { StyleSheet, View } from "react-native";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../utils/constants/constants";
import { PALETTE } from "../../utils/constants/palette";
import { PropsWithChildren } from "react";

type EmptyFeedProps = {};

const EmptyFeed = ({ children }: PropsWithChildren<EmptyFeedProps>) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
    backgroundColor: PALETTE.BLACK,
  },
});

export default EmptyFeed;

import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { FeedDescriptionProps } from "./types/types";
import { DIMENSION } from "../../utils/constants/dimensions";
import { PALETTE } from "../../utils/constants/palette";

const FeedDescription = ({ handle, caption }: FeedDescriptionProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.descriptionBox, { bottom: insets.bottom + 50 }]}>
      <View style={styles.handleBox}>
        <Text style={styles.handle}>{handle}</Text>
      </View>
      <View style={styles.captionBox}>
        <Text style={styles.caption}>{caption}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  descriptionBox: {
    justifyContent: "space-evenly",
    position: "absolute",
    minHeight: DIMENSION.FIFTEEN_PERCENT,
    width: DIMENSION.SEVENTY_PERCENT,
    paddingHorizontal: 16,
    zIndex: 1,
    // borderWidth: 1,
    // borderColor: 'red'
  },
  handleBox: {},
  handle: {
    fontSize: 16,
    fontWeight: "600",
    color: PALETTE.WHITE,
  },
  captionBox: {},
  caption: {
    color: PALETTE.OFFWHITE,
  },
  soundTrackBox: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  soundTrack: {
    color: PALETTE.WHITE,
  },
});

export default FeedDescription;

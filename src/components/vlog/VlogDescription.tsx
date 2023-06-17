import { StyleSheet, Text, View } from "react-native";
// import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import { VlogDescriptionProps } from "../../utils/types/vlog";

const VlogDescription = ({
  handle,
  caption,
  soundTrack,
}: VlogDescriptionProps) => {
  // const TAB_BAR_HEIGHT: number = useBottomTabBarHeight();
  const TAB_BAR_HEIGHT: number = 100;

  return (
    <View style={[styles.descriptionBox, { bottom: TAB_BAR_HEIGHT }]}>
      <View style={styles.handleBox}>
        <Text style={styles.handle}>{handle}</Text>
      </View>
      <View style={styles.captionBox}>
        <Text style={styles.caption}>{caption}</Text>
      </View>
      {/* <View style={styles.soundTrackBox}>
        <Ionicons name="md-musical-notes" size={24} color="#ffffff" />
        <Text style={styles.soundTrack}>{soundTrack}</Text>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  descriptionBox: {
    justifyContent: "space-evenly",
    position: "absolute",
    height: "15%",
    width: "100%",
    padding: 16,
    zIndex: 1,
    // borderWidth: 1,
    // borderColor: 'red'
  },
  handleBox: {},
  handle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
  captionBox: {},
  caption: {
    color: "#ffffff",
  },
  soundTrackBox: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  soundTrack: {
    color: "#ffffff",
  },
});

export default VlogDescription;

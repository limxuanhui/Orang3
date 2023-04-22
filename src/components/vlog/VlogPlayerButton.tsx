import { useCallback } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import FontIcon from "react-native-vector-icons/FontAwesome5";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../utils/constants/constants";
import { VlogPlayerStatus } from "../../utils/types/vlog";

type VlogPlayerButtonProps = {
  status: VlogPlayerStatus;
  togglePlay: () => Promise<void>;
};

const VlogPlayerButton = ({ status, togglePlay }: VlogPlayerButtonProps) => {
  const renderIcon = useCallback((status: VlogPlayerStatus) => {
    if (status === VlogPlayerStatus.BUFFERING) {
      return <ActivityIndicator size={30} color="#ffffff" />;
    } else if (status === VlogPlayerStatus.PLAYING) {
      return <FontIcon name="pause" size={100} color="#ffffff" />;
    } else if (status === VlogPlayerStatus.PAUSED) {
      return <Icon name="play" size={30} color="#ffffff" />;
    } else if (status === "Ended") {
      return <Icon name="replay" size={30} color="#ffffff" />;
    }
  }, []);

  return status === VlogPlayerStatus.PLAYING ? (
    <Pressable style={styles.playCover} onPress={togglePlay} />
  ) : (
    <Pressable
      style={({ pressed }) => [
        { opacity: pressed ? 0.7 : 1 },
        styles.pauseCover,
      ]}
      onPress={status === VlogPlayerStatus.BUFFERING ? null : togglePlay}>
      {renderIcon(status)}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  playCover: {
    position: "absolute",
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
    zIndex: 99,
    // borderWidth: 1,
    // borderColor: "red",
  },
  pauseCover: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
    zIndex: 99,
    // borderWidth: 1,
    // borderColor: "blue",
  },
});

export default VlogPlayerButton;

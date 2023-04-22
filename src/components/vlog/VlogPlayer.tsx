import { useCallback, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Video from "react-native-video";

import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../utils/constants/constants";
import { VlogPlayerProps, VlogPlayerStatus } from "../../utils/types/vlog";
import VlogDescription from "./VlogDescription";
import VlogPlayerButton from "./VlogPlayerButton";
import VlogPlayerSlider from "./VlogPlayerSlider";
import VlogReactionControls from "./VlogReactionControls";

const VlogPlayer = ({ vlog, shouldPlay }: VlogPlayerProps) => {
  const { uri } = vlog;

  const [status, setStatus] = useState<VlogPlayerStatus>(
    VlogPlayerStatus.PLAYING,
  );

  const [value, setValue] = useState<number>(0);
  const [maxValue, setMaxValue] = useState<number>(0);

  const togglePlay = useCallback(async () => {
    if (status === VlogPlayerStatus.PAUSED) {
      setStatus(VlogPlayerStatus.PLAYING);
    } else {
      setStatus(VlogPlayerStatus.PAUSED);
    }
  }, [status, setStatus]);

  return (
    <View style={styles.container}>
      <Video
        style={styles.video}
        source={{ uri }}
        paused={!shouldPlay || status === VlogPlayerStatus.PAUSED}
        controls={false}
        repeat
        // muted
        resizeMode="contain"
        onProgress={data => {
          console.log(data);
          setValue(data.currentTime);
          // find a better way to fix max duration
          setMaxValue(data.playableDuration);
        }}
        // onBuffer={}
        // onEnd
        // onError
      />
      <VlogPlayerButton status={status} togglePlay={togglePlay} />
      <VlogPlayerSlider value={value} maxValue={maxValue} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
  },
  video: {
    height: "100%",
    width: "100%",
    backgroundColor: "#000000",
  },
});

export default VlogPlayer;

import { useCallback, useState } from "react";
import { StyleSheet,View } from "react-native";
import Video from "react-native-video";
import VlogPlayerButton from "./VlogPlayerButton";
import VlogPlayerSlider from "./VlogPlayerSlider";
import { type VlogPlayerProps, VlogPlayerStatus } from "./types/types";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../utils/constants/constants";
import { DIMENSION } from "../../utils/constants/dimensions";
import { PALETTE } from "../../utils/constants/palette";

const VlogPlayer = ({ vlog, shouldPlay }: VlogPlayerProps) => {
  const { media } = vlog;
  console.log("Vlog player: ", media )
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
        source={{ uri: media?.uri }}
        paused={!shouldPlay || status === VlogPlayerStatus.PAUSED}
        controls={false}
        repeat
        // muted
        resizeMode="contain"
        onProgress={data => {
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
    height: DIMENSION.HUNDRED_PERCENT,
    width: DIMENSION.HUNDRED_PERCENT,
    backgroundColor: PALETTE.BLACK,
  },
});

export default VlogPlayer;

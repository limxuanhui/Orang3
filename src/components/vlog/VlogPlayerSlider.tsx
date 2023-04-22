import { StyleSheet, Text, View } from "react-native";
import { Slider } from "@miblanchard/react-native-slider";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

type VlogPlayerSliderProps = {
  value: number;
  maxValue: number;
};

const VlogPlayerSlider = ({ value, maxValue }: VlogPlayerSliderProps) => {
  const BOTTOM_TAB_BAR_HEIGHT = useBottomTabBarHeight();

  return (
    <View style={[styles.container, { bottom: BOTTOM_TAB_BAR_HEIGHT + 20 }]}>
      <Slider
        containerStyle={styles.container}
        trackStyle={styles.track}
        value={value}
        maximumValue={maxValue}
        minimumTrackTintColor="orange"
        maximumTrackTintColor="grey"
        thumbStyle={styles.thumb}
        trackClickable
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    // height: 20,
    width: "100%",
    zIndex: 999999,
    // borderWidth: 1,
    // borderColor: "green",
    // backgroundColor: '#00ffff2e'
  },
  track: {
    // zIndex: 10000,
    // backgroundColor: "red",
    // borderWidth: 1,
    borderColor: "blue",
  },
  thumb: {
    height: 15,
    width: 15,
  },
});

export default VlogPlayerSlider;

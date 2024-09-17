import { StyleSheet, View } from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';
import type { VlogPlayerSliderProps } from './types/types';
import { PALETTE } from '@constants/palette';

const VlogPlayerSlider = ({
  value,
  maxValue,
  scrubVideo,
}: VlogPlayerSliderProps) => {
  // const BOTTOM_TAB_BAR_HEIGHT = useBottomTabBarHeight();
  const BOTTOM_TAB_BAR_HEIGHT = 80;

  return (
    <View style={[styles.container, { bottom: BOTTOM_TAB_BAR_HEIGHT + 20 }]}>
      <Slider
        containerStyle={styles.container}
        trackStyle={styles.track}
        thumbStyle={styles.thumb}
        value={value}
        maximumValue={maxValue}
        maximumTrackTintColor={PALETTE.DARKGREY}
        minimumTrackTintColor={PALETTE.ORANGE}
        trackClickable
        onValueChange={scrubVideo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    zIndex: 999999,
  },
  track: {},
  thumb: {
    height: 15,
    width: 15,
  },
});

export default VlogPlayerSlider;

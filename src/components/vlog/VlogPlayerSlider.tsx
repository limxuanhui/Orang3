import { StyleSheet, View } from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';
import type { VlogPlayerSliderProps } from './types/types';

const VlogPlayerSlider = ({ value, maxValue }: VlogPlayerSliderProps) => {
  // const BOTTOM_TAB_BAR_HEIGHT = useBottomTabBarHeight();
  const BOTTOM_TAB_BAR_HEIGHT = 80;

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
    position: 'absolute',
    width: '100%',
    zIndex: 999999,
  },
  track: {
    borderColor: 'blue',
  },
  thumb: {
    height: 15,
    width: 15,
  },
});

export default VlogPlayerSlider;

import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { DEVICE_WIDTH } from '../../../utils/constants/constants';

const Sun = () => {
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateZ: `${rotation.value}deg`,
        },
      ],
    };
  }, [rotation.value]);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 36000, easing: Easing.linear }),
      -1,
    );
  }, [rotation]);

  return (
    <Animated.Image
      style={[styles.sun, animatedStyle]}
      source={{
        uri: '/Users/limxuanhui/bluextech/gypsie/assets/images/sun_design3.png',
      }}
      resizeMode="contain"
    />
  );
};

const styles = StyleSheet.create({
  sun: {
    position: 'absolute',
    top: -DEVICE_WIDTH * 0.4,
    right: -DEVICE_WIDTH * 0.4,
    width: DEVICE_WIDTH * 0.8,
    height: DEVICE_WIDTH * 0.8,
  },
});

export default Sun;

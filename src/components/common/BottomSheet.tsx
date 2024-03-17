import { forwardRef, useCallback, useEffect, useImperativeHandle } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../../utils/constants/constants';

type BottomSheetProps = {
  children?: React.ReactNode;
  height: number;
  width: number;
  maxTranslateY: number;
};

export type BottomSheetRefProps = {
  scrollTo: (destination: number, damping?: number) => void;
};

const BottomSheet = forwardRef<BottomSheetRefProps, BottomSheetProps>(
  ({ children, height, width, maxTranslateY }, ref) => {
    const translateY = useSharedValue<number>(0);
    const context = useSharedValue({ y: 0 });

    const scrollTo = useCallback(
      (destination: number): void => {
        'worklet';
        translateY.value = withSpring(destination, {
          dampingRatio: 1,
          duration: 1000,
        });
        // translateY.value = Math.max(translateY.value, maxTranslateY);
      },
      [translateY],
    );

    useImperativeHandle(ref, () => ({ scrollTo }), [scrollTo]);
    const STATUS_BAR_HEIGHT = getStatusBarHeight();

    const gesture = Gesture.Pan()
      .onStart(() => {
        context.value = { y: translateY.value };
      })
      .onUpdate(event => {
        translateY.value = event.translationY + context.value.y;
        translateY.value = Math.max(translateY.value, maxTranslateY);
      })
      .onEnd(() => {
        if (translateY.value > -DEVICE_HEIGHT / 4) {
          scrollTo(DEVICE_HEIGHT);
        } else if (
          translateY.value < -DEVICE_HEIGHT / 4 &&
          translateY.value > -DEVICE_HEIGHT / 3
        ) {
          scrollTo(-DEVICE_HEIGHT / 4);
        } else if (
          translateY.value > -DEVICE_HEIGHT / 2 &&
          translateY.value < -DEVICE_HEIGHT / 3
        ) {
          scrollTo(-DEVICE_HEIGHT / 2);
        } else {
          scrollTo(maxTranslateY);
        }
      });

    const animationStyles = useAnimatedStyle(() => {
      const borderRadius = interpolate(
        translateY.value,
        [maxTranslateY + DEVICE_HEIGHT / 5, maxTranslateY + STATUS_BAR_HEIGHT],
        [25, 5],
        Extrapolate.CLAMP,
      );
      const animatedWidth = interpolate(
        translateY.value,
        [maxTranslateY + DEVICE_HEIGHT / 5, maxTranslateY + STATUS_BAR_HEIGHT],
        [width, DEVICE_WIDTH],
        Extrapolate.CLAMP,
      );
      return {
        borderTopLeftRadius: borderRadius,
        borderTopRightRadius: borderRadius,
        width: animatedWidth,
        transform: [{ translateY: translateY.value }],
      };
    });

    useEffect(() => {
      scrollTo(-DEVICE_HEIGHT / 4);
    }, [scrollTo]);

    return (
      <Animated.View
        style={[styles.bottomSheet, animationStyles, { height, width }]}>
        <GestureDetector gesture={gesture}>
          <Pressable
            style={({ pressed }) => [
              styles.panLineBox,
              { opacity: pressed ? 0.7 : 1 },
            ]}>
            <View style={styles.panLine} />
          </Pressable>
        </GestureDetector>
        {children}
      </Animated.View>
    );
  },
);

const styles = StyleSheet.create({
  bottomSheet: {
    position: 'absolute',
    alignSelf: 'center',
    top: DEVICE_HEIGHT,
    padding: 20,
    paddingBottom: 0,
    backgroundColor: '#ffffff',
    shadowColor: '#888888',
    shadowOpacity: 0.6,
    shadowOffset: { height: 2, width: 0 },
    zIndex: 2,
  },
  panLineBox: {
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: 20,
    width: '100%',
  },
  panLine: {
    height: 4,
    width: 75,
    borderRadius: 2,
    backgroundColor: '#aaaaaa',
  },
});

export default BottomSheet;

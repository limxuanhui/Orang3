import { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const GypsieSkeleton = () => {
  const opacity = useSharedValue<number>(1);

  const opacityStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  }, [opacity]);

  useEffect(() => {
    opacity.value = withRepeat(withTiming(0.7, { duration: 1000 }), -1, true);
  }, [opacity]);

  return <Animated.View style={[styles.container, opacityStyle]} />;
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#b6c0ca" },
});

export default GypsieSkeleton;

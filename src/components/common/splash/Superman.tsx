import { useEffect } from "react";
import { Animated, Image, StyleSheet, Text, View } from "react-native";
import { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import type { SupermanProps } from "./types/types";
import { DEVICE_HEIGHT } from "../../../utils/constants/constants";

const Superman = ({ progress }: SupermanProps) => {
  const translateX = useSharedValue(-100);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
      ],
    };
  }, [translateX.value]);

  useEffect(() => {
    console.log("Progress: " + progress);
    // translateX.value =
  }, [progress]);

  return (
    <Animated.Image
      style={[styles.superman, animatedStyle]}
      source={{
        uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/superman.png",
      }}
    />
  );
};

const styles = StyleSheet.create({
  superman: {
    position: "absolute",
    // left: -100,
    bottom: DEVICE_HEIGHT / 3,
    height: 50,
    width: 100,
    borderWidth: 1,
    borderColor: "green",
  },
});

export default Superman;

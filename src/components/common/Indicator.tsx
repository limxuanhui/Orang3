import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { interpolate, useAnimatedStyle } from "react-native-reanimated";
import { DEVICE_WIDTH } from "../../utils/constants/constants";
import AnimatedDot from "./AnimatedDot";
import Dot from "./Dot";
import IndicatorDot from "./IndicatorDot";

type IndicatorProps = {
  scrollX: any;
  dataCount: number;
  activeIndex: number;
};

const Indicator = ({ scrollX, dataCount, activeIndex }: IndicatorProps) => {
  const BOTTOM_TAB_BAR_HEIGHT = useBottomTabBarHeight();
  // If dataCount == 6, we have 5 dots when (activeIndex <= 3  or activeIndex >= 4) and (anchor = 0)
  // When anchor = 0, we have first/last 3 dots of BIG size, second last MID, last SMALL
  // When anchor = 1, we have end dot become MID then SMALL then disappear
  // Switch anchor from 1 to 0 when activeIndex reaches first/last dot
  // Switch anchor from 0 to 1 when activeIndex > 3 or < end - 2

  // If dataCount == 6, we have  dots when (activeIndex <= 3  or activeIndex >= 4) and (anchor = 0)

  return (
    <View style={[styles.indicator, { bottom: BOTTOM_TAB_BAR_HEIGHT + 50 }]}>
      <Animated.View style={styles.indicatorDot}></Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  indicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "red",
  },
  indicator: {
    position: "absolute",
    flexDirection: "row",
    alignSelf: "center",
    // bottom: 100,
    borderWidth: 1,
    borderColor: "green",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    // alignItems: "center",
    position: "absolute",
    // zIndex: 100,
    flexDirection: "row",
    alignSelf: "center",
    bottom: 100,
    borderWidth: 1,
    borderColor: "green",
    justifyContent: "center",
    alignItems: "center",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  animatedDotContainer: {
    width: 8,
    height: 8,
    marginRight: 12,
    borderRadius: 4,
    backgroundColor: "#EBEEF2",
  },
  animatedDotsContainer: {
    width: 88,
    height: 8,
    overflow: "hidden",
    flexDirection: "row",
  },
  dotContainer: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#EBEEF2",
  },
  activeDot: {
    flex: 1,
    borderRadius: 4,
    backgroundColor: "#8F9499",
  },
  animatedDotsView: {
    height: 8,
    flexDirection: "row",
  },
});

export default Indicator;

//   const dots =
//     dataCount <= 5 ? new Array(dataCount).fill(true) : new Array(6).fill(true);

//   return (
//     <View style={[styles.indicator, {bottom: BOTTOM_TAB_BAR_HEIGHT + 10}]}>
//       {dots.map((_, i) => {
//         return (
//           <View
//             key={`indicator-${i}`}
//             style={{
//               height: i == 5 ? 6 : 8,
//               width: i == 5 ? 6 : 8,
//               borderRadius: i == 5 ? 3 : 4,
//               backgroundColor: i == activeIndex ? "orange" : "grey",
//               margin: 4,
//             }}
//           />
//         );
//       })}
//     </View>
//   );

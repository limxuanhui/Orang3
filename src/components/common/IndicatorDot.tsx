import { StyleSheet, Text, useAnimatedValue, View } from "react-native";
import Animated from "react-native-reanimated";

type IndicatorDotProps = {
  index: number;
  anchor: number;
  color: string;
  active: boolean;
};

const IndicatorDot = ({ index, anchor, color, active }: IndicatorDotProps) => {
    // const translateX = useAnimatedValue(0);
    // if (anchor == -1) {
    //     translateX = Animated.timing(100, translateX.interpolate())
    // } else if (anchor == 0) {

    // } else {
        
    // }
  return <Animated.View style={styles.indicatorDot}></Animated.View>;
};

export default IndicatorDot;

const styles = StyleSheet.create({
    indicatorDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'red',        
    }
});

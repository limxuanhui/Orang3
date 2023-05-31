import { StyleSheet, Text, View } from "react-native";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../utils/constants/constants";
import { PALETTE } from "../../utils/constants/palette";

const Ruler = () => {
  return (
    <>
      <View style={[styles.rulerLine, { top: DEVICE_HEIGHT / 5 }]}>
        <Text style={styles.rulerMark}>1/5</Text>
      </View>
      <View style={[styles.rulerLine, { top: DEVICE_HEIGHT / 4 }]}>
        <Text style={styles.rulerMark}>1/4</Text>
      </View>
      <View style={[styles.rulerLine, { top: DEVICE_HEIGHT / 3 }]}>
        <Text style={styles.rulerMark}>1/3</Text>
      </View>
      <View style={[styles.rulerLine, { top: 2*DEVICE_HEIGHT / 5 }]}>
        <Text style={styles.rulerMark}>2/5</Text>
      </View>
      <View style={[styles.rulerLine, { top: DEVICE_HEIGHT / 2 }]}>
        <Text style={styles.rulerMark}>1/2</Text>
      </View>
      <View style={[styles.rulerLine, { top: 3*DEVICE_HEIGHT / 5 }]}>
        <Text style={styles.rulerMark}>3/5</Text>
      </View>
      <View style={[styles.rulerLine, { top: (2 * DEVICE_HEIGHT) / 3 }]}>
        <Text style={styles.rulerMark}>2/3</Text>
      </View>
      <View style={[styles.rulerLine, { top: (3 * DEVICE_HEIGHT) / 4 }]}>
        <Text style={styles.rulerMark}>3/4</Text>
      </View>
      <View style={[styles.rulerLine, { top: (4 * DEVICE_HEIGHT) / 5 }]}>
        <Text style={styles.rulerMark}>4/5</Text>
      </View>
    </>
  );
};

export default Ruler;

const styles = StyleSheet.create({
  rulerLine: {
    position:'absolute',
    height: 2,
    width: DEVICE_WIDTH,
    backgroundColor: PALETTE.GREY,
  },
  rulerMark: {
    position: "absolute",
    top: -25,
    fontSize: 20,
    fontWeight: "900",
    color: PALETTE.DARKGREY,
  },
});

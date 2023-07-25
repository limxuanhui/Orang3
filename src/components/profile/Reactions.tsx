// import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { DIMENSION } from "../../utils/constants/dimensions";
import { PALETTE } from "../../utils/constants/palette";

const Reactions = () => {
  // const BOTTOM_TAB_BAR_HEIGHT = useBottomTabBarHeight();
  const BOTTOM_TAB_BAR_HEIGHT = 100;
  const percentage =
    Math.round(
      100 - (BOTTOM_TAB_BAR_HEIGHT / Dimensions.get("window").height) * 100,
    ).toString() + "%";
  const percentage2 = 0.62 * Dimensions.get("window").height;
  return (
    <View style={[styles.container, { height: percentage2 - 60 }]}>
      <View style={styles.section}>
        <View style={styles.sectionIcon}>
          <FontAwesome
            // style={}
            name="heart"
            size={24}
            color={PALETTE.RED}
          />
        </View>
        <Text style={styles.tempText}>LIKES</Text>
      </View>
      <View style={styles.section}>
        <View style={styles.sectionIcon}>
          <FontAwesome name="commenting" size={24} color={PALETTE.BLACK} />
        </View>

        <Text style={styles.tempText}>COMMENTS</Text>
      </View>
      <View style={styles.section}>
        <View style={styles.sectionIcon}>
          <FontAwesome name="share" size={24} color="#ffffff" />
        </View>
        <Text style={styles.tempText}>SHARES</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // height: DIMENSION.HUNDRED_PERCENT,
    // width: DIMENSION.HUNDRED_PERCENT,
    // flex:1,
    // borderWidth: 2,
    // borderColor: "red",
  },
  section: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // height: 100,
    // width: DIMENSION.HUNDRED_PERCENT,
    // marginTop: 20,
    borderWidth: 1,
    borderColor: "green",
  },
  sectionIcon: {
    position: "absolute",    
    right: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  tempText: {
    fontSize: 30,
    fontWeight: "900",
    color: PALETTE.GREY,
  },
});

export default Reactions;

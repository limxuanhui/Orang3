import { StyleSheet, Text, View } from "react-native";
import { PALETTE } from "../../utils/constants/palette";

const ItineraryTableHeader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerTextBox}>
        <Text style={{ fontWeight: "bold", color: PALETTE.BLACK }}>
          Destination
        </Text>
        <Text style={{ color: PALETTE.DARKGREY }}>{"Singapore"}</Text>
      </View>
      <View style={styles.headerTextBox}>
        <Text style={{ fontWeight: "bold", color: PALETTE.BLACK }}>From</Text>
        <Text style={{ color: PALETTE.DARKGREY }}>{"2023.08.12"}</Text>
      </View>
      <View style={styles.headerTextBox}>
        <Text style={{ fontWeight: "bold", color: PALETTE.BLACK }}>To</Text>
        <Text style={{ color: PALETTE.DARKGREY }}>{"2023.08.17"}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 0.2,
    borderColor: PALETTE.GREY,
    padding: 8,
  },
  headerTextBox: {
    padding: 8,
  },
});

export default ItineraryTableHeader;

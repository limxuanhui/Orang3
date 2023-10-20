import { StyleSheet, View } from "react-native";
import ItineraryTableHeader from "./ItineraryTableHeader";
import ItineraryTableBody from "./ItineraryTableBody";
import ItineraryTableFooter from "./ItineraryTableFooter";
import { DIMENSION } from "../../utils/constants/dimensions";
import { PALETTE } from "../../utils/constants/palette";
import { ItineraryTableProps } from "./types/types";

const ItineraryTable = ({ data, clearDataHandler }: ItineraryTableProps) => {
  return (
    <View style={styles.container}>
      <ItineraryTableHeader />
      {data.length > 0 ? <ItineraryTableBody data={data} /> : null}
      <ItineraryTableFooter clearDataHandler={clearDataHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: DIMENSION.HUNDRED_PERCENT,
    marginVertical: 8,
    borderRadius: 16,
    backgroundColor: PALETTE.LIGHTERGREY,
  },
});

export default ItineraryTable;

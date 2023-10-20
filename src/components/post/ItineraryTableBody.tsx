import { useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { DataTable } from "react-native-paper";
import GypsieButton from "../common/buttons/GypsieButton";
import AddIcon from "../common/icons/AddIcon";
import type { ModalNavigatorNavigationProp } from "../navigators/types/types";
import { PALETTE, SHADOW } from "../../utils/constants/palette";
import { RouteNodeInfo } from "../itinerary/types/types";

type ItineraryRow = {
  title: string;
  places: string[];
};

type ItineraryTableBodyProps = {
  data: ItineraryRow[];
};

const ItineraryTableBody = ({ data }: ItineraryTableBodyProps) => {
  const navigation = useNavigation<ModalNavigatorNavigationProp>();

  const onPressAddPlace = useCallback(() => {
    navigation.navigate("Modal", {
      screen: "PlaceSearch",
      params: {
        onAddPlace: (routeNode: RouteNodeInfo) => {
          console.log("Added:");
          console.log(JSON.stringify(routeNode, null, 4))
        },
      },
    });
  }, [navigation]);

  return (
    <DataTable>
      {data.map(item => {
        return (
          <DataTable.Row style={{ borderBottomColor: PALETTE.GREY }}>
            <DataTable.Cell style={styles.cell}>{item.title}</DataTable.Cell>
            <View style={styles.placesBox}>
              {item.places.map(place => (
                <View style={styles.chip}>
                  <Text>{place}</Text>
                </View>
              ))}
              <GypsieButton
                customButtonStyles={styles.addButton}
                customIconStyles={styles.addButtonIcon}
                Icon={AddIcon}
                onPress={onPressAddPlace}
              />
            </View>
          </DataTable.Row>
        );
      })}
    </DataTable>
  );
};

const styles = StyleSheet.create({
  cell: {
    borderRightWidth: 0.2,
    flex: 1,
    borderRightColor: PALETTE.GREY,
  },
  placesBox: {
    flexDirection: "row",
    flex: 5,
    padding: 8,
    flexWrap: "wrap",
  },
  chip: {
    height: 32,
    margin: 4,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 8,
    paddingHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: PALETTE.OFFWHITE,
    ...SHADOW.CHIP,
  },
  addButton: {
    flexDirection: "row",
    height: 32,
    width: "auto",
    margin: 4,
    borderRadius: 8,
    paddingHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonIcon: {
    color: PALETTE.GREYISHBLUE,
    marginRight: 0,
    fontSize: 16,
  },
});

export default ItineraryTableBody;

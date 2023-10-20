import { useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import GypsieButton from "../common/buttons/GypsieButton";
import ChevronsDown from "../common/icons/ChevronsDown";
import CloneIcon from "../common/icons/CloneIcon";
import SearchIcon from "../common/icons/SearchIcon";
import type { ModalNavigatorNavigationProp } from "../navigators/types/types";
import { PALETTE } from "../../utils/constants/palette";

type ItineraryTableFooterProps = {
  clearDataHandler?: () => void;
};

const ItineraryTableFooter = ({
  clearDataHandler,
}: ItineraryTableFooterProps) => {
  const navigation = useNavigation<ModalNavigatorNavigationProp>();

  const onPressViewMap = useCallback(() => {
    navigation.push("Modal", { screen: "ItineraryView" });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* <GypsieButton
        customButtonStyles={styles.button}
        customIconStyles={styles.buttonIcon}
        Icon={SearchIcon}
        text="Find Guide"
        onPress={() => {}}
      /> */}
      <GypsieButton
        customButtonStyles={styles.button}
        customIconStyles={styles.buttonIcon}
        Icon={ChevronsDown}
        text="View Map"
        // disabled
        onPress={onPressViewMap}
      />
      {/* <GypsieButton
        customButtonStyles={styles.button}
        customIconStyles={styles.buttonIcon}
        Icon={CloneIcon}
        text="Clone plan"
        onPress={() => {}}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 8,
    // borderWidth: 1,
    // borderColor: "magenta",
  },
  button: {
    height: "auto",
    width: "auto",
    padding: 8,
    flexDirection: "row",
    // backgroundColor: "orange",
  },
  buttonIcon: {
    marginRight: 4,
    color: PALETTE.GREYISHBLUE,
  },
});

export default ItineraryTableFooter;

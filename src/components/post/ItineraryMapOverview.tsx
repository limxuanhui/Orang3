import { useCallback } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import DeleteIcon from "../common/icons/DeleteIcon";
import GypsieButton from "../common/buttons/GypsieButton";
import type { ItineraryMapOverviewProps } from "./types/types";
import { DIMENSION } from "../../utils/constants/dimensions";
import { PALETTE } from "../../utils/constants/palette";
import { ModalNavigatorNavigationProp } from "../navigators/types/types";
import { useNavigation } from "@react-navigation/native";

const ItineraryMapOverview = ({
  data,
  onPressClearPlan,
}: ItineraryMapOverviewProps) => {
  // Pass itinerary data into navigation options parameters. If null/empty, then it is new plan
  const navigation = useNavigation<ModalNavigatorNavigationProp>();

  const onPressOverview = useCallback(() => {
    navigation.push("Modal", { screen: "ItineraryView" });
  }, [navigation]);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        { transform: [{ scale: pressed ? 0.99 : 1 }] },
      ]}
      onPress={onPressOverview}>
      <Image
        style={styles.mapOverviewBackground}
        source={{
          uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/mapoverview.jpeg",
        }}
        resizeMode="cover"
      />
      <View style={styles.footer}>
        <Text style={{ fontWeight: "bold", color: "white" }}>
          {data.routes.length > 0
            ? `No. of Places: ${data.routes.length}`
            : "Start adding plans"}
        </Text>
        {data.routes.length > 0 && onPressClearPlan ? (
          <GypsieButton
            customButtonStyles={[styles.footerButton]}
            customIconStyles={[
              styles.footerButtonIcon,
              { color: PALETTE.OFFWHITE, fontSize: 24 },
            ]}
            // customTextStyles={styles.footerButtonText}
            Icon={DeleteIcon}
            // text={"Clear plan"}
            onPress={onPressClearPlan}
          />
        ) : null}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 180,
    width: DIMENSION.HUNDRED_PERCENT,
    marginVertical: 8,
    borderRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: PALETTE.BLACK,
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  mapOverviewBackground: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  footerText: {
    textAlign: "center",
    color: PALETTE.WHITE,
    fontWeight: "800",
  },
  footer: {
    position: "absolute",
    flexDirection: "row",
    bottom: 0,
    justifyContent: "space-evenly",
    alignItems: "center",
    height: 40,
    width: "100%",
    backgroundColor: "#00000088",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  footerButton: { width: "auto", borderWidth: 0, borderColor: "red" },
  footerButtonText: { fontSize: 12, color: PALETTE.OFFWHITE },
  footerButtonIcon: {
    fontSize: 16,
    color: PALETTE.ORANGE,
  },
});

export default ItineraryMapOverview;

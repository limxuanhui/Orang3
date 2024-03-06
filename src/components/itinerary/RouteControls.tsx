import { useCallback, useMemo } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import RouteButton from "./RouteButton";
import type { RouteControlsProps, RouteInfo } from "./types/types";
import { DIMENSION } from "../../utils/constants/dimensions";
import { PALETTE } from "../../utils/constants/palette";
import { useAppDispatch, useAppSelector } from "../../utils/redux/hooks";
import { holdRoute, openModal } from "../../utils/redux/reducers/itineraryPlannerSlice";

const RouteControls = ({ routes, selectedRouteId }: RouteControlsProps) => {
  const dispatch = useAppDispatch();
  const { mode } = useAppSelector(state => state.itineraryPlanner);

  const onPressAdd = useCallback(() => {
    dispatch(openModal());
    dispatch(holdRoute({ modalInitialValue: "" }));
  }, [holdRoute, openModal, dispatch]);

  const sliderBorderRightStyle = useMemo(
    () => ({
      borderRightWidth: mode === "edit" ? 1 : 0,
      borderRightColor:
        mode === "edit" ? PALETTE.LIGHTERGREY : PALETTE.TRANSPARENT,
    }),
    [mode, PALETTE],
  );

  return (
    <View style={styles.routeControls}>
      <View style={styles.routeSliderBox}>
        <ScrollView
          style={[styles.routeSlider, sliderBorderRightStyle]}
          horizontal
          showsHorizontalScrollIndicator={false}>
          {routes.map((route: RouteInfo) => (
            <RouteButton
              key={Math.random().toString()} // change to uuid
              route={route}
              selected={route.id === selectedRouteId}
            />
          ))}
        </ScrollView>
      </View>
      {mode === "edit" ? (
        <Pressable
          style={({ pressed }) => [
            styles.addButton,
            { opacity: pressed ? 0.7 : 1 },
          ]}
          onPress={onPressAdd}>
          <Ionicons name="add-circle" size={24} color={PALETTE.ORANGE} />
        </Pressable>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  routeControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 40,
    width: DIMENSION.HUNDRED_PERCENT,
    marginBottom: 8,
    backgroundColor: PALETTE.OFFWHITE,
    borderRadius: 4,
  },
  routeSliderBox: {
    flex: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: DIMENSION.HUNDRED_PERCENT,
  },
  routeSlider: {
    flexDirection: "row",
    width: DIMENSION.HUNDRED_PERCENT,
    backgroundColor: PALETTE.OFFWHITE,
    shadowColor: PALETTE.BLACK,
    shadowOpacity: 1,
    shadowOffset: { height: 2, width: 2 },
  },
  addButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RouteControls;

import { useCallback, useMemo, useRef } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Portal, PortalHost } from "@gorhom/portal";
import AddCircleIcon from "../common/icons/AddCircleIcon";
import type { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import type { ModalNavigatorNavigationProp } from "../navigators/types/types";
import { DIMENSION } from "../../utils/constants/dimensions";
import { PALETTE } from "../../utils/constants/palette";
import useBottomSheetHandlers from "../../utils/hooks/useBottomSheetHandlers";

const NewPostOptions = () => {
  const navigation = useNavigation<ModalNavigatorNavigationProp>();
  const {
    bottomSheetRef,
    snapPoints,
    closeBottomSheet,
    openBottomSheet,
    renderBackdrop,
  } = useBottomSheetHandlers({ snapPointsArr: [1, "20%"] });

  // Callback function that gets called when the bottom sheet changes
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  // Expands the bottom sheet when our button is pressed
  const onPressAddButton = useCallback(() => {
    openBottomSheet();
  }, [bottomSheetRef]);

  const onPressCreateFeed = useCallback(() => {
    closeBottomSheet();
    navigation.navigate("Modal", { screen: "NewFeed" });
  }, [bottomSheetRef, navigation]);

  const onPressWriteTale = useCallback(() => {
    closeBottomSheet();
    navigation.navigate("Modal", { screen: "NewTale" });
  }, [bottomSheetRef, navigation]);

  return (
    <View style={styles.container}>
      <Pressable onPress={onPressAddButton}>
        <AddCircleIcon style={{ fontSize: 40, color: PALETTE.ORANGE }} />
      </Pressable>
      <Portal>
        <BottomSheet
          // style={{backgroundColor: 'red'}}
          backgroundStyle={styles.bottomSheet}
          // containerStyle={{backgroundColor: '#cccccc22'}}
          handleStyle={styles.bottomSheetHandle}
          handleIndicatorStyle={styles.bottomSheetHandleIndicator}
          ref={bottomSheetRef}
          index={-1} // Hide the bottom sheet when we first load our component
          snapPoints={snapPoints}
          //   enableHandlePanningGesture
          //   enablePanDownToClose
          backdropComponent={renderBackdrop}
          onChange={handleSheetChanges}>
          <BottomSheetView style={styles.bottomSheetContent}>
            <Pressable
              style={({ pressed }) => [
                styles.button,
                {
                  transform: [{ scale: pressed ? 0.99 : 1 }],
                },
              ]}
              onPress={onPressCreateFeed}>
              <Text style={styles.buttonText}>Create feed</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                styles.button,
                {
                  backgroundColor: PALETTE.OFFWHITE,
                  transform: [{ scale: pressed ? 0.99 : 1 }],
                },
              ]}
              onPress={onPressWriteTale}>
              <Text style={[styles.buttonText]}>Write tale...</Text>
            </Pressable>
          </BottomSheetView>
        </BottomSheet>
      </Portal>
      {/* <PortalHost name="NewPostOptions-host" /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomSheet: {
    backgroundColor: "#121212",
  },
  bottomSheetHandle: { backgroundColor: "transparent" },
  bottomSheetHandleIndicator: {
    backgroundColor: PALETTE.DARKGREY,
  },
  bottomSheetContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: DIMENSION.HUNDRED_PERCENT,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: DIMENSION.FORTY_PERCENT,
    padding: 8,
    marginHorizontal: 8,
    borderRadius: 16,
    backgroundColor: PALETTE.ORANGE,
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.2,
    shadowColor: PALETTE.GREY,
    shadowRadius: 2,
  },
  buttonText: {
    fontFamily: "Lilita One",
    fontSize: 20,
    fontWeight: "bold",
    color: PALETTE.GREYISHBLUE,
  },
});

export default NewPostOptions;

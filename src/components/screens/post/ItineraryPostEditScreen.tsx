import { useCallback, useMemo, useRef, useState } from "react";
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { PALETTE } from "../../../utils/constants/palette";
import GypsieButton from "../../common/buttons/GypsieButton";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFooter,
  BottomSheetFooterProps,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ItineraryTable from "../../post/ItineraryTable";
import CloseIcon from "../../common/icons/CloseIcon";
import ChevronsUpIcon from "../../common/icons/ChevronsUp";
import GypsieFeedCarousel from "../../common/GypsieFeedCarousel";
import { DUMMY_FEEDS } from "../../../data/feeds";
import { DEVICE_HEIGHT } from "../../../utils/constants/constants";
import { VIEWABILITY_CONFIG } from "../../../utils/constants/feed";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import FeedCarousel from "../../feed/FeedCarousel";
import ItineraryPostBackdrop from "../../post/ItineraryPostBackdrop";
import AddIcon from "../../common/icons/AddIcon";
import CloneIcon from "../../common/icons/CloneIcon";
import DeleteIcon from "../../common/icons/DeleteIcon";
import SearchIcon from "../../common/icons/SearchIcon";
import { ItineraryRow } from "../../post/types/types";

const NewItineraryPostScreen = ({ navigation }: any) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const insets = useSafeAreaInsets();
  const title = "";
  // const title =
  //   "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890";
  const avatarUri =
    "/Users/limxuanhui/bluextech/gypsie/assets/avatars/yoona.jpeg";
  const name = "@Joseph";
  const [itineraryData, setItineraryData] = useState<ItineraryRow[] | null>(
    null,
  );
  const feedData = DUMMY_FEEDS.map(el => el.items);

  const onPressClearItinerary = useCallback(() => {
    setItineraryData([]);
  }, [setItineraryData]);

  const onPressExpandBottomSheet = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(0);
  }, [bottomSheetRef]);

  const [activePostIndex, setActivePostIndex] = useState<number>(0);
  const onViewableFeedChanged = useCallback(
    // Change type to more suitable one
    ({ viewableItems, changed }: any) => {
      console.log("ViewableFeedChanged");
      if (viewableItems && viewableItems?.length > 0) {
        setActivePostIndex(viewableItems[0].index);
      }
    },
    [setActivePostIndex],
  );

  const renderBackdrop = useCallback(
    (props: BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        style={[
          props.style,
          {
            backgroundColor: "transparent",
          },
        ]}
        opacity={1}
        disappearsOnIndex={-1}
        appearsOnIndex={0}>
        {/* <View style={styles.headerTextBox}>
          <Text style={styles.headerText}>{title}</Text>
        </View> */}
      </BottomSheetBackdrop>
    ),
    [],
  );

  const snapPoints = useMemo(() => {
    return [
      Math.max(
        (1 - 0.2) * DEVICE_HEIGHT - (Math.floor(title.length / 17) + 1) * 40,
        0.1 * DEVICE_HEIGHT,
      ),
      "100%",
    ];
  }, [title]);

  const onChangeBottomSheet = useCallback(() => {
    Keyboard.dismiss();
  }, []);

  const renderFooter = useCallback(
    (props: BottomSheetFooterProps) => (
      <BottomSheetFooter {...props} bottomInset={insets.bottom}>
        <View style={styles.footerContainer}>
          {itineraryData === null ? (
            <GypsieButton
              customButtonStyles={styles.footerButton}
              customIconStyles={styles.footerButtonIcon}
              customTextStyles={styles.footerButtonText}
              Icon={AddIcon}
              text={"Add plan"}
              onPress={onPressAddPlan}
            />
          ) : (
            <GypsieButton
              customButtonStyles={styles.footerButton}
              customIconStyles={styles.footerButtonIcon}
              customTextStyles={styles.footerButtonText}
              Icon={DeleteIcon}
              text={"Clear plan"}
              onPress={onPressClearPlan}
            />
          )}
          <GypsieButton
            customButtonStyles={styles.footerButton}
            customIconStyles={styles.footerButtonIcon}
            customTextStyles={styles.footerButtonText}
            Icon={CloneIcon}
            text="Clone plan"
            onPress={() => {}}
          />
          <GypsieButton
            customButtonStyles={styles.footerButton}
            customIconStyles={styles.footerButtonIcon}
            customTextStyles={styles.footerButtonText}
            Icon={SearchIcon}
            text="Find guide"
            onPress={() => {}}
          />
        </View>
      </BottomSheetFooter>
    ),
    [insets, itineraryData],
  );

  const onPressAddPlan = useCallback(() => {
    setItineraryData([]);
  }, [setItineraryData]);

  const onPressClearPlan = useCallback(() => {
    setItineraryData(null);
  }, [setItineraryData]);

  return (
    <View style={styles.container}>
      <FlatList
        data={feedData}
        renderItem={({ item, index }) => (
          <FeedCarousel
            handle={"@To be changed"}
            items={item}
            inView={index === activePostIndex}
          />
        )}
        showsVerticalScrollIndicator={false}
        snapToInterval={DEVICE_HEIGHT}
        snapToAlignment="start"
        decelerationRate={"fast"}
        viewabilityConfig={VIEWABILITY_CONFIG}
        onViewableItemsChanged={onViewableFeedChanged}
      />
      <GypsieButton
        customButtonStyles={{ position: "absolute", bottom: insets.bottom }}
        customIconStyles={{ color: "orange", fontSize: 40 }}
        Icon={ChevronsUpIcon}
        onPress={onPressExpandBottomSheet}
      />
      <BottomSheet
        ref={bottomSheetRef}
        style={styles.bottomSheet}
        handleComponent={null}
        index={0}
        backdropComponent={renderBackdrop}
        footerComponent={renderFooter}
        topInset={insets.top}
        snapPoints={snapPoints}
        enablePanDownToClose
        onAnimate={onChangeBottomSheet}>
        <KeyboardAvoidingView>
          <TextInput
            style={{
              height: "auto",
              width: "100%",
              fontFamily: "Futura",
              fontSize: 40,
              borderBottomWidth: 1,
              borderBottomColor: PALETTE.LIGHTERGREY,
            }}
            multiline
            placeholder="Write a title"
            placeholderTextColor={PALETTE.LIGHTERGREY}
          />
        </KeyboardAvoidingView>
        <BottomSheetScrollView>
          {/* <ItineraryTable
            data={itineraryData}
            clearDataHandler={onPressClearItinerary}
          /> */}

          <GypsieButton
            customButtonStyles={{ height: 40, backgroundColor: PALETTE.ORANGE }}
            customTextStyles={{ fontSize: 20 }}
            text="Add Itinerary"
            onPress={() => {}}
          />
          <TextInput
            style={{ borderWidth: 1, borderColor: "red", marginVertical: 16 }}
            multiline
          />
          <GypsieButton
            customButtonStyles={{
              height: 40,
              marginBottom: insets.bottom,
              backgroundColor: PALETTE.GREYISHBLUE,
            }}
            customTextStyles={{ color: PALETTE.OFFWHITE, fontSize: 20 }}
            text="Add memory"
            onPress={() => {}}
          />
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PALETTE.GREYISHBLUE,
  },
  bottomSheet: {
    padding: 16,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: PALETTE.OFFWHITE,
  },
  headerTextBox: {
    position: "absolute",
    top: 0.17 * DEVICE_HEIGHT,
    minHeight: 100,
    width: "100%",
    paddingHorizontal: 16,
    // borderWidth: 1,
    // borderColor: "yellow",
    // backgroundColor: 'rgba(0,0,0,1)',
    // opacity:1,
    // zIndex: 0,
  },
  headerText: {
    color: PALETTE.WHITE,
    fontSize: 40,
    lineHeight: 40,
    fontFamily: "Lilita One",
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 12,
    margin: 12,
    borderRadius: 12,
    // backgroundColor: "#80f",
    backgroundColor: PALETTE.GREYISHBLUE,
    // backgroundColor: "transparent",
    shadowColor: PALETTE.DARKGREY,
    shadowRadius: 2,
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
  footerText: {
    textAlign: "center",
    color: "white",
    fontWeight: "800",
  },
  footerButton: { width: "auto", borderWidth: 0, borderColor: "red" },
  footerButtonText: { fontSize: 12, color: PALETTE.OFFWHITE },
  footerButtonIcon: {
    // color: PALETTE.WHITE,
    fontSize: 16,
    color: PALETTE.ORANGE,
  },
});

export default NewItineraryPostScreen;

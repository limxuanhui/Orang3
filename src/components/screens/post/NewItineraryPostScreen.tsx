import { Image, Text } from "react-native";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  GestureResponderHandlers,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import Video from "react-native-video";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { KeyboardAccessoryView } from "@flyerhq/react-native-keyboard-accessory-view";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Portal, PortalHost } from "@gorhom/portal";

import AuxiliaryControls from "../../common/AuxiliaryControls";
import GypsieButton from "../../common/buttons/GypsieButton";
import ItineraryMapOverview from "../../post/ItineraryMapOverview";
import LinkedFeedsList from "../../itinerary/LinkedFeedsList";

import AddIcon from "../../common/icons/AddIcon";
import CameraOutlineIcon from "../../common/icons/CameraOutlineIcon";
import ChangeSwapIcon from "../../common/icons/ChangeSwapIcon";
import CheckIcon from "../../common/icons/CheckIcon";
import DeleteOutlineIcon from "../../common/icons/DeleteOutlineIcon";
import FolderImagesIcon from "../../common/icons/FolderImagesIcon";
import ParagraphIcon from "../../common/icons/ParagraphIcon";
import SquaredCrossIcon from "../../common/icons/SquaredCrossIcon";
import TitleIcon from "../../common/icons/TitleIcon";

import type { LinkedFeedsListItem } from "../../itinerary/types/types";
import type { NewItineraryPostScreenProps } from "./types/types";
import { StoryItemType } from "../../post/types/types";
import { DEVICE_HEIGHT, FULL_SCREEN } from "../../../utils/constants/constants";
import { PALETTE } from "../../../utils/constants/palette";
import useNewStoryManager from "../../../utils/hooks/useNewStoryManager";
import { nanoid } from "@reduxjs/toolkit";
import NewStoryItem from "../../post/NewStoryItem";
import { ActivityIndicator } from "react-native-paper";

const NewItineraryPostScreen = ({
  navigation,
}: NewItineraryPostScreenProps) => {
  const insets = useSafeAreaInsets();

  const {
    bottomSheetRef,
    snapPoints,
    keyboardIsVisible,
    coverMedia,
    title,
    itineraryData,
    storyData,
    posting,
    linkedFeedsList,
    closeKeyboard,
    renderBackdrop,
    onPressAddCoverMedia,
    onPressClearCoverMedia,
    onPressClearPlan,
    onTitleChange,
    onStoryItemTextChange,
    onPressAddTitle,
    onPressAddParagraph,
    onPressAddLinkedFeeds,
    onPressAddLinkedFeed,
    onPressDeleteLinkedFeed,
    onSubmitPost,
  } = useNewStoryManager();

  const [currScrollPosition, setCurrScrollPosition] = useState<number>(0);
  const [prevHeight, setPrevHeight] = useState<number>(DEVICE_HEIGHT);
  const scrollViewRef = useRef<KeyboardAwareScrollView>(null);

  // Called every scrollEventThrottle ms (60 ms)
  const onScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      console.log("Scrolling...");
      setCurrScrollPosition(e.nativeEvent.contentOffset.y);
    },
    [setCurrScrollPosition],
  );

  const onContentSizeChange = useCallback(
    (w: number, h: number) => {
      console.log("W: ", w, " | h: ", h);
      // if (scrollViewRef !== null)
      //   scrollViewRef.current?.scrollToPosition(
      //     0,
      //     currScrollPosition + h - prevHeight + 10,
      //     true,
      //   );
      // setPrevHeight(h);
      // setCurrScrollPosition(h);
    },
    [scrollViewRef, currScrollPosition, prevHeight, setPrevHeight],
  );

  // const [focusedText, setFocusedText] = useState<String>();
  // const onBackspace = useCallback(
  //   (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
  //     if (e.nativeEvent.key === "Backspace") {
  //       console.log(
  //         "backspaced: ",
  //         // JSON.stringify(e., null, 4),
  //       );

  //       if (focusedText) {
  //       }
  //     }
  //   },
  //   [focusedText],
  // );

  return (
    <KeyboardAccessoryView
      style={styles.accessoryView}
      renderScrollable={(panHandlers: GestureResponderHandlers) => (
        <View style={styles.container}>
          <KeyboardAwareScrollView
            ref={scrollViewRef}
            style={styles.scrollViewContainer}
            contentContainerStyle={styles.scrollView}
            showsVerticalScrollIndicator={false}
            keyboardDismissMode="none"
            // automaticallyAdjustKeyboardInsets
            // decelerationRate={0}
            onContentSizeChange={onContentSizeChange}
            onScrollBeginDrag={onScroll}
            scrollEventThrottle={60}
            {...panHandlers}>
            <View style={styles.coverMediaContainer}>
              {coverMedia !== null ? (
                <>
                  {coverMedia.type?.startsWith("video") ? (
                    <Video
                      style={styles.coverMedia}
                      source={{ uri: coverMedia.uri }}
                      // controls
                      repeat
                      resizeMode="contain"
                    />
                  ) : (
                    <Image
                      style={styles.coverMedia}
                      source={{ uri: coverMedia.uri }}
                      resizeMode="cover"
                    />
                  )}
                  <AuxiliaryControls
                    customStyle={{
                      height: "50%",
                    }}
                    orientation="vertical"
                    position="bottom-right">
                    <GypsieButton
                      customIconStyles={{ color: "white", fontSize: 24 }}
                      Icon={DeleteOutlineIcon}
                      onPress={onPressClearCoverMedia}
                    />
                    <GypsieButton
                      customIconStyles={{ color: "white", fontSize: 24 }}
                      Icon={ChangeSwapIcon}
                      onPress={onPressAddCoverMedia}
                    />
                  </AuxiliaryControls>
                </>
              ) : (
                <GypsieButton
                  customButtonStyles={styles.addCoverMediaButton}
                  customIconStyles={{ fontSize: 64, color: PALETTE.LIGHTGREY }}
                  Icon={CameraOutlineIcon}
                  onPress={onPressAddCoverMedia}
                />
              )}
            </View>
            <View
              style={[
                styles.blogContainer,
                { marginBottom: 46 + insets.bottom },
              ]}>
              <TextInput
                style={styles.titleInput}
                value={title}
                multiline
                placeholder="Write a title"
                placeholderTextColor={PALETTE.LIGHTERGREY}
                onChangeText={onTitleChange}
                onBlur={() => {
                  console.warn("clicked out");
                }}
                scrollEnabled={false}
              />
              <ItineraryMapOverview
                data={itineraryData}
                onPressClearPlan={onPressClearPlan}
              />
              <View style={{}}>
                {storyData.map((el, index) => (
                  <NewStoryItem
                    key={el.id}
                    item={el}
                    onStoryItemTextChange={onStoryItemTextChange}
                    onPressDeleteLinkedFeed={() =>
                      onPressDeleteLinkedFeed(index)
                    }
                  />
                ))}
              </View>
            </View>
          </KeyboardAwareScrollView>
          <Portal>
            <BottomSheet
              ref={bottomSheetRef}
              backdropComponent={renderBackdrop}
              index={-1}
              snapPoints={snapPoints}>
              {linkedFeedsList.status === "succeeded" ? (
                <BottomSheetScrollView
                  style={{
                    padding: 8,
                  }}
                  showsVerticalScrollIndicator={false}>
                  {linkedFeedsList.data.map(el => (
                    <View style={styles.linkedFeedsListRow}>
                      <LinkedFeedsList data={el} />
                      <GypsieButton
                        customButtonStyles={styles.addLinkedFeedButton}
                        customIconStyles={{ fontSize: 32 }}
                        Icon={AddIcon}
                        onPress={onPressAddLinkedFeed}
                      />
                    </View>
                  ))}
                </BottomSheetScrollView>
              ) : linkedFeedsList.status === "failed" ? (
                <View
                  style={{
                    flex: 1,
                    // flexDirection: 'row',
                    borderWidth: 1,
                    borderColor: "red",
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  <Text
                    style={{
                      fontFamily: "Futura",
                      fontSize: 24,
                      color: PALETTE.GREY,
                    }}>
                    Unable to load your feeds...
                  </Text>
                  <GypsieButton
                    customButtonStyles={{
                      margin: 16,
                      borderWidth: 1,
                      borderColor: PALETTE.LIGHTERGREY,
                      width: "auto",
                      paddingVertical: 8,
                      paddingHorizontal: 16,
                    }}
                    customTextStyles={{
                      fontFamily: "Futura",
                      fontSize: 16,
                      fontWeight: "bold",
                      color: PALETTE.GREYISHBLUE,
                    }}
                    customIconStyles={{ fontSize: 16, color: PALETTE.ORANGE }}
                    Icon={ChangeSwapIcon}
                    text="Try again"
                    onPress={() => {}}
                  />
                </View>
              ) : (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  <ActivityIndicator size={60} color={PALETTE.ORANGE} />
                </View>
              )}
            </BottomSheet>
          </Portal>
          <PortalHost name="NewItineraryPost_ShowLinkedFeedsList-host" />
        </View>
      )}>
      <View style={styles.bottomControls}>
        <GypsieButton
          customButtonStyles={styles.bottomControl}
          customIconStyles={{ fontSize: 24, color: PALETTE.GREYISHBLUE }}
          Icon={TitleIcon}
          onPress={onPressAddTitle}
        />
        <GypsieButton
          customButtonStyles={styles.bottomControl}
          customIconStyles={{ fontSize: 24, color: PALETTE.GREYISHBLUE }}
          Icon={ParagraphIcon}
          onPress={onPressAddParagraph}
        />
        <GypsieButton
          customButtonStyles={styles.bottomControl}
          customIconStyles={{ fontSize: 24, color: PALETTE.GREYISHBLUE }}
          Icon={FolderImagesIcon}
          onPress={onPressAddLinkedFeeds}
        />
        {keyboardIsVisible ? (
          <GypsieButton
            customButtonStyles={styles.bottomControl}
            customIconStyles={{ fontSize: 24, color: PALETTE.ORANGE }}
            Icon={CheckIcon}
            onPress={closeKeyboard}
          />
        ) : (
          <GypsieButton
            customButtonStyles={[
              styles.bottomControl,
              {
                width: "auto",
                backgroundColor: PALETTE.ORANGE,
                borderRadius: 6,
              },
            ]}
            customTextStyles={{
              fontSize: 16,
              fontWeight: "bold",
              color: PALETTE.OFFWHITE,
            }}
            text="Post"
            onPress={onSubmitPost}
            loading={posting}
            disabled
          />
        )}
      </View>
    </KeyboardAccessoryView>
  );
};

const styles = StyleSheet.create({
  accessoryView: {
    backgroundColor: PALETTE.OFFWHITE,
  },
  container: {
    ...FULL_SCREEN,
    // flex:1,
    backgroundColor: PALETTE.ORANGE,
  },
  scrollViewContainer: {
    // flex: 1,
    backgroundColor: PALETTE.OFFWHITE,
  },
  scrollView: { flexGrow: 1 },
  coverMediaContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 250,
    width: "100%",
    backgroundColor: PALETTE.GREYISHBLUE,
  },
  coverMedia: { height: "100%", width: "100%" },
  addCoverMediaButton: {
    position: "absolute",
    height: 80,
    width: 200,
    shadowColor: PALETTE.WHITE,
    shadowRadius: 16,
    shadowOpacity: 0.5,
    shadowOffset: { height: 0, width: 0 },
  },
  blogContainer: {
    padding: 8,
    // borderWidth: 5,
    // borderColor: PALETTE.BLUE,
    backgroundColor: PALETTE.OFFWHITE,
  },
  titleInput: {
    width: "100%",
    fontFamily: "Futura",
    fontSize: 40,
    borderBottomWidth: 1,
    borderBottomColor: PALETTE.LIGHTERGREY,
  },

  bottomControls: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    padding: 8,
    borderTopWidth: 1,
    borderColor: PALETTE.LIGHTERGREY,
    backgroundColor: PALETTE.OFFWHITE,
    shadowOffset: {
      height: -2,
      width: 0,
    },
    shadowColor: PALETTE.GREY,
    shadowOpacity: 0.2,
    shadowRadius: 2,
    // borderWidth: 0,
    // borderColor: "black",
  },
  bottomControl: {
    height: 32,
    width: 40,
    // borderWidth: 0,
    // borderColor: "red",
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  addLinkedFeedButton: {
    marginHorizontal: 8,
    height: 40,
    width: 40,
    borderRadius: 24,
    backgroundColor: PALETTE.ORANGE,
  },
  linkedFeedsListRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 16,
    // borderWidth: 1,
    // borderColor: PALETTE.LIGHTERGREY,
  },
});

export default NewItineraryPostScreen;

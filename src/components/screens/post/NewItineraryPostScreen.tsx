import { ReactNode, useCallback, useMemo, useRef, useState } from "react";
import {
  FlatList,
  GestureResponderHandlers,
  ImageBackground,
  InputAccessoryView,
  Keyboard,
  KeyboardAvoidingView,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from "react-native";
import {
  Asset,
  ImageLibraryOptions,
  launchImageLibrary,
} from "react-native-image-picker";
import axios from "axios";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import GypsieButton from "../../common/buttons/GypsieButton";
import { PALETTE, SHADOW } from "../../../utils/constants/palette";
import {
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
  FULL_SCREEN,
} from "../../../utils/constants/constants";
import { Image } from "react-native";
import CheckIcon from "../../common/icons/CheckIcon";
import useMediaPicker from "../../../utils/hooks/useMediaPicker";
import ItineraryMapOverview from "../../post/ItineraryMapOverview";
import TitleIcon from "../../common/icons/TitleIcon";
import { storyData as STORY_DATA } from "./ItineraryPostViewScreen";
import Video from "react-native-video";
import AuxiliaryControls from "../../common/AuxiliaryControls";
import DeleteIcon from "../../common/icons/DeleteIcon";
import DeleteOutlineIcon from "../../common/icons/DeleteOutlineIcon";
import ChangeSwapIcon from "../../common/icons/ChangeSwapIcon";
import ParagraphIcon from "../../common/icons/ParagraphIcon";
import FolderImagesIcon from "../../common/icons/FolderImagesIcon";
import { useKeyboardHandler } from "react-native-keyboard-controller";
import useKeyboardManager from "../../../utils/hooks/useKeyboardManager";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { KeyboardAccessoryView } from "@flyerhq/react-native-keyboard-accessory-view";
import CameraIcon from "../../common/icons/CameraIcon";
import CameraOutlineIcon from "../../common/icons/CameraOutlineIcon";
import { useAppDispatch, useAppSelector } from "../../../utils/redux/hooks";
import {
  setCoverMedia,
  setTitle,
  setItineraryData,
  addStoryItem,
  setPosting,
} from "../../../utils/redux/reducers/newItineraryPostSlice";
import type { NewItineraryPostScreenProps } from "./types/types";
import { Story, StoryItem, StoryItemType } from "../../post/types/types";
import { storyBodyStyle, storyTitleStyle } from "../../../utils/constants/text";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import { Portal, PortalHost } from "@gorhom/portal";
import LinkedFeedsList from "../../itinerary/LinkedFeedsList";
import AddIcon from "../../common/icons/AddIcon";
import DeleteLeftIcon from "../../common/icons/DeleteLeftIcon";

const imageLibraryOptions: ImageLibraryOptions = {
  mediaType: "mixed",
  presentationStyle: "fullScreen",
  selectionLimit: 1,
};

const userLinkedFeedList = [
  [
    {
      feedId: "Nulla labore labore fugiat officia.",
      uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/japan-kyotoshrine.jpeg",
    },
    {
      feedId: "Nulla labore labore fugiat officia.",
      uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/singapore-satay.jpeg",
    },
    {
      feedId: "Nulla labore labore fugiat officia.",
      uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/taiwan-beach.jpeg",
    },
    {
      feedId: "Nulla labore labore fugiat officia.",
      uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/singapore-uss.jpg",
    },
  ],
  [
    {
      feedId: "Nulla labore labore fugiat officia.",
      uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/japan-kyotoshrine.jpeg",
    },
    {
      feedId: "Nulla labore labore fugiat officia.",
      uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/singapore-satay.jpeg",
    },
    {
      feedId: "Nulla labore labore fugiat officia.",
      uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/taiwan-beach.jpeg",
    },
    {
      feedId: "Nulla labore labore fugiat officia.",
      uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/singapore-uss.jpg",
    },
  ],
  [
    {
      feedId: "Nulla labore labore fugiat officia.",
      uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/japan-kyotoshrine.jpeg",
    },
    {
      feedId: "Nulla labore labore fugiat officia.",
      uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/singapore-satay.jpeg",
    },
    {
      feedId: "Nulla labore labore fugiat officia.",
      uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/taiwan-beach.jpeg",
    },
    {
      feedId: "Nulla labore labore fugiat officia.",
      uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/singapore-uss.jpg",
    },
  ],
];

const NewItineraryPostScreen = ({
  navigation,
}: NewItineraryPostScreenProps) => {
  const insets = useSafeAreaInsets();
  // Creates a reference to the DOM element that we can interact with
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { keyboardIsVisible, closeKeyboard } = useKeyboardManager();
  const { openGallery } = useMediaPicker({ imageLibraryOptions });
  const { coverMedia, title, itineraryData, storyData, posting } =
    useAppSelector(state => state.newItineraryPost);
  const dispatch = useAppDispatch();

  const onPressAddCoverMedia = useCallback(async () => {
    const coverMediaResponse = await openGallery();
    let pickedCoverMedia;
    if (coverMediaResponse.assets && coverMediaResponse.assets.length > 0) {
      pickedCoverMedia = coverMediaResponse.assets[0];
      dispatch(setCoverMedia(pickedCoverMedia));
    }
  }, [coverMedia, dispatch, openGallery]);

  const onPressClearCoverMedia = useCallback(() => {
    dispatch(setCoverMedia(null));
  }, [setCoverMedia, dispatch]);

  const onPressClearPlan = useCallback(() => {
    dispatch(setItineraryData([]));
  }, [setItineraryData]);

  const onTitleChange = useCallback(
    (text: string) => {
      dispatch(setTitle(text));
    },
    [setTitle, dispatch],
  );

  const onPressMap = useCallback(() => {
    navigation.navigate("ItineraryView");
  }, [navigation]);

  const onPressAddTitle = useCallback(() => {
    const newStoryItem: StoryItem = {
      type: StoryItemType.Text,
      text: "",
      style: storyTitleStyle,
    };
    dispatch(addStoryItem({ newStoryItem }));
  }, [addStoryItem, dispatch]);

  const onPressAddParagraph = useCallback(() => {
    const newStoryItem: StoryItem = {
      type: StoryItemType.Text,
      text: "",
      style: storyBodyStyle,
    };
    dispatch(addStoryItem({ newStoryItem }));
  }, [addStoryItem, dispatch]);

  const onPressAddLinkedFeeds = useCallback(() => {
    // Close keyboard if open
    if (keyboardIsVisible) {
      closeKeyboard();
    }

    // Open bottomsheet displaying linkedFeed
    bottomSheetRef.current?.expand();
  }, [bottomSheetRef, keyboardIsVisible, closeKeyboard]);

  const onPressAddLinkedFeed = useCallback(() => {
    const selectedLinkedFeedId = 0;
    const selectedLinkedFeed = userLinkedFeedList[selectedLinkedFeedId];
    console.log(selectedLinkedFeed);
    dispatch(
      addStoryItem({
        newStoryItem: { type: StoryItemType.Media, data: selectedLinkedFeed },
      }),
    );

    // Close bottomsheet
    bottomSheetRef.current?.close();
    return selectedLinkedFeedId;
  }, [bottomSheetRef]);

  const onSubmitPost = useCallback(async () => {
    setPosting(true);
    // const url = "http://localhost:8080/itinerary/post";
    const data: {
      coverMedia: Asset | null;
      title: string;
      storyData: Story;
    } = {
      coverMedia,
      title,
      storyData,
    };

    // Get secure url from backend for uploading media to s3
    const apiGatewayUrl =
      "https://i0p8qk0h9a.execute-api.ap-southeast-1.amazonaws.com/default/getPresignedUrl";
    const secureS3UrlResponse = await axios.get(apiGatewayUrl, {
      headers: { mediaType: data.coverMedia?.type },
    });
    console.log("TYPE: ", data.coverMedia?.type);
    const blobResponse = await fetch(
      data.coverMedia?.uri?.replace("file:///", "file:/") ||
        "/Users/limxuanhui/bluextech/gypsie/assets/images/logo-no-background.png",
    );
    // console.log("BLOB response: ", blobResponse);
    const blob = await blobResponse.blob();

    // If failed to get secure s3 url
    if (secureS3UrlResponse.status !== 200) {
      console.error("Failed to get secure S3 url for uploading media");
      setPosting(false);
      return;
    }

    // Upload media to s3 buckets
    // const response = await fetch(secureS3UrlResponse.data, {
    //   method: "PUT",
    //   body: blob,
    // });
    const response = await axios.put(secureS3UrlResponse.data, blob, {
      // Ensure blob data is not transformed (stringified) by axios in transformRequest
      // Refer to this link for more details: https://github.com/axios/axios/issues/2677
      transformRequest: data => data,
      headers: {
        "Content-Type": data.coverMedia?.type,
      },
    });

    console.log("RESPONSE: ", response);
    setPosting(false);
  }, [coverMedia, title, storyData, posting]);

  // const [scrollEnabled, setScrollEnabled] = useState<boolean>(false);
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

  const [focusedText, setFocusedText] = useState<String>();
  const onBackspace = useCallback(
    (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
      if (e.nativeEvent.key === "Backspace") {
        console.log(
          "backspaced: ",
          // JSON.stringify(e., null, 4),
        );

        if (focusedText) {
        }
      }
    },
    [focusedText],
  );

  const onPressDeleteLinkedFeed = useCallback((index: number) => {}, []);

  const renderBackdrop = useCallback(
    (props: BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={0}
        appearsOnIndex={1}
      />
    ),
    [],
  );

  const snapPoints = useMemo(() => [1, "50%"], []);

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
                {storyData.map((el, index) => {
                  if (el.type === StoryItemType.Text) {
                    console.log("EL TYPE: ", el);
                    return (
                      <TextInput
                        style={[styles.storySectionInput, el.style]}
                        key={index}
                        placeholder={index === 0 ? "Write a story..." : ""}
                        // onKeyPress={}
                        // onFocus={e => {
                        //   console.log(e.nativeEvent.text);
                        //   setFocusedText(e.nativeEvent.text);
                        // }}
                        onChangeText={text => setFocusedText(text)}
                        autoFocus
                        multiline
                        selectionColor={PALETTE.ORANGE}
                        scrollEnabled={false}
                      />
                    );
                  } else if (el.type === StoryItemType.Media) {
                    console.log(el.data);
                    return (
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                          marginVertical: 16,
                        }}>
                        <LinkedFeedsList data={el.data} />
                        <GypsieButton
                          customButtonStyles={{
                            marginHorizontal: 8,
                            height: 48,
                            width: 48,
                            // borderRadius: 24,
                            // backgroundColor: "orange",
                          }}
                          customIconStyles={{
                            fontSize: 24,
                            color: PALETTE.GREY,
                          }}
                          Icon={DeleteLeftIcon}
                          onPress={() => onPressDeleteLinkedFeed(index)}
                        />
                      </View>
                    );
                  }
                })}
              </View>
            </View>
          </KeyboardAwareScrollView>
          <Portal>
            <BottomSheet
              ref={bottomSheetRef}
              backdropComponent={renderBackdrop}
              index={-1}
              snapPoints={snapPoints}>
              <BottomSheetScrollView
                style={
                  {
                    // height: "80%",
                    // width: "100%",
                    // backgroundColor: "skyblue",
                  }
                }>
                {userLinkedFeedList.map(el => (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      // width: "100%",
                      marginVertical: 16,
                      borderWidth: 1,
                      borderColor: PALETTE.LIGHTERGREY,
                    }}>
                    <LinkedFeedsList data={el} />
                    <GypsieButton
                      customButtonStyles={{
                        marginHorizontal: 8,
                        height: 48,
                        width: 48,
                        borderRadius: 24,
                        backgroundColor: "orange",
                      }}
                      customIconStyles={{ fontSize: 24 }}
                      Icon={AddIcon}
                      onPress={onPressAddLinkedFeed}
                    />
                  </View>
                ))}
              </BottomSheetScrollView>
            </BottomSheet>
          </Portal>
          <PortalHost name="NewItineraryPost_ShowLinkedFeedList-host" />
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
            // customIconStyles={{ fontSize: 24 }}
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
  storySectionInput: {
    marginBottom: 8,
    borderBottomWidth: 1,
    borderColor: PALETTE.LIGHTERGREY,
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
});

export default NewItineraryPostScreen;

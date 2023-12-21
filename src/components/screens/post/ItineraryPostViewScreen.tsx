import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { PALETTE } from "../../../utils/constants/palette";
import GypsieButton from "../../common/buttons/GypsieButton";
import NewItineraryPostHandleBar from "../../post/NewItineraryPostHandleBar";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFooter,
  BottomSheetFooterProps,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ChevronsUpIcon from "../../common/icons/ChevronsUp";
import { DUMMY_FEEDS } from "../../../data/feeds";
import { DEVICE_HEIGHT } from "../../../utils/constants/constants";
import { VIEWABILITY_CONFIG } from "../../../utils/constants/feed";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import FeedCarousel from "../../feed/FeedCarousel";
import CloneIcon from "../../common/icons/CloneIcon";
import SearchIcon from "../../common/icons/SearchIcon";
import { type Story, StoryItemType } from "../../post/types/types";
import type {
  ItineraryPostViewScreenProps,
  ItineraryPostViewScreenRouteProp,
} from "./types/types";
import ItineraryMapOverview from "../../post/ItineraryMapOverview";
import { storyBodyStyle, storyTitleStyle } from "../../../utils/constants/text";
import { Itinerary } from "../../itinerary/types/types";
import { useRoute } from "@react-navigation/native";
import { FeedItem } from "../../feed/types/types";
import { BACKEND_BASE_URL } from "@env";

export const storyData: Story = [
  {
    id: "1",
    type: StoryItemType.Text,
    text: "This is the craziest trip ever!",
    style: storyTitleStyle,
  },
  {
    id: "2",
    type: StoryItemType.Text,
    text: "The weather here was amazing. Elit quis sit commodo officia nisi. Irure dolor ad aute amet excepteur elit sit.",
    style: storyBodyStyle,
  },
  {
    id: "3",
    type: StoryItemType.Text,
    text: "The weather here was amazing. Elit quis sit commodo officia nisi. Irure dolor ad aute amet excepteur elit sit.",
    style: storyBodyStyle,
  },
  {
    id: "4",
    type: StoryItemType.Text,
    text: "Day 2 - Jeju Hallabong Farm",
    style: storyTitleStyle,
  },
  {
    id: "5",
    type: StoryItemType.Media,
    data: [
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
  },
  {
    id: "6",
    type: StoryItemType.Text,
    text: "The weather here was amazing. Elit quis sit commodo officia nisi. Irure dolor ad aute amet excepteur elit sit.",
    style: storyBodyStyle,
  },
  {
    id: "7",
    type: StoryItemType.Text,
    text: "Day 3 - Jeju Abalone stew",
    style: storyTitleStyle,
  },
  {
    id: "8",
    type: StoryItemType.Text,
    text: "The weather here was amazing. Elit quis sit commodo officia nisi. Irure dolor ad aute amet excepteur elit sit.",
    style: storyBodyStyle,
  },
  {
    id: "9",
    type: StoryItemType.Media,
    data: [
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
  },
];

const ItineraryPostViewScreen = ({
  navigation,
}: ItineraryPostViewScreenProps) => {
  const { params } = useRoute<ItineraryPostViewScreenRouteProp>();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const insets = useSafeAreaInsets();
  const title = "12345678901234567890 - ItineraryPostViewScreen";
  const avatarUri =
    "/Users/limxuanhui/bluextech/gypsie/assets/avatars/yoona.jpeg";
  const name = "@Joseph";
  const [itineraryData, setItineraryData] = useState<Itinerary>({
    id: "",
    creatorId: "",
    routes: [],
  });
  const feedData = DUMMY_FEEDS.map(el => el.items);

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
        <View style={styles.headerTextBox}>
          <Text style={styles.headerText}>{title}</Text>
        </View>
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

  const renderFooter = useCallback(
    (props: BottomSheetFooterProps) => (
      <BottomSheetFooter {...props} bottomInset={insets.bottom}>
        <View style={styles.footerContainer}>
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

  useEffect(() => {
    // Fetch data with itinerary post id (params.id)
    const url = BACKEND_BASE_URL + "/" + params.id;
  }, [params]);

  const coverMedia: FeedItem[] = [
    {
      id: "coverMediaId",
      media: {
        type: "video",
        uri: "/Users/limxuanhui/bluextech/gypsie/assets/videos/ace.mp4",
      },
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={[coverMedia, ...feedData]}
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
        // footerComponent={renderFooter}
        topInset={insets.top}
        snapPoints={snapPoints}
        enablePanDownToClose
        // onAnimate={() => console.log("animating bottomsheet")}
        // onChange={() => console.log("moving bottomsheet")}
      >
        {/* To be changed (NewItineraryPostHandlerBar) */}
        <NewItineraryPostHandleBar avatarUri={avatarUri} name={name} />
        <ItineraryMapOverview creatorId={itineraryData.creatorId} />
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
    height: "auto",
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

export default ItineraryPostViewScreen;

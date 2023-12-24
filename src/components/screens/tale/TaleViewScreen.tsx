import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { PALETTE } from "../../../utils/constants/palette";
import GypsieButton from "../../common/buttons/GypsieButton";
import NewItineraryPostHandleBar from "../../post/NewItineraryPostHandleBar";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ChevronsUpIcon from "../../common/icons/ChevronsUp";
import { DUMMY_FEEDS } from "../../../data/feeds";
import { DEVICE_HEIGHT } from "../../../utils/constants/constants";
import { VIEWABILITY_CONFIG } from "../../../utils/constants/feed";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import FeedCarousel from "../../feed/FeedCarousel";
import { type Story, StoryItemType } from "../../post/types/types";
import type {
  TaleViewScreenProps,
  TaleViewScreenRouteProp,
} from "../post/types/types";
import ItineraryMapOverview from "../../post/ItineraryMapOverview";
import { storyBodyStyle, storyTitleStyle } from "../../../utils/constants/text";
import { Itinerary } from "../../itinerary/types/types";
import { useRoute } from "@react-navigation/native";
import { FeedItem, Media } from "../../feed/types/types";
import { BACKEND_BASE_URL } from "@env";
import FeedItemThumbnailsCarousel from "../../tale/FeedItemThumbnailsCarousel";
import { Tale } from "../../tale/types/types";
import useDataManager from "../../../utils/hooks/useDataManager";
import { QueryKey, queryOptions, useQuery } from "@tanstack/react-query";
import { DUMMY_DATABASE } from "../../../data/database";

type DataKey = "feeds" | "itineraries" | "tales" | "tales-md" | "users";

const TaleViewScreen = ({ navigation }: TaleViewScreenProps) => {
  const insets = useSafeAreaInsets();
  const { params } = useRoute<TaleViewScreenRouteProp>();
  const { id, creator } = params;

  const feeds = DUMMY_FEEDS.map(el => el.items);

  const queryFn = useCallback(
    async ({ queryKey }: { queryKey: QueryKey }): Promise<Tale | undefined> => {
      const [key, taleId] = queryKey;
      console.log("QUERY FUNCTION CALLED");
      return new Promise((resolve, reject) => {
        const tales: Tale[] = DUMMY_DATABASE[key as DataKey] as Tale[];
        setTimeout(() => {
          resolve(tales.find((el: Tale) => el.id === taleId));
        }, 2000);
      });
    },
    [DUMMY_DATABASE],
  );

  const options = useMemo(() => {
    const queryKey = ["tales", id];
    return queryOptions({
      queryKey,
      queryFn,
      networkMode: "online",
      // staleTime: 1000,
      initialData: {
        id: "",
        creator: {
          id: "",
          handle: "",
          avatar: "",
        },
        cover: null,
        title: "",
        itinerary: {
          id: "",
          creatorId: "",
          routes: [
            {
              id: "",
              name: "Day 1",
              routeNodes: [],
              isRouted: false,
              polyline: [],
            },
          ],
        },
        story: [],
      },
      enabled: true,
      gcTime: 1000 * 60 * 5,
    });
  }, [id, queryOptions]);
  // const options = queryOptions({
  //   queryKey:["tales", id],
  //   queryFn,
  //   networkMode: "online",
  //   staleTime: 5000,
  //   initialData: {
  //     id: "",
  //     creator: {
  //       id: "",
  //       handle: "",
  //       avatar: "",
  //     },
  //     cover: null,
  //     title: "",
  //     itinerary: {
  //       id: "",
  //       creatorId: "",
  //       routes: [
  //         {
  //           id: "",
  //           name: "Day 1",
  //           routeNodes: [],
  //           isRouted: false,
  //           polyline: [],
  //         },
  //       ],
  //     },
  //     story: [],
  //   },
  //   enabled: true,
  //   gcTime: 1000 * 60 * 5,
  // });
  const { data, isFetching, isLoading, isError } = useQuery(options);

  let renderedData: FeedItem[][] = feeds;
  if (data && data.id) {
    const cover: FeedItem = {
      id: data.cover?.id as string,
      media: data.cover as Media,
      taleId: data.id as string,
    };
    renderedData = [[cover], ...feeds];
    console.log("DATA: ", data);
  }

  // See if can move these to useBottomSheet hook
  const bottomSheetRef = useRef<BottomSheet>(null);
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
  const onPressExpandBottomSheet = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(0);
  }, [bottomSheetRef]);
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
          <Text style={styles.headerText}>{data?.title}</Text>
        </View>
      </BottomSheetBackdrop>
    ),
    [data],
  );
  const snapPoints = useMemo(() => {
    if (data) {
      return [
        Math.max(
          (1 - 0.2) * DEVICE_HEIGHT -
            (Math.floor(data.title.length / 17) + 1) * 40,
          0.1 * DEVICE_HEIGHT,
        ),
        "100%",
      ];
    }
    return ["50%", "100%"];
  }, [data]);
  // ====================================================

  useEffect(() => {
    console.log("Data when mounted: ", data);
    return () => {
      console.log("Data when dismounted: ", data);
    };
  }, [data]);

  return (
    <View style={styles.container}>
      <FlatList
        data={renderedData}
        renderItem={({ item, index }) => (
          <FeedCarousel
            handle={creator.handle}
            items={item}
            inView={index === activePostIndex}
          />
        )}
        ListEmptyComponent={<Text>Loading tale data...</Text>}
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
        <NewItineraryPostHandleBar
          avatarUri={data?.creator.avatar || ""}
          name={data?.creator.handle || ""}
        />
        <BottomSheetScrollView
          contentContainerStyle={{ paddingBottom: insets.bottom }}
          showsVerticalScrollIndicator={false}>
          <ItineraryMapOverview
            itineraryId={""}
            creatorId={params.creator.id}
          />
          {data?.story.map(el => {
            if (el.type === StoryItemType.Text) {
              return (
                <View style={styles.storyItem} key={el.id}>
                  <Text style={el.style}>{el.text}</Text>
                </View>
              );
            } else if (el.type === StoryItemType.Media) {
              return (
                <View style={styles.storyItem} key={el.id}>
                  <FeedItemThumbnailsCarousel data={el.data} />
                </View>
              );
            } else return null;
          })}
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
  storyItem: {
    marginVertical: 8,
  },
});

export default TaleViewScreen;

// const renderFooter = useCallback(
//   (props: BottomSheetFooterProps) => (
//     <BottomSheetFooter {...props} bottomInset={insets.bottom}>
//       <View style={styles.footerContainer}>
//         <GypsieButton
//           customButtonStyles={styles.footerButton}
//           customIconStyles={styles.footerButtonIcon}
//           customTextStyles={styles.footerButtonText}
//           Icon={CloneIcon}
//           text="Clone plan"
//           onPress={() => {}}
//         />
//         <GypsieButton
//           customButtonStyles={styles.footerButton}
//           customIconStyles={styles.footerButtonIcon}
//           customTextStyles={styles.footerButtonText}
//           Icon={SearchIcon}
//           text="Find guide"
//           onPress={() => {}}
//         />
//       </View>
//     </BottomSheetFooter>
//   ),
//   [insets, itineraryData],
// );

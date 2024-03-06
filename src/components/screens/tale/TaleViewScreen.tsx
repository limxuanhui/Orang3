import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
import {
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
} from "../../../utils/constants/constants";
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
import { BaseFeed, Feed, FeedItem, Media } from "../../feed/types/types";
import { BACKEND_BASE_URL } from "@env";
import FeedItemThumbnailsCarousel from "../../tale/FeedItemThumbnailsCarousel";
import { Tale } from "../../tale/types/types";
import useDataManager from "../../../utils/hooks/useDataManager";
import { QueryKey, queryOptions, useQuery } from "@tanstack/react-query";
import { DUMMY_DATABASE } from "../../../data/database";
import GypsieSkeleton from "../../common/GypsieSkeleton";
import { ActivityIndicator } from "react-native-paper";
import useBottomSheetHandlers from "../../../utils/hooks/useBottomSheetHandlers";
import { DIMENSION } from "../../../utils/constants/dimensions";
import { AuthContext } from "../../../utils/contexts/AuthContext";
import AuxiliaryControls from "../../common/AuxiliaryControls";
import { useAppDispatch, useAppSelector } from "../../../utils/redux/hooks";
import {
  itineraryPlanner_resetItineraryPlannerSlice,
  itineraryPlanner_setItinerary,
  itineraryPlanner_setMode,
} from "../../../utils/redux/reducers/itineraryPlannerSlice";
import EditIcon from "../../common/icons/EditIcon";
import type { DataKey } from "../../../data/types/types";

const TaleViewScreen = ({ navigation }: TaleViewScreenProps) => {
  const insets = useSafeAreaInsets();
  const userInfo = useContext(AuthContext);
  const { params } = useRoute<TaleViewScreenRouteProp>();
  const { id, creator } = params;
  const dispatch = useAppDispatch();
  const { mode } = useAppSelector(state => state.itineraryPlanner);

  /**
   * onPressChangeMode: allows user to change to edit mode to edit the tale if he/she is the creator.
   */
  const onPressChangeMode = useCallback(() => {
    if (mode === "view") {
      dispatch(itineraryPlanner_setMode({ mode: "edit" }));
      navigation.navigate("WriteTale", { taleId: id });
    }
  }, [navigation, mode, itineraryPlanner_setMode, dispatch]);

  const taleQueryFn = useCallback(
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

  const taleQueryOptions = useMemo(() => {
    const queryKey = ["tales", id];
    return queryOptions({
      queryKey,
      queryFn: taleQueryFn,
      networkMode: "online",
      // initialData: {
      //   id: "",
      //   creator: {
      //     id: "",
      //     handle: "",
      //     avatar: "",
      //   },
      //   cover: null,
      //   title: "",
      //   itinerary: {
      //     id: "",
      //     creatorId: "",
      //     routes: [
      //       {
      //         id: "",
      //         name: "Day 1",
      //         routeNodes: [],
      //         isRouted: false,
      //         polyline: [],
      //       },
      //     ],
      //   },
      //   story: [],
      // },
      enabled: true,
      gcTime: 1000 * 60 * 5,
      // staleTime: 1000,
    });
  }, [id, queryOptions, taleQueryFn]);

  const { data, isFetching, isError, isLoading, isPending, isPlaceholderData } =
    useQuery(taleQueryOptions);

  // use useQueries to fetch feeds with the array of feed id

  // Should I create this in useState and useEffect on mount?
  let renderedData: Feed[] = data?.feeds || [];
  if (data && data.id && data.cover) {
    const cover: FeedItem = {
      id: data.cover.id,
      media: data.cover,
      caption: ""
    };
    const coverFeed: BaseFeed = {
      id: data.cover.id,
      creator: data.creator,
      items: [cover],
    };
    renderedData = [coverFeed, ...data.feeds];
  }

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
  const { bottomSheetRef, snapPoints } = useBottomSheetHandlers({
    snapPointsArr: ["50%", "100%"],
  });
  const onPressExpandBottomSheet = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(0);
  }, [bottomSheetRef]);
  // Can I generalise this to useBottomSheetHandlers?
  const renderBackdrop = useCallback(
    (props: BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        style={[
          props.style,
          {
            backgroundColor: PALETTE.TRANSPARENT,
          },
        ]}
        opacity={1}
        disappearsOnIndex={-1}
        appearsOnIndex={0}>
        {data?.title && (
          <View style={styles.headerTextBox}>
            <Text style={styles.headerText}>{data?.title}</Text>
          </View>
        )}
      </BottomSheetBackdrop>
    ),
    [data],
  );

  /**
   * This useEffect is for pre-setting itineraryPlannerSlice data if tale data has been loaded, and resets the slice on unmount.
   */
  useEffect(() => {
    if (data) {
      dispatch(itineraryPlanner_setItinerary({ itinerary: data.itinerary }));
    }
    return () => {
      dispatch(itineraryPlanner_resetItineraryPlannerSlice());
    };
  }, [
    data,
    itineraryPlanner_setItinerary,
    itineraryPlanner_resetItineraryPlannerSlice,
    dispatch,
  ]);

  return (
    <View style={styles.container}>
      {!data && isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size={48} color={PALETTE.ORANGE} />
        </View>
      ) : (
        <>
          <FlatList
            data={renderedData}
            renderItem={({ item, index }) => (
              <FeedCarousel
                handle={creator.handle}
                items={item.items}
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
          {/* Render a button here for creator to change default mode to edit */}
          {creator.id !== userInfo.user?.id ? (
            <AuxiliaryControls
              customStyle={{
                top: insets.top,
                justifyContent: "flex-start",
                height: "auto",
                // backgroundColor: "red",
              }}
              position="top-right">
              <GypsieButton
                customButtonStyles={{
                  width: 40,
                  height: 40,
                  backgroundColor: "#00000044",
                  borderRadius: 20,
                }}
                customIconStyles={{
                  fontSize: 24,
                  color: PALETTE.ORANGE,
                }}
                Icon={EditIcon}
                onPress={onPressChangeMode}
              />
            </AuxiliaryControls>
          ) : null}
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
              avatarUri={data?.creator.avatar?.uri || ""}
              name={data?.creator.handle || ""}
            />
            <BottomSheetScrollView
              contentContainerStyle={{ paddingBottom: insets.bottom }}
              showsVerticalScrollIndicator={false}>
              {data && data.itinerary.routes.length > 0 ? (
                <ItineraryMapOverview
                  itineraryId={""}
                  creatorId={params.creator.id}
                />
              ) : null}
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
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
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
    justifyContent: "center",
    bottom: 0.5 * DEVICE_HEIGHT,
    minHeight: 60,
    width: DIMENSION.HUNDRED_PERCENT,
    paddingHorizontal: 16,
    backgroundColor: "#00000044",
  },
  headerText: {
    color: PALETTE.WHITE,
    fontSize: 40,
    lineHeight: 40,
    fontFamily: "Lilita One",
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

// footerContainer: {
//   flexDirection: "row",
//   justifyContent: "space-evenly",
//   padding: 12,
//   margin: 12,
//   borderRadius: 12,
//   // backgroundColor: "#80f",
//   backgroundColor: PALETTE.GREYISHBLUE,
//   // backgroundColor: "transparent",
//   shadowColor: PALETTE.DARKGREY,
//   shadowRadius: 2,
//   shadowOpacity: 0.2,
//   shadowOffset: {
//     height: 0,
//     width: 0,
//   },
// },
// footerText: {
//   textAlign: "center",
//   color: "white",
//   fontWeight: "800",
// },
// footerButton: { width: "auto", borderWidth: 0, borderColor: "red" },
// footerButtonText: { fontSize: 12, color: PALETTE.OFFWHITE },
// footerButtonIcon: {
//   // color: PALETTE.WHITE,
//   fontSize: 16,
//   color: PALETTE.ORANGE,
// },

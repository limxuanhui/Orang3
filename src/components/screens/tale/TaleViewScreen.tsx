import { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ActivityIndicator } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';

import GypsieButton from '@components/common/buttons/GypsieButton';
import NewItineraryPostHandleBar from '@components/post/NewItineraryPostHandleBar';
import FeedCarousel from '@components/feed/FeedCarousel';
import {
  StoryItem,
  StoryItemType,
  StoryMedia,
  StoryText,
} from '@components/post/types/types';

import type {
  TaleViewScreenProps,
  TaleViewScreenRouteProp,
} from '../post/types/types';
import ItineraryMapOverview from '@components/post/ItineraryMapOverview';

import { BaseFeed, Feed, FeedItem } from '@components/feed/types/types';
import FeedItemThumbnailsCarousel from '@components/tale/FeedItemThumbnailsCarousel';

import { PALETTE } from '@constants/palette';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '@constants/constants';
import { VIEWABILITY_CONFIG } from '@constants/feed';
import { DIMENSION } from '@constants/dimensions';

import useBottomSheetHandlers from '@hooks/useBottomSheetHandlers';
import { useAppDispatch } from '@redux/hooks';
import {
  itineraryPlanner_initItinerary,
  itineraryPlanner_resetItineraryPlannerSlice,
} from '@redux/reducers/itineraryPlannerSlice';

import ChevronsUpIcon from '@icons/ChevronsUp';
import useDataManager from '@hooks/useDataManager';
import { STORY_TEXT_STYLES } from '@constants/text';
import { FeedItemThumbnailsDisplayFormat } from '@components/tale/types/types';
import { decodePolyline, printPrettyJson } from '@helpers/functions';
import { Itinerary, Route } from '@components/itinerary/types/types';

const TaleViewScreen = ({}: TaleViewScreenProps) => {
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const { params } = useRoute<TaleViewScreenRouteProp>();
  const { id, creator } = params;
  const { data, isLoading } = useDataManager('tales', [id]);

  let renderedData: Feed[] = data?.feeds || [];
  if (
    data &&
    data.tale &&
    data.tale.metadata &&
    data.tale.metadata.id &&
    data.tale.metadata.cover
  ) {
    const cover: FeedItem = {
      id: data.tale.metadata.cover.id,
      media: data.tale.metadata.cover,
      caption: '',
      thumbnail: data.tale.metadata.thumbnail,
      feedId: '',
    };
    const coverFeed: BaseFeed = {
      metadata: {
        id: data.tale.metadata.cover.id,
        creator: data.tale.metadata.creator,
        thumbnail: data.tale.metadata.thumbnail,
        taleId: '',
      },
      feedItems: [cover],
    };
    renderedData = [coverFeed, ...data.feedList];
  }

  const [activePostIndex, setActivePostIndex] = useState<number>(0);
  const onViewableFeedChanged = useCallback(
    // Change type to more suitable one
    ({ viewableItems, _changed }: any) => {
      console.log('ViewableFeedChanged');
      if (viewableItems && viewableItems?.length > 0) {
        setActivePostIndex(viewableItems[0].index);
      }
    },
    [setActivePostIndex],
  );
  const { bottomSheetRef, snapPoints } = useBottomSheetHandlers({
    snapPointsArr: ['50%', '100%'],
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
        {data.tale.metadata.title && (
          <View style={styles.headerTextBox}>
            <Text style={styles.headerText}>{data.tale.metadata.title}</Text>
            <NewItineraryPostHandleBar
              name={data.tale.metadata.creator.handle || ''}
              avatarUri={data.tale.metadata.creator.avatar?.uri || ''}
            />
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
      console.log('Setting itinerary in itineraryPlannerSlice');
      const itinerary: Itinerary = {
        metadata: data.tale.itinerary.metadata,
        routes: data.tale.itinerary.routes.map((route: Route) => {
          const decodedRoute = {
            ...route,
            polyline: decodePolyline(route.encodedPolyline),
          };
          return decodedRoute;
        }),
      };
      printPrettyJson(itinerary);
      dispatch(itineraryPlanner_initItinerary({ itinerary }));
    }
    return () => {
      dispatch(itineraryPlanner_resetItineraryPlannerSlice());
    };
  }, [data, dispatch]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.flexCenter}>
          <ActivityIndicator size={48} color={PALETTE.ORANGE} />
        </View>
      ) : data ? (
        <>
          <FlatList
            data={renderedData}
            renderItem={({ item, index }) => (
              <FeedCarousel
                handle={creator.handle}
                items={item.feedItems}
                inView={index === activePostIndex}
              />
            )}
            ListEmptyComponent={<Text>Loading tale data...</Text>}
            showsVerticalScrollIndicator={false}
            snapToInterval={DEVICE_HEIGHT}
            snapToAlignment="start"
            decelerationRate={'fast'}
            viewabilityConfig={VIEWABILITY_CONFIG}
            onViewableItemsChanged={onViewableFeedChanged}
          />
          <GypsieButton
            customButtonStyles={{ position: 'absolute', bottom: insets.bottom }}
            customIconStyles={{ color: 'orange', fontSize: 40 }}
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
            <BottomSheetScrollView
              contentContainerStyle={{ paddingBottom: insets.bottom }}
              showsVerticalScrollIndicator={false}>
              {data && data.tale && data.tale.itinerary.routes.length > 0 ? (
                <ItineraryMapOverview
                  itineraryId={''}
                  creatorId={params.creator.id}
                />
              ) : null}
              {data.tale.story.map((el: StoryItem) => {
                if (el.type === StoryItemType.Text) {
                  const textEl = el as StoryText;
                  return (
                    <View style={styles.storyText} key={el.id}>
                      <Text
                        style={[
                          STORY_TEXT_STYLES[textEl.data.style],
                          {
                            paddingHorizontal:
                              textEl.data.style.toString() === '0' ? 16 : 24,
                          },
                        ]}>
                        {textEl.data.text}
                      </Text>
                    </View>
                  );
                } else if (el.type === StoryItemType.Media) {
                  const mediaEl = el as StoryMedia;
                  return (
                    <View style={styles.storyMedia} key={mediaEl.id}>
                      <FeedItemThumbnailsCarousel
                        feedId={mediaEl.data.feedId}
                        displayFormat={FeedItemThumbnailsDisplayFormat.CAROUSEL}
                      />
                    </View>
                  );
                } else {
                  return null;
                }
              })}
            </BottomSheetScrollView>
          </BottomSheet>
        </>
      ) : null}
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
    height: 'auto',
    // paddingVertical: 8,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: PALETTE.OFFWHITE,
  },
  headerTextBox: {
    position: 'absolute',
    justifyContent: 'center',
    bottom: 0.5 * DEVICE_HEIGHT,
    minHeight: 60,
    width: DIMENSION.HUNDRED_PERCENT,
    paddingHorizontal: 16,
    backgroundColor: '#00000044',
  },
  headerText: {
    color: PALETTE.WHITE,
    fontSize: 40,
    lineHeight: 40,
    fontFamily: 'Lilita One',
  },
  storyText: {
    marginVertical: 8,
  },
  storyMedia: {
    marginVertical: 16,
  },
  flexCenter: { flex: 1, justifyContent: 'center', alignItems: 'center' },
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

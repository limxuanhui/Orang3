import { useCallback, useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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

import type { TaleViewScreenProps } from '../post/types/types';
import ItineraryMapOverview from '@components/post/ItineraryMapOverview';

import { BaseFeed, Feed, FeedItem, Media } from '@components/feed/types/types';
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

import ChevronsUpIcon from '@icons/ChevronsUpIcon';
import useDataManager from '@hooks/useDataManager';
import { STORY_TEXT_STYLES } from '@constants/text';
import {
  FeedItemThumbnailsDisplayFormat,
  Tale,
} from '@components/tale/types/types';
import { decodePolyline } from '@helpers/functions';
import { Itinerary, Route } from '@components/itinerary/types/types';
import { AuthContext } from '@contexts/AuthContext';
import MessageDisplay from '@components/common/MessageDisplay';
import EditIcon from '@icons/EditIcon';
import AuxiliaryControls from '@components/common/AuxiliaryControls';
import FullScreenLoading from '@components/common/FullScreenLoading';
import { useFocusEffect } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { GypsieUser } from 'components/navigators/types/types';

export type TaleView = { tale: Tale; feedList: Feed[] };
const SUNDAY_FEED_THUMBNAIL: Media = {
  id: 'ADAWDZSDADS',
  type: 'image/png',
  // uri: 'assets/images/logo-no-background.png',
  uri: '/Users/limxuanhui/bluextech/gypsie/assets/images/logo-no-background.png',
  height: 429 * (200 / 1000),
  width: 200,
};
const TaleViewScreen = ({ navigation, route }: TaleViewScreenProps) => {
  const insets = useSafeAreaInsets();
  const { user } = useContext(AuthContext);
  const [screenIsFocused, setScreenIsFocused] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const { id, creatorId } = route.params;
  const loggedInUserIsCreator: boolean = user?.id === creatorId;
  const { data, isLoading } = useDataManager<TaleView>('tale-by-taleid', id);
  const { data: creator, isLoading: creatorIsLoading } =
    useDataManager<GypsieUser>('user-by-userid', creatorId);

  let renderedData: Feed[] = data?.feedList || [];
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
      thumbnail: data.tale.metadata.thumbnail || SUNDAY_FEED_THUMBNAIL,
      feedId: '',
      order: 0,
    };
    const coverFeed: BaseFeed = {
      metadata: {
        id: data.tale.metadata.cover.id,
        creatorId: data.tale.metadata.creatorId,
        thumbnail: data.tale.metadata.thumbnail || SUNDAY_FEED_THUMBNAIL,
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
    snapPointsArr: ['30%', '100%'],
  });
  const onPressExpandBottomSheet = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(0);
  }, [bottomSheetRef]);
  // Can I generalise this to useBottomSheetHandlers?
  const renderBackdrop = useCallback(
    (props: BottomSheetDefaultBackdropProps) => {
      if (data) {
        return (
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
              <LinearGradient
                style={styles.linearGradient}
                colors={['#00000011', '#00000022', '#00000033']}>
                <View style={styles.headerTextBox}>
                  <Text
                    style={styles.headerText}
                    numberOfLines={8}
                    ellipsizeMode="tail">
                    {data.tale.metadata.title}
                  </Text>
                  <NewItineraryPostHandleBar
                    name={creator?.handle || ''}
                    avatarUri={creator?.avatar?.uri || ''}
                  />
                </View>
              </LinearGradient>
            )}
          </BottomSheetBackdrop>
        );
      }
      return null;
    },
    [data],
  );

  const onPressEdit = useCallback(() => {
    navigation.push('WriteTale', { taleId: id });
  }, [id, navigation]);

  useFocusEffect(
    useCallback(() => {
      setScreenIsFocused(true);
      return () => setScreenIsFocused(false);
    }, [setScreenIsFocused]),
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

      dispatch(itineraryPlanner_initItinerary({ itinerary }));
    }
    return () => {
      dispatch(itineraryPlanner_resetItineraryPlannerSlice());
    };
  }, [data, dispatch]);

  if (isLoading || creatorIsLoading) {
    return <FullScreenLoading />;
  }

  if (creator?.isDeactivated) {
    return (
      <MessageDisplay
        containerStyle={styles.container}
        message="This user has deactivated their account :("
      />
    );
  }

  return (
    <View style={styles.container}>
      {data ? (
        <>
          {loggedInUserIsCreator ? (
            <AuxiliaryControls
              customStyle={styles.auxiliary}
              position="top-right">
              <GypsieButton
                customButtonStyles={styles.editButton}
                customIconStyles={styles.editIcon}
                Icon={EditIcon}
                onPress={onPressEdit}
              />
            </AuxiliaryControls>
          ) : null}
          <FlatList
            data={renderedData}
            renderItem={({ item, index }) => (
              <FeedCarousel
                handle={creator?.handle as string}
                items={item.feedItems}
                inView={screenIsFocused && index === activePostIndex}
              />
            )}
            showsVerticalScrollIndicator={false}
            snapToInterval={DEVICE_HEIGHT}
            snapToAlignment="start"
            decelerationRate={'fast'}
            viewabilityConfig={VIEWABILITY_CONFIG}
            onViewableItemsChanged={onViewableFeedChanged}
            // ListEmptyComponent={<Text>Loading tale data...</Text>}
          />
          <GypsieButton
            customButtonStyles={[
              styles.expandButton,
              { bottom: insets.bottom },
            ]}
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
              {data &&
              data.tale &&
              data.tale.itinerary &&
              data.tale.itinerary.routes.length > 0 ? (
                <ItineraryMapOverview />
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
      ) : (
        <MessageDisplay message="Unable to display story..." />
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
  auxiliary: {
    top: 50,
    justifyContent: 'flex-start',
  },
  editButton: {
    height: 32,
    width: 32,
  },
  editIcon: { color: PALETTE.ORANGE, fontSize: 24 },
  bottomSheet: {
    height: 'auto',
    // paddingVertical: 8,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: PALETTE.OFFWHITE,
  },
  expandButton: { position: 'absolute' },
  linearGradient: {
    // height: DIMENSION.HUNDRED_PERCENT,
    // width: DIMENSION.HUNDRED_PERCENT,
    flex: 1,
    backgroundColor: '#00000044',
  },
  headerTextBox: {
    position: 'absolute',
    bottom: 0.3 * DEVICE_HEIGHT,
    justifyContent: 'center',
    width: DIMENSION.HUNDRED_PERCENT,
    paddingHorizontal: 16,
  },
  headerText: {
    // fontFamily: 'Futura',
    // fontFamily: 'Lilita One',
    fontFamily: 'Avenir',
    fontSize: 40,
    fontWeight: 'bold',
    color: PALETTE.WHITE,
    lineHeight: 48,
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

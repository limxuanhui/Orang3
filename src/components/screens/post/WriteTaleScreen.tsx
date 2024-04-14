import { Image, Text } from 'react-native';
import { useRef } from 'react';
import {
  GestureResponderHandlers,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import Video from 'react-native-video';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ActivityIndicator } from 'react-native-paper';
import { KeyboardAccessoryView } from '@flyerhq/react-native-keyboard-accessory-view';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Portal } from '@gorhom/portal';

import AuxiliaryControls from '@components/common/AuxiliaryControls';
import GypsieButton from '@components/common/buttons/GypsieButton';
import ItineraryMapOverview from '@components/post/ItineraryMapOverview';
import FeedItemThumbnailsCarousel from '@components/tale/FeedItemThumbnailsCarousel';

import AddIcon from '@icons/AddIcon';
import CameraOutlineIcon from '@icons/CameraOutlineIcon';
import ChangeSwapIcon from '@icons/ChangeSwapIcon';
import CheckIcon from '@icons/CheckIcon';
import DeleteOutlineIcon from '@icons/DeleteOutlineIcon';
import FolderImagesIcon from '@icons/FolderImagesIcon';
import ParagraphIcon from '@icons/ParagraphIcon';
import TitleIcon from '@icons/TitleIcon';

import useWriteTaleManager from '@components/../utils/hooks/useWriteTaleManager';
import type { WriteTaleScreenProps } from './types/types';

import NewStoryItem from '@components/post/NewStoryItem';

import { FULL_SCREEN } from '@components/../utils/constants/constants';
import { DIMENSION } from '@components/../utils/constants/dimensions';
import { PALETTE } from '@components/../utils/constants/palette';
import { nanoid } from '@reduxjs/toolkit';
import { StoryItem } from '@components/post/types/types';
import { Feed } from '@components/feed/types/types';
import { FeedItemThumbnailsDisplayFormat } from '@components/tale/types/types';
import { AWS_CLOUDFRONT_URL_RAW } from '@env';

const WriteTaleScreen = ({ route }: WriteTaleScreenProps) => {
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef<KeyboardAwareScrollView>(null);
  const { taleId } = route.params;
  console.log('TALE ID:', taleId);

  const {
    bottomSheetRef,
    snapPoints,
    keyboardIsVisible,
    metadata,
    // itinerary,
    story,
    posting,
    // data,
    isLoading,
    feedsThumbnails,
    feedsThumbnailsIsLoading,
    closeKeyboard,
    closeBottomSheet,
    renderBackdrop,
    onPressAddCover,
    onPressClearCover,
    onTitleChange,
    onStoryItemTextChange,
    onPressAddTitle,
    onPressAddParagraph,
    onPressShowLinkedFeeds,
    onPressAddLinkedFeed,
    onPressDeleteStoryItem,
    onSubmitPost,
  } = useWriteTaleManager(taleId);

  return isLoading ? (
    <View
      style={[
        styles.flexCenter,
        {
          backgroundColor: PALETTE.GREYISHBLUE,
        },
      ]}>
      <ActivityIndicator size={48} color={PALETTE.ORANGE} />
    </View>
  ) : (
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
            // onContentSizeChange={onContentSizeChange}
            // onScrollBeginDrag={onScroll}
            scrollEventThrottle={60}
            {...panHandlers}>
            <View style={styles.coverContainer}>
              {metadata.cover ? (
                <>
                  {metadata.cover.type?.startsWith('video') ? (
                    <Video
                      style={styles.cover}
                      source={{
                        uri: taleId
                          ? `${AWS_CLOUDFRONT_URL_RAW}/${metadata.cover.uri}`
                          : metadata.cover.uri,
                      }}
                      controls
                      repeat
                      resizeMode="contain"
                    />
                  ) : (
                    <Image
                      style={styles.cover}
                      source={{
                        uri: taleId
                          ? `${AWS_CLOUDFRONT_URL_RAW}/${metadata.cover.uri}`
                          : metadata.cover.uri,
                      }}
                      resizeMode="cover"
                    />
                  )}
                  <AuxiliaryControls
                    customStyle={{
                      height: '50%',
                    }}
                    orientation="vertical"
                    position="bottom-right">
                    <GypsieButton
                      customIconStyles={{
                        color: PALETTE.OFFWHITE,
                        fontSize: 24,
                      }}
                      Icon={DeleteOutlineIcon}
                      onPress={onPressClearCover}
                    />
                    <GypsieButton
                      customIconStyles={{
                        color: PALETTE.OFFWHITE,
                        fontSize: 24,
                      }}
                      Icon={ChangeSwapIcon}
                      onPress={onPressAddCover}
                    />
                  </AuxiliaryControls>
                </>
              ) : (
                <GypsieButton
                  customButtonStyles={styles.addCoverButton}
                  customIconStyles={{ fontSize: 64, color: PALETTE.OFFWHITE }}
                  Icon={CameraOutlineIcon}
                  onPress={onPressAddCover}
                />
              )}
            </View>
            <View
              style={[
                styles.blogContainer,
                { marginBottom: 100 + insets.bottom },
              ]}>
              <TextInput
                style={styles.titleInput}
                value={metadata.title}
                multiline
                placeholder="Write a title"
                placeholderTextColor={PALETTE.LIGHTERGREY}
                maxLength={100}
                onChangeText={onTitleChange}
                onBlur={() => {
                  console.warn('clicked out');
                }}
                scrollEnabled={false}
              />
              <ItineraryMapOverview canEdit />
              <View style={{}}>
                {story.map((el: StoryItem, index: number) => (
                  <NewStoryItem
                    key={el.id}
                    item={el}
                    onStoryItemTextChange={onStoryItemTextChange}
                    onPressDeleteStoryItem={() => onPressDeleteStoryItem(index)}
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
              {feedsThumbnailsIsLoading ? (
                <View style={styles.flexCenter}>
                  <ActivityIndicator size={60} color={PALETTE.ORANGE} />
                </View>
              ) : feedsThumbnails ? (
                feedsThumbnails.length === 0 ? (
                  <View style={styles.flexCenter}>
                    <Text style={styles.flexCenterDescription}>
                      You don't have any feeds...
                    </Text>
                  </View>
                ) : (
                  <BottomSheetScrollView
                    style={{
                      padding: 8,
                    }}
                    showsVerticalScrollIndicator={false}>
                    {feedsThumbnails.map((feed: Feed, index: number) => {
                      const alreadyAdded: boolean = !!story.find(
                        (el: StoryItem) => el.id === feed.metadata.id,
                      );
                      return (
                        <View
                          style={styles.feedItemThumbnailsList}
                          key={nanoid()}>
                          <FeedItemThumbnailsCarousel
                            feedId={feed.metadata.id}
                            displayFormat={
                              FeedItemThumbnailsDisplayFormat.CAROUSEL
                            }
                            closeBottomSheet={closeBottomSheet}
                          />
                          <GypsieButton
                            customButtonStyles={[
                              styles.addLinkedFeedButton,
                              {
                                backgroundColor: alreadyAdded
                                  ? PALETTE.LIGHTERGREY
                                  : PALETTE.OFFWHITE,
                              },
                            ]}
                            customIconStyles={[
                              styles.addLinkedFeedIcon,
                              {
                                color: alreadyAdded
                                  ? PALETTE.WHITE
                                  : PALETTE.ORANGE,
                              },
                            ]}
                            Icon={AddIcon}
                            onPress={() => onPressAddLinkedFeed(index)}
                            disabled={alreadyAdded}
                          />
                        </View>
                      );
                    })}
                  </BottomSheetScrollView>
                )
              ) : (
                <View style={styles.flexCenter}>
                  <Text style={styles.flexCenterDescription}>
                    Could not find your feeds at the moment...
                  </Text>
                </View>
              )}
            </BottomSheet>
          </Portal>
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
          onPress={onPressShowLinkedFeeds}
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
                width: 'auto',
                backgroundColor:
                  posting || metadata.title === ''
                    ? PALETTE.GREY
                    : PALETTE.ORANGE,
                borderRadius: 6,
              },
            ]}
            customTextStyles={{
              fontSize: 16,
              fontWeight: 'bold',
              color: PALETTE.OFFWHITE,
            }}
            // Icon={posting &&  ActivityIndicator}
            text={posting ? 'Posting' : 'Post'}
            onPress={onSubmitPost}
            loading={posting}
            disabled={posting || metadata.title === ''}
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
    backgroundColor: PALETTE.OFFWHITE,
  },
  scrollViewContainer: {
    backgroundColor: PALETTE.OFFWHITE,
    // backgroundColor: PALETTE.GREYISHBLUE,
  },
  scrollView: { flexGrow: 1, backgroundColor: PALETTE.OFFWHITE },
  coverContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 250,
    width: DIMENSION.HUNDRED_PERCENT,
    backgroundColor: PALETTE.GREYISHBLUE,
  },
  cover: {
    height: DIMENSION.HUNDRED_PERCENT,
    width: DIMENSION.HUNDRED_PERCENT,
  },
  addCoverButton: {
    position: 'absolute',
    height: 80,
    width: 200,
    shadowColor: PALETTE.WHITE,
    shadowRadius: 16,
    shadowOpacity: 0.5,
    shadowOffset: { height: 0, width: 0 },
  },
  blogContainer: {
    backgroundColor: PALETTE.OFFWHITE,
  },
  titleInput: {
    width: DIMENSION.HUNDRED_PERCENT,
    paddingTop: 16,
    paddingBottom: 4,
    paddingHorizontal: 8,
    fontFamily: 'Futura',
    fontSize: 40,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: PALETTE.LIGHTERGREY,
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: DIMENSION.HUNDRED_PERCENT,
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
  },
  bottomControl: {
    height: 32,
    width: 40,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  addLinkedFeedButton: {
    marginHorizontal: 8,
    height: 32,
    width: 32,
    borderRadius: 24,
    shadowColor: PALETTE.BLACK,
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: { height: 0, width: 0 },
  },
  addLinkedFeedIcon: {
    fontSize: 32,
    color: PALETTE.ORANGE,
  },
  feedItemThumbnailsList: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
  },
  flexCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexCenterDescription: {
    color: PALETTE.GREY,
    fontFamily: 'Futura',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default WriteTaleScreen;

// const [currScrollPosition, setCurrScrollPosition] = useState<number>(0);
// const [prevHeight, setPrevHeight] = useState<number>(DEVICE_HEIGHT);

// // Called every scrollEventThrottle ms (60 ms)
// const onScroll = useCallback(
//   (e: NativeSyntheticEvent<NativeScrollEvent>) => {
//     console.log('Scrolling...');
//     setCurrScrollPosition(e.nativeEvent.contentOffset.y);
//   },
//   [setCurrScrollPosition],
// );

// // Scroll up or down depending on content size change
// const onContentSizeChange = useCallback((w: number, h: number) => {
//   console.log('W: ', w, ' | h: ', h);
//   // if (scrollViewRef !== null)
//   //   scrollViewRef.current?.scrollToPosition(
//   //     0,
//   //     currScrollPosition + h - prevHeight + 10,
//   //     true,
//   //   );
//   // setPrevHeight(h);
//   // setCurrScrollPosition(h);
// }, []);

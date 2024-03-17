import { Image, Text } from 'react-native';
import { useContext, useRef } from 'react';
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
import { AuthContext } from '@components/../utils/contexts/AuthContext';

import { FULL_SCREEN } from '@components/../utils/constants/constants';
import { DIMENSION } from '@components/../utils/constants/dimensions';
import { PALETTE } from '@components/../utils/constants/palette';
import { nanoid } from '@reduxjs/toolkit';
import { StoryItem } from '@components/post/types/types';

const WriteTaleScreen = ({ route }: WriteTaleScreenProps) => {
  const insets = useSafeAreaInsets();
  const userInfo = useContext(AuthContext);
  const { taleId } = route.params;
  console.log('TALE ID:', taleId);

  const {
    bottomSheetRef,
    snapPoints,
    keyboardIsVisible,
    metadata,
    itinerary,
    story,
    posting,
    feedItemThumbnails,
    // data,
    isLoading,
    closeKeyboard,
    renderBackdrop,
    onPressAddCover,
    onPressClearCover,
    onTitleChange,
    onStoryItemTextChange,
    onPressAddTitle,
    onPressAddParagraph,
    onPressShowLinkedFeeds,
    onPressAddLinkedFeed,
    onPressDeleteLinkedFeed,
    onSubmitPost,
  } = useWriteTaleManager(taleId);

  // const [currScrollPosition, setCurrScrollPosition] = useState<number>(0);
  // const [prevHeight, setPrevHeight] = useState<number>(DEVICE_HEIGHT);
  const scrollViewRef = useRef<KeyboardAwareScrollView>(null);

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

  return isLoading ? (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: PALETTE.GREYISHBLUE,
      }}>
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
              {metadata.cover !== undefined ? (
                <>
                  {metadata.cover.type?.startsWith('video') ? (
                    <Video
                      style={styles.cover}
                      source={{ uri: metadata.cover.uri }}
                      controls
                      repeat
                      resizeMode="contain"
                    />
                  ) : (
                    <Image
                      style={styles.cover}
                      source={{ uri: metadata.cover.uri }}
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
                      customIconStyles={{ color: PALETTE.WHITE, fontSize: 24 }}
                      Icon={DeleteOutlineIcon}
                      onPress={onPressClearCover}
                    />
                    <GypsieButton
                      customIconStyles={{ color: PALETTE.WHITE, fontSize: 24 }}
                      Icon={ChangeSwapIcon}
                      onPress={onPressAddCover}
                    />
                  </AuxiliaryControls>
                </>
              ) : (
                <GypsieButton
                  customButtonStyles={styles.addCoverButton}
                  customIconStyles={{ fontSize: 64, color: PALETTE.LIGHTGREY }}
                  Icon={CameraOutlineIcon}
                  onPress={onPressAddCover}
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
              <ItineraryMapOverview
                itineraryId={itinerary.id}
                creatorId={userInfo.user?.id || ''}
              />
              <View style={{}}>
                {story.map((el: StoryItem, index: number) => (
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
              {feedItemThumbnails.status === 'succeeded' ? (
                <BottomSheetScrollView
                  style={{
                    padding: 8,
                  }}
                  showsVerticalScrollIndicator={false}>
                  {feedItemThumbnails.data.map(el => (
                    <View style={styles.feedItemThumbnailsList} key={nanoid()}>
                      <FeedItemThumbnailsCarousel data={el} />
                      <GypsieButton
                        customButtonStyles={styles.addLinkedFeedButton}
                        customIconStyles={{ fontSize: 32 }}
                        Icon={AddIcon}
                        onPress={onPressAddLinkedFeed}
                      />
                    </View>
                  ))}
                </BottomSheetScrollView>
              ) : feedItemThumbnails.status === 'failed' ? (
                <View
                  style={{
                    flex: 1,
                    // flexDirection: 'row',
                    borderWidth: 1,
                    borderColor: 'red',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Futura',
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
                      width: 'auto',
                      paddingVertical: 8,
                      paddingHorizontal: 16,
                    }}
                    customTextStyles={{
                      fontFamily: 'Futura',
                      fontSize: 16,
                      fontWeight: 'bold',
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
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <ActivityIndicator size={60} color={PALETTE.ORANGE} />
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
  },
  scrollView: { flexGrow: 1 },
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
    padding: 8,
    backgroundColor: PALETTE.OFFWHITE,
  },
  titleInput: {
    width: DIMENSION.HUNDRED_PERCENT,
    fontFamily: 'Futura',
    fontSize: 40,
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
    height: 40,
    width: 40,
    borderRadius: 24,
    backgroundColor: PALETTE.ORANGE,
  },
  feedItemThumbnailsList: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
  },
});

export default WriteTaleScreen;

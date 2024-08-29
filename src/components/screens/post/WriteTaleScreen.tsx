import { useRef } from 'react';
import { Image, Text } from 'react-native';
import { StyleSheet, TextInput, View } from 'react-native';
import Video from 'react-native-video';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ActivityIndicator } from 'react-native-paper';
import Config from 'react-native-config';
import { KeyboardStickyView } from 'react-native-keyboard-controller';
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

import { FULL_SCREEN } from '@constants/constants';
import { DIMENSION } from '@constants/dimensions';
import { PALETTE } from '@constants/palette';
import { nanoid } from '@reduxjs/toolkit';
import { StoryItem } from '@components/post/types/types';
import { Feed } from '@components/feed/types/types';
import { FeedItemThumbnailsDisplayFormat } from '@components/tale/types/types';

import FullScreenLoading from '@components/common/FullScreenLoading';

const WriteTaleScreen = ({ route }: WriteTaleScreenProps) => {
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef<KeyboardAwareScrollView>(null);
  const { taleId } = route.params;

  const {
    bottomSheetRef,
    snapPoints,
    keyboardIsVisible,
    mode,
    metadata,
    story,
    posting,
    postButtonIsDisabled,
    isLoading,
    feedsThumbnails,
    feedsThumbnailsIsLoading,
    closeKeyboard,
    closeBottomSheet,
    renderBackdrop,
    onPressAddCover,
    onPressClearCover,
    onTitleChange,
    onTitleChangeEnded,
    onStoryItemTextChange,
    onPressAddTitle,
    onPressAddParagraph,
    onPressShowLinkedFeeds,
    onPressAddLinkedFeed,
    onPressDeleteStoryItemByIndex,
    onSubmitPost,
  } = useWriteTaleManager(taleId);

  if (isLoading) {
    return <FullScreenLoading />;
  }

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <KeyboardAwareScrollView
        ref={scrollViewRef}
        style={styles.scrollViewContainer}
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="interactive"
        scrollEventThrottle={60}
        // automaticallyAdjustContentInsets
        // automaticallyAdjustKeyboardInsets
        // extraScrollHeight={100}
        // endFillColor={PALETTE.REDPINK}
      >
        <View style={styles.coverContainer}>
          {metadata.cover ? (
            <>
              {metadata.cover.type?.startsWith('video') ? (
                <Video
                  style={styles.cover}
                  source={{
                    uri:
                      taleId && !metadata.cover.uri.startsWith('file://')
                        ? `${Config.AWS_CLOUDFRONT_URL_RAW}/${metadata.cover.uri}`
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
                    uri:
                      taleId && !metadata.cover.uri.startsWith('file://')
                        ? `${Config.AWS_CLOUDFRONT_URL_RAW}/${metadata.cover.uri}`
                        : metadata.cover.uri,
                  }}
                  resizeMode="cover"
                />
              )}
              <AuxiliaryControls
                customStyle={styles.auxiliaryControls}
                orientation="vertical"
                position="bottom-right">
                <GypsieButton
                  customIconStyles={styles.auxiliaryIcon}
                  Icon={DeleteOutlineIcon}
                  onPress={onPressClearCover}
                />
                <GypsieButton
                  customIconStyles={styles.auxiliaryIcon}
                  Icon={ChangeSwapIcon}
                  onPress={onPressAddCover}
                />
              </AuxiliaryControls>
            </>
          ) : (
            <GypsieButton
              customButtonStyles={styles.addCoverButton}
              customIconStyles={styles.addCoverIcon}
              Icon={CameraOutlineIcon}
              onPress={onPressAddCover}
            />
          )}
        </View>
        <View
          style={[
            styles.blogContainer,
            {
              marginBottom: insets.bottom + 100,
              paddingBottom: insets.bottom,
            },
          ]}>
          <View>
            <TextInput
              style={styles.titleInput}
              value={metadata.title}
              multiline
              placeholder="Write a title"
              placeholderTextColor={PALETTE.LIGHTERGREY}
              numberOfLines={8} // android
              maxLength={100}
              scrollEnabled={false}
              selectionColor={PALETTE.ORANGE}
              onChangeText={onTitleChange}
              onBlur={onTitleChangeEnded}
            />
            <Text
              style={
                styles.titleInputCounter
              }>{`${metadata.title.length} / 100`}</Text>
          </View>
          <ItineraryMapOverview canEdit />
          <View>
            {story.map((el: StoryItem, index: number) => (
              <NewStoryItem
                key={el.id}
                item={el}
                onStoryItemTextChange={onStoryItemTextChange}
                onPressDeleteStoryItem={() =>
                  onPressDeleteStoryItemByIndex(index)
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
                  const alreadyAdded: boolean =
                    feed.metadata.taleId !== '' ||
                    !!story.find((el: StoryItem) => el.id === feed.metadata.id);
                  return (
                    <View style={styles.feedItemThumbnailsList} key={nanoid()}>
                      <FeedItemThumbnailsCarousel
                        feedId={feed.metadata.id}
                        displayFormat={FeedItemThumbnailsDisplayFormat.CAROUSEL}
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
      <KeyboardStickyView
        style={styles.bottomControls}
        offset={{ closed: -insets.bottom, opened: 0 }}>
        <GypsieButton
          customButtonStyles={styles.bottomControlButton}
          customIconStyles={styles.bottomControlIcon}
          Icon={TitleIcon}
          onPress={onPressAddTitle}
          disabled={posting}
        />
        <GypsieButton
          customButtonStyles={styles.bottomControlButton}
          customIconStyles={styles.bottomControlIcon}
          Icon={ParagraphIcon}
          onPress={onPressAddParagraph}
          disabled={posting}
        />
        <GypsieButton
          customButtonStyles={styles.bottomControlButton}
          customIconStyles={styles.bottomControlIcon}
          Icon={FolderImagesIcon}
          onPress={onPressShowLinkedFeeds}
          disabled={posting}
        />
        {keyboardIsVisible ? (
          <GypsieButton
            customButtonStyles={styles.bottomControlButton}
            customIconStyles={[
              styles.bottomControlIcon,
              { color: PALETTE.ORANGE },
            ]}
            Icon={CheckIcon}
            onPress={closeKeyboard}
          />
        ) : (
          <GypsieButton
            customButtonStyles={[
              styles.bottomControlButton,
              {
                width: 'auto',
                backgroundColor: postButtonIsDisabled
                  ? PALETTE.GREY
                  : PALETTE.ORANGE,
                borderRadius: 6,
              },
            ]}
            customTextStyles={styles.postButtonText}
            text={mode === 'NEW' ? 'Post' : 'Save'}
            onPress={onSubmitPost}
            loading={posting}
            disabled={postButtonIsDisabled}
          />
        )}
      </KeyboardStickyView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...FULL_SCREEN,
    backgroundColor: PALETTE.OFFWHITE,
  },
  scrollViewContainer: {
    backgroundColor: PALETTE.GREYISHBLUE,
  },
  scrollView: {
    flexGrow: 1,
    backgroundColor: PALETTE.OFFWHITE,
  },
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
  addCoverIcon: { fontSize: 64, color: PALETTE.OFFWHITE },
  auxiliaryControls: {
    height: DIMENSION.FIFTY_PERCENT,
  },
  auxiliaryIcon: {
    fontSize: 24,
    color: PALETTE.OFFWHITE,
  },
  blogContainer: {
    backgroundColor: PALETTE.OFFWHITE,
  },
  titleInput: {
    width: DIMENSION.HUNDRED_PERCENT,
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: PALETTE.LIGHTERGREY,
    fontFamily: 'Avenir',
    fontSize: 40,
    fontWeight: 'bold',
    color: PALETTE.GREYISHBLUE,
  },
  titleInputCounter: {
    position: 'absolute',
    bottom: 4,
    right: 10,
    fontFamily: 'Futura',
    fontSize: 12,
    fontWeight: 'bold',
    color: PALETTE.LIGHTGREY,
  },
  bottomControls: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 'auto',
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
  bottomControlButton: {
    height: 32,
    width: 40,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  bottomControlIcon: { fontSize: 24, color: PALETTE.GREYISHBLUE },
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
  postButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: PALETTE.OFFWHITE,
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
    fontFamily: 'Futura',
    fontSize: 24,
    fontWeight: 'bold',
    color: PALETTE.GREY,
    textAlign: 'center',
  },
});

export default WriteTaleScreen;

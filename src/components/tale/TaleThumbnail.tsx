import { memo, useCallback, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Video from 'react-native-video';
import type { TaleThumbnailProps } from '@components/tale/types/types';
import type { ModalNavigatorNavigationProp } from '@navigators/types/types';
import { DEVICE_WIDTH, PLACEHOLDER_IMAGE_URI } from '@constants/constants';
import { DIMENSION } from '@constants/dimensions';
import { PALETTE } from '@constants/palette';
import GypsieAvatar from '@components/common/GypsieAvatar';
import GypsieSkeleton from '@components/common/GypsieSkeleton';

const CARD_WIDTH = DEVICE_WIDTH / 2 - 8;

const SkeletonThumbnail = memo(() => {
  return (
    <View
      style={{
        height: 300,
        width: DEVICE_WIDTH / 2 - 8,
        borderRadius: 12,
        margin: 3,
      }}>
      <View
        style={{
          flex: 5,
          width: '100%',
          marginVertical: 4,
          borderRadius: 12,
          overflow: 'hidden',
        }}>
        <GypsieSkeleton />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          width: '100%',
          // borderWidth: 1,
          // borderColor:'green'
        }}>
        <View
          style={{
            height: 40,
            width: 40,
            borderRadius: 20,
            overflow: 'hidden',
          }}>
          <GypsieSkeleton />
        </View>
        <View
          style={{
            flex: 1,
            height: 40,
            marginLeft: 8,
            borderRadius: 12,
            overflow: 'hidden',
          }}>
          <GypsieSkeleton />
        </View>
      </View>
    </View>
  );
});

const TaleThumbnail = memo(({ data }: TaleThumbnailProps) => {
  const navigation = useNavigation<ModalNavigatorNavigationProp>();
  const [paused, setPaused] = useState<boolean>(true);

  const onPressFeed = useCallback(() => {
    navigation.push('Modal', {
      screen: 'TaleView',
      params: { id: data.taleId, creator: data.creator },
    });
  }, [navigation, data]);

  const onPauseToggle = useCallback(() => {
    setPaused(prev => !prev);
  }, [setPaused]);

  if (!data) {
    return <SkeletonThumbnail />;
  }

  return (
    <Pressable
      style={({ pressed }) => [
        styles.feedCard,
        { transform: [{ scale: pressed ? 0.995 : 1 }] },
      ]}
      onTouchStart={onPauseToggle}
      onTouchEnd={onPauseToggle}
      // onTouchStart={() => setPaused(false)}
      // onTouchEnd={() => setPaused(true)}
      onPress={onPressFeed}>
      {data &&
        data.cover &&
        (data.cover.type.startsWith('image') ? (
          <Image
            style={[
              styles.feedCardMedia,
              { aspectRatio: data.cover.width / data.cover.height },
            ]}
            source={{ uri: data.cover.uri }}
            progressiveRenderingEnabled
            resizeMode="contain"
            // defaultSource={{uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/japan-kyotoshrine.jpeg"}}
          />
        ) : data.cover.type.startsWith('video') ? (
          <Video
            style={[
              styles.feedCardMedia,
              { aspectRatio: data.cover.width / data.cover.height },
            ]}
            source={{ uri: data.cover.uri }}
            // posterResizeMode="contain"
            resizeMode="contain"
            // onLoadStart={() => console.log("Video thumbnail is loading@components.")}
            // onLoad={onVideoLoad}
            repeat
            paused={paused}
            volume={0}
          />
        ) : (
          <Text>Nothing to display@components.</Text>
        ))}
      <View style={styles.feedCardFooter}>
        <GypsieAvatar uri={data.creator.avatar?.uri || PLACEHOLDER_IMAGE_URI} />
        <View style={styles.feedCardTextWrapper}>
          <Text
            style={styles.feedCardText}
            numberOfLines={3}
            ellipsizeMode="tail">
            {data.title}
          </Text>
        </View>
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  feedCard: {
    justifyContent: 'center',
    alignItems: 'center',
    width: CARD_WIDTH,
    borderRadius: 12,
    backgroundColor: PALETTE.OFFWHITE,
    shadowColor: PALETTE.BLACK,
    shadowOpacity: 0.2,
    shadowOffset: { height: 2, width: 0 },
    shadowRadius: 2,
    margin: 3,
  },
  feedCardMedia: {
    width: DIMENSION.HUNDRED_PERCENT,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  feedCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: "flex-start",
    width: DIMENSION.HUNDRED_PERCENT,
    padding: 4,
    backgroundColor: PALETTE.OFFWHITE,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  feedCardTextWrapper: { flex: 1, justifyContent: 'center' },
  feedCardText: {
    fontFamily: 'Futura',
    fontSize: 14,
    color: PALETTE.GREYISHBLUE,
  },
});

export default TaleThumbnail;

// const [mediaAspectRatio, setMediaAspectRatio] = useState<number>(0);
// const { getImageSize, getMediaAspectRatio } = useMediaHandlers();

// const onVideoLoad = useCallback(
//   ({
//     naturalSize,
//   }: {
//     naturalSize: {
//       height: number;
//       width: number;
//       orientation: "portrait" | "landscape";
//     };
//   }) => {
//     console.log("Video thumbnail finished loading.");
//     const aspectRatio = naturalSize.width / naturalSize.height;
//     setMediaAspectRatio(aspectRatio);
//   },
//   [setMediaAspectRatio],
// );

// const getImageAspectRatio = useCallback(
//   async (imageUri: string): Promise<void> => {
//     const imageSize = await getImageSize(imageUri);
//     const imageAspectRatio = getMediaAspectRatio(
//       imageSize.height,
//       imageSize.width,
//     );

//     setMediaAspectRatio(imageAspectRatio);
//   },
//   [getImageSize, getMediaAspectRatio, setMediaAspectRatio],
// );

// useEffect(() => {
//   if (data.cover && data.cover.type.startsWith("image")) {
//     getImageAspectRatio(data.cover.uri);
//   }
// }, [data, getImageAspectRatio]);

// // Temporarily set aspect ratio to 1 if media aspect ratio is still being calculated
// if (mediaAspectRatio === 0) {
//   setMediaAspectRatio(CARD_WIDTH / 200);
// }

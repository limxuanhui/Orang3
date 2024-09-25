import { memo, useCallback, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Video from 'react-native-video';
import type { TaleThumbnailProps } from '@components/tale/types/types';
import type {
  GypsieUser,
  ModalNavigatorNavigationProp,
} from '@navigators/types/types';
import { DEVICE_WIDTH, PLACEHOLDER_IMAGE_URI } from '@constants/constants';
import { DIMENSION } from '@constants/dimensions';
import { PALETTE } from '@constants/palette';
import GypsieAvatar from '@components/common/GypsieAvatar';
import GypsieSkeleton from '@components/common/GypsieSkeleton';
import Logo from '../../../assets/images/orang3-logo.svg';
import { getImageUrl } from '@helpers/functions';
import useDataManager from '@hooks/useDataManager';

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
  const { data: creator, isLoading: creatorIsLoading } =
    useDataManager<GypsieUser>('user-by-userid', data.creatorId);

  const onPressTaleThumbnail = useCallback(() => {
    navigation.push('Modal', {
      screen: 'TaleView',
      params: { id: data.id, creatorId: data.creatorId },
    });
  }, [navigation, data]);

  const onPauseToggle = useCallback(() => {
    setPaused(prev => !prev);
  }, [setPaused]);

  if (!data || creatorIsLoading) {
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
      onPress={onPressTaleThumbnail}>
      {data.thumbnail ? (
        data.thumbnail.type.startsWith('image') ? (
          <Image
            style={[
              styles.feedCardMedia,
              { aspectRatio: data.thumbnail.width / data.thumbnail.height },
            ]}
            source={{
              uri: getImageUrl(data.thumbnail.uri, 'thumbnail'),
            }}
            progressiveRenderingEnabled
            resizeMode="contain"
          />
        ) : (
          <Video
            style={[
              styles.feedCardMedia,
              { aspectRatio: data.thumbnail.width / data.thumbnail.height },
            ]}
            source={{ uri: data.thumbnail.uri }}
            resizeMode="contain"
            repeat
            paused={paused}
            volume={0}
            // posterResizeMode="contain"
            // onLoadStart={() => console.log("Video thumbnail is loading@components.")}
            // onLoad={onVideoLoad}
          />
        )
      ) : (
        <View style={styles.feedCardMedia}>
          <Logo width={CARD_WIDTH * 0.6} />
        </View>
      )}
      <View style={styles.feedCardFooter}>
        <GypsieAvatar
          uri={
            getImageUrl(creator?.avatar?.uri as string, 'thumbnail') ||
            PLACEHOLDER_IMAGE_URI
          }
        />
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
    justifyContent: 'center',
    alignItems: 'center',
    width: DIMENSION.HUNDRED_PERCENT,
    backgroundColor: PALETTE.OFFWHITE,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    aspectRatio: 1,
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

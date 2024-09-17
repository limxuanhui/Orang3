import { memo, useCallback } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Config from 'react-native-config';
import type { FeedThumbnailProps } from './types/types';
import type { ModalNavigatorNavigationProp } from '@navigators/types/types';
import { DEVICE_WIDTH } from '@constants/constants';
import { DIMENSION } from '@constants/dimensions';
import { PALETTE } from '@constants/palette';
import Logo from '../../../assets/images/orang3-logo.svg';

const CARD_WIDTH = DEVICE_WIDTH / 3 - 8;

const FeedThumbnail = memo(({ data }: FeedThumbnailProps) => {
  const navigation = useNavigation<ModalNavigatorNavigationProp>();

  const onPressThumbnail = useCallback(() => {
    navigation.push('Modal', {
      screen: 'Feed',
      params: {
        feedId: data.id,
      },
    });
  }, [data, navigation]);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.thumbnail,
        {
          opacity: pressed ? 0.9 : 1,
          transform: [{ scale: pressed ? 0.99 : 1 }],
        },
      ]}
      onPress={onPressThumbnail}>
      {data.thumbnail.type.startsWith('image') ? (
        <Image
          style={[
            styles.image,
            { aspectRatio: data.thumbnail.width / data.thumbnail.height || 1 },
          ]}
          source={{
            uri: `${Config.AWS_CLOUDFRONT_URL_THUMBNAIL}/${data.thumbnail.uri}`,
          }}
          // onLoad={(props) => console.log(props)}
          resizeMode="contain"
        />
      ) : (
        <View style={styles.thumbnail}>
          <Logo width={CARD_WIDTH * 0.6} height={80} />
        </View>
      )}
    </Pressable>
  );
});

const styles = StyleSheet.create({
  thumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    width: CARD_WIDTH,
    backgroundColor: PALETTE.OFFWHITE,
    margin: 3,
    borderRadius: 8,
  },
  imageContainer: {
    width: DIMENSION.HUNDRED_PERCENT,
    backgroundColor: 'green',
  },
  image: {
    width: DIMENSION.HUNDRED_PERCENT,
    borderRadius: 8,
  },
  stackIcon: { position: 'absolute', bottom: 8, right: 8 },
});

export default FeedThumbnail;

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
//   if (data?.uri && data.type.startsWith("image")) {
//     getImageAspectRatio(data.uri);
//   }
// }, [data, getImageAspectRatio]);

// // Temporarily set aspect ratio to 1 if media aspect ratio is still being calculated
// if (mediaAspectRatio === 0) {
//   setMediaAspectRatio((DEVICE_WIDTH / 3 - 4) / 200);
// }

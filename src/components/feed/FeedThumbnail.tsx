import { memo, useCallback } from "react";
import { Image, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { FeedThumbnailProps } from "./types/types";
import type { ModalNavigatorNavigationProp } from "../navigators/types/types";
import { DEVICE_WIDTH } from "../../utils/constants/constants";
import { DIMENSION } from "../../utils/constants/dimensions";
import { PALETTE } from "../../utils/constants/palette";

const FeedThumbnail = memo(({ data }: FeedThumbnailProps) => {
  const navigation = useNavigation<ModalNavigatorNavigationProp>();
  const uri =
    "/Users/limxuanhui/bluextech/gypsie/assets/images/logo-no-background.png";

  const onPressThumbnail = useCallback(() => {
    navigation.push("Modal", {
      screen: "Feed",
      params: {
        feedId: data.feedId,
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
      <Image
        style={[
          styles.image,
          { aspectRatio: data.cover.width / data.cover.height || 1 },
        ]}
        source={{
          uri: data.cover?.type.startsWith("image") ? data.cover.uri : uri,
        }}
        resizeMode="contain"
      />
    </Pressable>
  );
});

const styles = StyleSheet.create({
  thumbnail: {
    justifyContent: "center",
    alignItems: "center",
    width: DEVICE_WIDTH / 3 - 8,
    backgroundColor: PALETTE.OFFWHITE,
    margin: 3,
    borderRadius: 8,
  },
  imageContainer: {
    width: DIMENSION.HUNDRED_PERCENT,
    backgroundColor: "green",
  },
  image: {
    width: DIMENSION.HUNDRED_PERCENT,
    borderRadius: 8,
  },
  stackIcon: { position: "absolute", bottom: 8, right: 8 },
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

import { useCallback, useEffect, useState } from "react";
import { Image, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
// import { Image, Skeleton } from "@rneui/themed";
import type { FeedThumbnailProps } from "./types/types";
import type { ModalNavigatorNavigationProp } from "../navigators/types/types";
import { DIMENSION } from "../../utils/constants/dimensions";
import { PALETTE } from "../../utils/constants/palette";
import { DEVICE_WIDTH } from "../../utils/constants/constants";
import useMediaHandlers from "../../utils/hooks/useMediaHandlers";

const FeedThumbnail = ({ feed }: FeedThumbnailProps) => {
  const navigation = useNavigation<ModalNavigatorNavigationProp>();
  const [mediaAspectRatio, setMediaAspectRatio] = useState<number>(0);
  const { getImageSize, getMediaAspectRatio } = useMediaHandlers();
  const [uri, setUri] = useState<string>(
    "/Users/limxuanhui/bluextech/gypsie/assets/images/logo-no-background.png",
  );

  const onVideoLoad = useCallback(
    ({
      naturalSize,
    }: {
      naturalSize: {
        height: number;
        width: number;
        orientation: "portrait" | "landscape";
      };
    }) => {
      console.log("Video thumbnail finished loading.");
      const aspectRatio = naturalSize.width / naturalSize.height;
      setMediaAspectRatio(aspectRatio);
    },
    [setMediaAspectRatio],
  );

  const getImageAspectRatio = useCallback(
    async (imageUri: string): Promise<void> => {
      const imageSize = await getImageSize(imageUri);
      const imageAspectRatio = getMediaAspectRatio(
        imageSize.height,
        imageSize.width,
      );

      setMediaAspectRatio(imageAspectRatio);
    },
    [getImageSize, getMediaAspectRatio, setMediaAspectRatio],
  );

  const data = feed.items[0].media;

  useEffect(() => {
    if (data?.uri && data.type.startsWith("image")) {
      getImageAspectRatio(data.uri);
    }
  }, [data, getImageAspectRatio]);

  // Temporarily set aspect ratio to 1 if media aspect ratio is still being calculated
  if (mediaAspectRatio === 0) {
    setMediaAspectRatio((DEVICE_WIDTH / 3 - 4) / 200);
  }

  const onPressThumbnail = useCallback(() => {
    navigation.push("Modal", {
      screen: "Feed",
      params: {
        feedId: feed.id,
      },
    });
  }, [navigation]);

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
        // containerStyle={styles.imageContainer}
        style={[styles.image, { aspectRatio: mediaAspectRatio }]}
        source={{
          uri: feed.items[0].media?.type.startsWith("image")
            ? feed.items[0].media.uri
            : uri,
        }}
        // PlaceholderContent={<Skeleton style={{ flex: 1 }} animation="pulse" />}
        resizeMode="contain"
      />
      {feed.items.length > 1 ? (
        <Ionicons
          style={styles.stackIcon}
          name="albums-outline"
          size={14}
          color={PALETTE.WHITE}
        />
      ) : null}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  thumbnail: {
    justifyContent: "center",
    alignItems: "center",
    width: DEVICE_WIDTH / 3 - 8,
    backgroundColor: PALETTE.OFFWHITE,
    // shadowColor: PALETTE.OFFWHITE,
    // shadowOpacity: 0.2,
    // shadowOffset: { height: 2, width: 0 },
    // shadowRadius: 2,
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

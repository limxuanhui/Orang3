import { useCallback, useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
// import Image from "react-native-scalable-image";
import type { ItineraryFeedThumbnailProps } from "./types/types";
import type { ModalNavigatorNavigationProp } from "../navigators/types/types";
import { DEVICE_WIDTH } from "../../utils/constants/constants";
import { DIMENSION } from "../../utils/constants/dimensions";
import { PALETTE } from "../../utils/constants/palette";
import Video from "react-native-video";
import useMediaHandlers from "../../utils/hooks/useMediaHandlers";
import GypsieAvatar from "../common/GypsieAvatar";
import { ActivityIndicator } from "react-native-paper";

const CARD_WIDTH = DEVICE_WIDTH / 2 - 8;

const ItineraryFeedThumbnail = ({
  index,
  data,
}: ItineraryFeedThumbnailProps) => {
  const navigation = useNavigation<ModalNavigatorNavigationProp>();
  const [paused, setPaused] = useState<boolean>(true);
  const [mediaAspectRatio, setMediaAspectRatio] = useState<number>(0);
  const { getImageSize, getMediaAspectRatio } = useMediaHandlers();

  const onPressFeed = useCallback(() => {
    navigation.push("Modal", {
      screen: "ItineraryPostView",
      params: { id: data.id, creatorId: data.creatorId },
    });
  }, [navigation]);

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

  useEffect(() => {
    if (data.coverMedia.type === "image") {
      getImageAspectRatio(data.coverMedia.uri);
    }
  }, [getImageAspectRatio]);

  // Temporarily set aspect ratio to 1 if media aspect ratio is still being calculated
  if (mediaAspectRatio === 0) {
    setMediaAspectRatio(1);
  }

  return (
    <Pressable
      style={({ pressed }) => [
        styles.feedCard,
        { transform: [{ scale: pressed ? 0.995 : 1 }] },
      ]}
      onTouchStart={() => setPaused(false)}
      onTouchEnd={() => setPaused(true)}
      onPress={onPressFeed}>
      {data.coverMedia.type === "image" ? (
        <Image
          style={[styles.feedCardMedia, { aspectRatio: mediaAspectRatio }]}
          source={{ uri: data.coverMedia.uri }}
          progressiveRenderingEnabled
          resizeMode="cover"
          // defaultSource={{uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/japan-kyotoshrine.jpeg"}}
        />
      ) : data.coverMedia.type === "video" ? (
        <Video
          style={[styles.feedCardMedia, { aspectRatio: mediaAspectRatio }]}
          source={{ uri: data.coverMedia.uri }}
          // posterResizeMode="contain"
          resizeMode="cover"
          // onLoadStart={() => console.log("Video thumbnail is loading...")}
          onLoad={onVideoLoad}
          repeat
          paused={paused}
          volume={0}
        />
      ) : (
        <Text>Nothing to display...</Text>
      )}
      <View style={styles.feedCardFooter}>
        <GypsieAvatar
          uri={"/Users/limxuanhui/bluextech/gypsie/assets/avatars/yoona.jpeg"}
        />
        <Text
          style={styles.feedCardText}
          numberOfLines={3}
          ellipsizeMode="tail">
          {data.title}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  feedCard: {
    justifyContent: "center",
    alignItems: "center",
    width: CARD_WIDTH,
    // padding: 4,
    borderRadius: 8,
    shadowColor: PALETTE.BLACK,
    shadowOpacity: 0.1,
    shadowOffset: { height: 2, width: 2 },
    shadowRadius: 2,
    margin: 3,
  },
  feedCardMedia: {
    width: DIMENSION.HUNDRED_PERCENT,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  feedCardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: DIMENSION.HUNDRED_PERCENT,
    padding: 4,
    backgroundColor: PALETTE.OFFWHITE,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  feedCardText: {
    flex: 1,
    fontFamily: "Futura",
    color: PALETTE.GREYISHBLUE,
  },
});

export default ItineraryFeedThumbnail;

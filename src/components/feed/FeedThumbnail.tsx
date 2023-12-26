import { useCallback, useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Image, Skeleton } from "@rneui/themed";
import type { FeedThumbnailProps } from "./types/types";
import type { ModalNavigatorNavigationProp } from "../navigators/types/types";
import { DIMENSION } from "../../utils/constants/dimensions";
import { PALETTE } from "../../utils/constants/palette";

const FeedThumbnail = ({ feed }: FeedThumbnailProps) => {
  const navigation = useNavigation<ModalNavigatorNavigationProp>();
  const [uri, setUri] = useState<string>(
    "/Users/limxuanhui/bluextech/gypsie/assets/images/logo-no-background.png",
  );

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
        containerStyle={styles.imageContainer}
        style={styles.image}
        source={{
          uri: feed.items[0].media?.type.startsWith("image")
            ? feed.items[0].media.uri
            : uri,
        }}
        PlaceholderContent={<Skeleton style={{ flex: 1 }} animation="pulse" />}
        // resizeMode="contain"
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    margin: 0.5,
    borderRadius: 4,
  },
  imageContainer: { width: DIMENSION.HUNDRED_PERCENT },
  image: {
    height: DIMENSION.HUNDRED_PERCENT,
    width: DIMENSION.HUNDRED_PERCENT,
  },
  stackIcon: { position: "absolute", bottom: 8, right: 8 },
});

export default FeedThumbnail;

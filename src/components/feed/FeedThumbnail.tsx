import { useCallback, useEffect, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { FeedThumbnailProps } from "../../utils/types/feed";
import { createThumbnail } from "react-native-create-thumbnail";

import { DIMENSION } from "../../utils/constants/dimensions";
import { PALETTE } from "../../utils/constants/palette";
import { useNavigation } from "@react-navigation/native";
import { ProfileScreenProps } from "../../utils/types/profile";

const FeedThumbnail = ({ feed }: FeedThumbnailProps) => {
  const navigation = useNavigation<ProfileScreenProps>();
  const { height, width } = useWindowDimensions();
  const [uri, setUri] = useState<string>(
    "/Users/limxuanhui/bluextech/gypsie/assets/images/logo-no-background.png",
  );

  const getThumbnail = useCallback(
    async (
      id: string = "0",
      uri: string = "/Users/limxuanhui/bluextech/gypsie/assets/images/logo-no-background.png",
    ) => {
      let thumbnailPath;
      try {
        thumbnailPath = await createThumbnail({
          url: uri,
          cacheName: id,
          timeStamp: 0,
        });
      } catch (err) {
        console.error(err);
      }

      return thumbnailPath?.path;
    },
    [createThumbnail],
  );

  // useEffect(() => {
  //   const x = getThumbnail();
  //   data.type === "image"
  //     ? setUri(data.uri)
  //     : setUri("");
  // }, [data]);
  // "/Users/limxuanhui/Library/Developer/CoreSimulator/Devices/830EEFA8-BEB1-4FEC-B81B-DA9837D41F82/data/Containers/Data/Application/5B2C0CF4-F5CC-4A5C-8E3B-59194B1C83F2/Library/Caches/thumbnails/thumb-5.jpeg"

  //   : "/Users/limxuanhui/Library/Developer/CoreSimulator/Devices/830EEFA8-BEB1-4FEC-B81B-DA9837D41F82/data/Containers/Data/Application/5B2C0CF4-F5CC-4A5C-8E3B-59194B1C83F2/Library/Caches/thumbnails/thumb-5.jpeg";
  //   : createThumbnail({
  //       url: data.uri,
  //       timeStamp: 10,
  //       cacheName: data.id.toString(),
  //     })
  //       .then(response => {
  //         return response.path;
  //       })
  //       .catch(error => {
  //         console.error(error);
  //         return "/Users/limxuanhui/bluextech/gypsie/assets/images/logo-no-background.png";
  //       });

  const onPressThumbnail = useCallback(() => {
    console.warn("Thumbnail pressed");

    // To open up post with navigation
    // navigation.navigate("home", {})
  }, []);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.thumbnail,
        {
          width: Math.round(width / 3) - 2,
          opacity: pressed ? 0.9 : 1,
          transform: [{ scale: pressed ? 0.99 : 1 }],
        },
      ]}
      onPress={onPressThumbnail}>
      <Image
        style={styles.image}
        source={{
          uri: feed.items[0].type === "image" ? feed.items[0].uri : uri,
        }}
      />
      {feed.items.length > 1 && (
        <Ionicons
          style={styles.stackIcon}
          name="albums-outline"
          size={14}
          color={PALETTE.WHITE}
        />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  thumbnail: {
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    margin: 0.5,
    borderRadius: 4,
  },
  image: {
    height: DIMENSION.HUNDRED_PERCENT,
    width: DIMENSION.HUNDRED_PERCENT,
  },
  placeholder: {
    color: PALETTE.GREY,
    fontSize: 40,
    fontWeight: "900",
  },
  stackIcon: { position: "absolute", bottom: 8, right: 8 },
});

export default FeedThumbnail;

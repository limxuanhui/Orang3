import { useCallback } from "react";
import { FlatList, Image, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { FeedItemThumbnailsCarouselProps } from "./types/types";
import type { ModalNavigatorNavigationProp } from "../navigators/types/types";
import { DIMENSION } from "../../utils/constants/dimensions";
import { PALETTE } from "../../utils/constants/palette";

const FeedItemThumbnailsCarousel = ({
  data,
  style,
}: FeedItemThumbnailsCarouselProps) => {
  const navigation = useNavigation<ModalNavigatorNavigationProp>();

  const onPressLinkedPost = useCallback(
    (feedId: string) => {
      navigation.navigate("Modal", { screen: "Feed", params: { feedId } });
    },
    [navigation],
  );

  return (
    <FlatList
      style={[styles.linkedFeeds, style]}
      contentContainerStyle={styles.linkedFeedsContentContainer}
      data={data}
      renderItem={el => (
        <Pressable
          style={({ pressed }) => [
            styles.linkedFeed,
            {
              marginLeft: el.index === 0 ? 0 : 8,
              transform: [{ scale: pressed ? 0.99 : 1 }],
            },
            style,
          ]}
          onPress={() => onPressLinkedPost(el.item.feedId)}>
          <Image
            style={styles.imageStyle}
            source={{
              uri: el.item.uri,
            }}
          />
        </Pressable>
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  linkedFeeds: {
    zIndex: 1,
  },
  linkedFeedsContentContainer: {
    alignSelf: "center",
    height: 120,
  },
  linkedFeed: {
    height: DIMENSION.HUNDRED_PERCENT,
    width: 100,
    borderRadius: 8,
    backgroundColor: PALETTE.WHITE,
    shadowColor: PALETTE.BLACK,
    shadowOpacity: 0.2,
    shadowOffset: { height: 4, width: 0 },
    shadowRadius: 2,
  },
  imageStyle: { height: DIMENSION.HUNDRED_PERCENT, borderRadius: 8 },
});

export default FeedItemThumbnailsCarousel;

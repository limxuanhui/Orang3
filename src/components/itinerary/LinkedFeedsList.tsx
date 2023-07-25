import { useCallback } from "react";
import { FlatList, Image, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { LinkedFeedsListProps } from "./types/types";
import type { ModalNavigatorNavigationProp } from "../navigators/types/types";
import { PALETTE } from "../../utils/constants/palette";
import { DIMENSION } from "../../utils/constants/dimensions";

const LinkedFeedsList = ({ data }: LinkedFeedsListProps) => {
  const navigation = useNavigation<ModalNavigatorNavigationProp>();
  const insets = useSafeAreaInsets();

  const onPressLinkedPost = useCallback(
    (feedId: number) => {
      navigation.navigate("Modal", { screen: "Feed", params: { feedId } });
    },
    [navigation],
  );

  return (
    <FlatList
      style={[styles.linkedFeeds, { top: insets.top }]}
      contentContainerStyle={styles.linkedFeedsContentContainer}
      data={data}
      renderItem={el => (
        <Pressable
          style={({ pressed }) => [
            styles.linkedFeed,
            { transform: [{ scale: pressed ? 0.99 : 1 }] },
          ]}
          onPress={() => onPressLinkedPost(el.item.feedId)}>
          <Image
            source={{
              uri: el.item.uri,
            }}
            style={styles.imageStyle}
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
    position: "absolute",
    height: 120,
    width: DIMENSION.HUNDRED_PERCENT,
    zIndex: 1,
  },
  linkedFeedsContentContainer: {
    height: DIMENSION.HUNDRED_PERCENT,
  },
  linkedFeed: {
    width: 100,
    height: "100%",
    marginHorizontal: 8,
    borderRadius: 8,
    backgroundColor: PALETTE.WHITE,
    shadowColor: PALETTE.BLACK,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 2,
  },
  imageStyle: { height: "100%", borderRadius: 8 },
});

export default LinkedFeedsList;

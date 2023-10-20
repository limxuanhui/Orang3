import { useCallback } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Image from "react-native-scalable-image";
import type { ItineraryFeedThumbnailInfo } from "./types/types";
import type { ModalNavigatorNavigationProp } from "../navigators/types/types";
import { DEVICE_WIDTH } from "../../utils/constants/constants";
import { DIMENSION } from "../../utils/constants/dimensions";
import { PALETTE } from "../../utils/constants/palette";

type ItineraryFeedThumbnailProps = {
  data: ItineraryFeedThumbnailInfo;
  index: number;
};

const CARD_WIDTH = DEVICE_WIDTH / 2 - 8;

const ItineraryFeedThumbnail = ({
  data,
  index,
}: ItineraryFeedThumbnailProps) => {
  const navigation = useNavigation<ModalNavigatorNavigationProp>();

  const onPressFeed = useCallback(() => {
    navigation.push("Modal", { screen: "ItineraryPostView" });
  }, [navigation]);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.feedCard,
        {
          paddingLeft: index % 2 !== 0 ? 1 : 0,
          paddingRight: index % 2 === 0 ? 1 : 0,
          paddingBottom: 6,
          transform: [{ scale: pressed ? 0.995 : 1 }],
        },
      ]}
      onPress={onPressFeed}>
      <Image
        style={styles.feedCardImage}
        width={CARD_WIDTH}
        source={{ uri: data.imageUri }}
      />
      <View style={styles.feedCardTextBox}>
        <Text>
          {"Elit velit fugiat tempor aute qui et veniam incididunt in."}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  feedCard: {
    justifyContent: "center",
    alignItems: "center",
    width: DIMENSION.HUNDRED_PERCENT,
    borderRadius: 8,
    shadowColor: PALETTE.BLACK,
    shadowOpacity: 0.1,
    shadowOffset: { height: 2, width: 2 },
    shadowRadius: 2,
    overflow: "hidden",
  },
  feedCardImage: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  feedCardTextBox: {
    width: CARD_WIDTH,
    padding: 4,
    backgroundColor: PALETTE.WHITE,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  feedCardText: {
    fontFamily: "Futura",
  },
});

export default ItineraryFeedThumbnail;

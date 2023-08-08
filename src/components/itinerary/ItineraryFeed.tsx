import { StyleSheet, View } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import MasonryList from "@react-native-seoul/masonry-list";
import ItineraryFeedThumbnail from "./ItineraryFeedThumbnail";
import type {
  ItineraryFeedProps,
  ItineraryFeedThumbnailInfo,
} from "./types/types";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../utils/constants/constants";
import { DIMENSION } from "../../utils/constants/dimensions";
import { DUMMY_ITINERARY_FEED } from "../../data/itinerary";
import { PALETTE } from "../../utils/constants/palette";

const CARD_WIDTH = DEVICE_WIDTH / 2 - 8;

const ItineraryFeed = ({ feed }: ItineraryFeedProps) => {
  const data: ItineraryFeedThumbnailInfo[] = DUMMY_ITINERARY_FEED;
  const bottomTabBarHeight = useBottomTabBarHeight();
  const height = DEVICE_HEIGHT - bottomTabBarHeight;

  return (
    <View style={[styles.container, {}]}>
      <MasonryList
        containerStyle={styles.masonryList}
        data={data}
        numColumns={2}
        renderItem={({ item, i }) => (
          <ItineraryFeedThumbnail
            data={item as ItineraryFeedThumbnailInfo}
            index={i}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 613,
    width: DIMENSION.HUNDRED_PERCENT,
    backgroundColor: PALETTE.OFFWHITE,
  },
  masonryList: {
    paddingHorizontal: 2,
  },
});

export default ItineraryFeed;

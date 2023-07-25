import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Divider from "../../common/Divider";
import ItineraryFeed from "../../itinerary/ItineraryFeed";
import ItineraryFilter from "../../itinerary/ItineraryFilter";
import type { ItineraryFeedItem } from "../../itinerary/types/types";
import {
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
} from "../../../utils/constants/constants";
import { DUMMY_FILTERS } from "../../../data/filters";
import { PALETTE } from "../../../utils/constants/palette";

const ItineraryFeedScreen = () => {
  const [filter, setFilter] = useState<string[]>(DUMMY_FILTERS);
  const [feed, setFeed] = useState<ItineraryFeedItem[]>([]);

  return (
    <View style={styles.container}>
      <ItineraryFilter filter={filter} />
      <Divider thickness="thin" shade="light" />
      <ItineraryFeed feed={feed} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
    backgroundColor: PALETTE.OFFWHITE,
  },
});

export default ItineraryFeedScreen;

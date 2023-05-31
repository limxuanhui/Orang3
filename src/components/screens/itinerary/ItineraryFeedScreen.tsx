import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../../utils/constants/constants";
import ItineraryFeed from "../../itinerary-feed/ItineraryFeed";
import ItineraryFilter from "../../itinerary-feed/ItineraryFilter";
import type { ItineraryFeedItem } from "../../../utils/types/map";

import { DUMMY_FILTERS } from "../../../data/filters";
import Divider from "../../common/Divider";

const ItineraryFeedScreen = () => {
  const [filter, setFilter] = useState<string[]>(DUMMY_FILTERS);
  const [feed, setFeed] = useState<ItineraryFeedItem[]>([]);

  return (
    <View style={styles.container}>
      <ItineraryFilter filter={filter} />
      <Divider thickness="thin" shade="light"/>
      <ItineraryFeed feed={feed} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {    
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
    backgroundColor: "#222222"
  },
});

export default ItineraryFeedScreen;

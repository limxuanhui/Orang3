import { useState } from "react";
import { StyleSheet, View } from "react-native";
import ItineraryFeed from "../../itinerary/ItineraryFeed";
import type { ItineraryFeedThumbnailInfo } from "../../itinerary/types/types";
import {
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
} from "../../../utils/constants/constants";
import { DUMMY_ITINERARY_FEED } from "../../../data/itinerary";
import { PALETTE } from "../../../utils/constants/palette";

const ItineraryFeedScreen = () => {
  const [feed, setFeed] =
    useState<ItineraryFeedThumbnailInfo[]>(DUMMY_ITINERARY_FEED);

  // Fetch itineraryfeed metadata from api/via createAsyncThunk/via RTK query

  return (
    <View style={styles.container}>
      <ItineraryFeed data={feed} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
    backgroundColor: PALETTE.OFFWHITE,
    paddingBottom: 200,
  },
});

export default ItineraryFeedScreen;

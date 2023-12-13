import { StyleSheet, View } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import ItineraryPlanner from "../../itinerary/ItineraryPlanner";
import LinkedFeedsList from "../../itinerary/LinkedFeedsList";
import type { LinkedFeedsListItem } from "../../itinerary/types/types";
import type { ItineraryViewScreenProps } from "./types/types";

const ItineraryViewScreen = ({ navigation }: ItineraryViewScreenProps) => {
  const data: LinkedFeedsListItem[] = [
    {
      feedId: "10001",
      uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/singapore-gbtb.jpg",
    },
    {
      feedId: "10002",
      uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/sample2.jpg",
    },
    {
      feedId: "10003",
      uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/sample3.jpg",
    },
    {
      feedId: "10004",
      uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/sample1.jpg",
    },
    {
      feedId: "10005",
      uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/sample2.jpg",
    },
    {
      feedId: "10006",
      uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/sample3.jpg",
    },
    {
      feedId: "10007",
      uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/sample1.jpg",
    },
  ];
  const isOwner = true;

  // if user is owner of Itinerary (Read/Write access), show edit functionality

  // if user is not owner of Itinerary (Read access), only show existing state and clone functionality

  return (
    <View style={styles.container}>
      {/* <LinkedFeedsList data={data} /> */}
      <ItineraryPlanner />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  backButton: {
    position: "absolute",
    top: getStatusBarHeight(),
    left: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 32,
    width: 32,
    zIndex: 2,
  },
});

export default ItineraryViewScreen;

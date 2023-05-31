import { StyleSheet, Text, View } from "react-native";
import { PALETTE } from "../../utils/constants/palette";
import { ItineraryFeedProps } from "../../utils/types/map";

const ItineraryFeed = ({ feed }: ItineraryFeedProps) => {
  return (
    <View style={styles.container}>
      {feed.length > 0 ? (
        feed.map((item, index) => <Text key={index}>{item.name}</Text>)
      ) : (
        <Text style={styles.noFeedText}>No more new feed to view...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  noFeedText: {
    marginTop: 8,
    fontSize: 24,
    fontWeight: "900",
    color: PALETTE.GREY,
    textAlign: "center",
  },
});

export default ItineraryFeed;

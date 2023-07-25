import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type PageIndicatorProps = {
  index: number;
  maxIndex: number;
};

const PageIndicator = ({ index, maxIndex }: PageIndicatorProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.pageIndicator, { bottom: insets.bottom + 50 }]}>
      <Text style={styles.pageIndicatorText}>{index + "/" + maxIndex}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  pageIndicator: {
    position: "absolute",
    right: 10,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 40,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#ffffff77",
  },
  pageIndicatorText: {
    textAlign: "center",
    textAlignVertical: "center",
  },
});

export default PageIndicator;

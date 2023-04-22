import { StyleSheet, Text, View } from "react-native";

type PageIndicatorProps = {
  index: number;
  maxIndex: number;
};

const PageIndicator = ({ index, maxIndex }: PageIndicatorProps) => {
  return (
    <View style={styles.pageIndicator}>
      <Text style={styles.pageIndicatorText}>{index + "/" + maxIndex}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  pageIndicator: {
    position: 'absolute',
    bottom: 100,
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 40,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#ffffff77",
  },
  pageIndicatorText: {
    textAlign: 'center',
    textAlignVertical: 'center'
  },
});

export default PageIndicator;

import { StyleSheet, Text, View } from "react-native";

const DriverNamecard = () => {
  return (
    <View style={styles.container}>
      <Text>DriverNamecard</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: 150,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
  },
});

export default DriverNamecard;

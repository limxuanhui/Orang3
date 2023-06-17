import { useCallback } from "react";
import { FlatList, Image, Pressable, StyleSheet, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getStatusBarHeight } from "react-native-status-bar-height";

import ItineraryPlanningScreen from "./ItineraryPlanningScreen";
import { PALETTE } from "../../../utils/constants/palette";

const ItineraryViewScreen = ({ navigation }: any) => {
  const data = [1, 2, 3, 4, 5, 6, 7];

  const onExit = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onPressLinkedPost = useCallback(() => {
    console.warn("linkedPostPressed!");
    navigation.push("feed");
  }, []);

  return (
    <View style={styles.container}>
      <Pressable style={styles.backButton} onPress={onExit}>
        <Ionicons name="arrow-back-circle" size={30} color={PALETTE.GREY} />
      </Pressable>
      <FlatList
        style={styles.linkedFeeds}
        contentContainerStyle={styles.linkedFeedsContentContainer}
        data={data}
        renderItem={item => (
          <Pressable
            style={({ pressed }) => [
              styles.linkedFeed,
              { transform: [{ scale: pressed ? 0.99 : 1 }] },
            ]}
            onPress={onPressLinkedPost}>
            <Image
              source={{
                uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/sample1.jpg",
              }}
              style={styles.imageStyle}
            />
          </Pressable>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      <ItineraryPlanningScreen />
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
  linkedFeeds: {
    position: "absolute",
    height: 120 + getStatusBarHeight(),
    width: "100%",
    paddingBottom: 8,
    // backgroundColor: "#ffffff",
    zIndex: 1,
  },
  linkedFeedsContentContainer: {
    height: "70%",
    alignSelf: "flex-end",
  },
  linkedFeed: {
    width: 100,
    height: "100%",
    marginHorizontal: 8,
    borderRadius: 8,
    backgroundColor: PALETTE.WHITE,
    shadowColor: PALETTE.BLACK,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 2,
  },
  imageStyle: { height: "100%", borderRadius: 8 },
});

export default ItineraryViewScreen;

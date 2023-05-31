import { useCallback } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getStatusBarHeight } from "react-native-status-bar-height";

import ItineraryPlanningScreen from "./ItineraryPlanningScreen";
import { PALETTE } from "../../../utils/constants/palette";

const ItineraryViewScreen = ({ navigation }: any) => {
  const data = [1, 2, 3, 4, 5, 6, 7];

  const onPressLinkedPost = useCallback(() => {
    console.warn("linkedPostPressed!");
  }, []);

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.backButton}
        onPress={() => {
          navigation.goBack();
        }}>
        <Ionicons name="arrow-back-circle" size={30} color={PALETTE.GREY} />
      </Pressable>
      <FlatList
        style={styles.linkedVlogPosts}
        contentContainerStyle={styles.linkedPostsContentContainer}
        data={data}
        renderItem={item => (
          <Pressable
            style={({ pressed }) => [
              styles.linkedVlogPost,
              { transform: [{ scale: pressed ? 0.98 : 1 }] },
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
  linkedVlogPosts: {
    position: "absolute",
    height: 120 + getStatusBarHeight(),
    width: "100%",
    backgroundColor: "#ffffffaa",
    zIndex: 1,
  },
  linkedPostsContentContainer: {
    height: "70%",
    alignSelf: "flex-end",
  },
  linkedVlogPost: {
    width: 100,
    height: "100%",
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: PALETTE.LIGHTGREY,
    borderRadius: 8,
    backgroundColor: PALETTE.WHITE,
  },
  imageStyle: { height: "100%", borderRadius: 8 },
});

export default ItineraryViewScreen;

import { useCallback } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import MasonryList from "@react-native-seoul/masonry-list";
import type { ItineraryFeedProps } from "./types/types";
import type { ModalNavigatorNavigationProp } from "../navigators/types/types";
import { AVATARS } from "../../data/avatar";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../utils/constants/constants";
import { PALETTE } from "../../utils/constants/palette";

const ItineraryFeed = ({ feed }: ItineraryFeedProps) => {
  const navigation = useNavigation<ModalNavigatorNavigationProp>();

  const onPressFeed = useCallback(() => {
    navigation.push("Modal", { screen: "ItineraryView" });
  }, [navigation]);

  const data = AVATARS;
  const bottomTabBarHeight = useBottomTabBarHeight();
  const height = DEVICE_HEIGHT - bottomTabBarHeight;

  return (
    <View style={[styles.container, {}]}>
      <MasonryList
        data={data}
        numColumns={2}
        renderItem={item => {
          return (
            <Pressable style={styles.feedCard} onPress={onPressFeed}>
              <Image
                style={[styles.feedCardImage]}
                source={{ uri: item.item + "" }}
                // resizeMode="cover"
              />
              {/* <View style={{ flex: 1, borderWidth: 1, borderColor: "green" }}>
                <Text>
                  {"Elit velit fugiat tempor aute qui et veniam incididunt in."}
                </Text>
              </View> */}
            </Pressable>
          );
        }}
        showsVerticalScrollIndicator={false}
        style={{
          alignSelf: "stretch",
        }}
        contentContainerStyle={{ paddingHorizontal: 0, alignSelf: "stretch" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 615,
    width: "100%",
    backgroundColor: PALETTE.BLUE,
  },
  feedCard: {
    height: 100 + 200 * Math.random(),
    // height: 200,
    width: "100%",
    marginVertical: 4,
    marginRight: 100,

    borderRadius: 4,
    // borderWidth: 1,
    // borderColor: "red",
    backgroundColor: "skyblue",
    // overflow: "hidden",
  },
  feedCardImage: { width: "100%", height: "100%" },
  noFeedText: {
    marginTop: 8,
    fontSize: 24,
    fontWeight: "900",
    color: PALETTE.GREY,
    textAlign: "center",
  },
});

export default ItineraryFeed;

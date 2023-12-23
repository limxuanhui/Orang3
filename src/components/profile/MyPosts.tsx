import { useContext } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { BottomTabBarHeightContext } from "@react-navigation/bottom-tabs";
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import useDataManager from "../../utils/hooks/useDataManager";
import FeedThumbnail from "../feed/FeedThumbnail";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../utils/constants/constants";
import { DUMMY_FEEDS } from "../../data/feeds";
import { PALETTE } from "../../utils/constants/palette";

const MyPosts = () => {
  // Change to useDataManager
  const { refreshing, refreshPostsHandler } = useDataManager("dev");
  const data = DUMMY_FEEDS;
  const percentage = 0.62 * DEVICE_HEIGHT;
  const bh = useContext(BottomTabBarHeightContext) || 0;
  const height = percentage - bh + 20;

  const safeFrame = useSafeAreaFrame();
  const insets = useSafeAreaInsets();

  return (
    // <View style={[styles.container, { height: percentage - insets.bottom }]}>
    <View style={[styles.container, { height: height }]}>
      <FlatList
        data={data}
        renderItem={el => <FeedThumbnail feed={el.item} />}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        // refreshing={refreshing}
        // onRefresh={refreshPostsHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: PALETTE.RED,
  },
});

export default MyPosts;

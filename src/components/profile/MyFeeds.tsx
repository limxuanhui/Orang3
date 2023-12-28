import { useContext } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { BottomTabBarHeightContext } from "@react-navigation/bottom-tabs";
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import MasonryList from "@react-native-seoul/masonry-list";
import useDataManager from "../../utils/hooks/useDataManager";
import FeedThumbnail from "../feed/FeedThumbnail";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../utils/constants/constants";
import { DUMMY_FEEDS } from "../../data/feeds";
import { PALETTE } from "../../utils/constants/palette";
import { Feed } from "../feed/types/types";

const MyFeeds = () => {
  // Change to useDataManager
  // const { refreshing, refreshPostsHandler } = useDataManager("dev");
  const data: Feed[] = DUMMY_FEEDS;
  const percentage = 0. * DEVICE_HEIGHT;
  const bh = useContext(BottomTabBarHeightContext) || 0;
  const height = (1-0.25-0.05)*DEVICE_HEIGHT - bh;
  // const percentage = 0.62 * DEVICE_HEIGHT;
  // const bh = useContext(BottomTabBarHeightContext) || 0;
  // const height = percentage - bh + 20;

  const safeFrame = useSafeAreaFrame();
  const insets = useSafeAreaInsets();

  return (
    // <View style={[styles.container, { height: percentage - insets.bottom }]}>
    <View style={[styles.container, { height: height }]}>
      <MasonryList        
        contentContainerStyle={{ borderWidth: 0, borderColor: "red",paddingHorizontal:2 }}
        data={data}
        renderItem={el => <FeedThumbnail feed={el.item as Feed} />}
        numColumns={3}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: PALETTE.GREYISHBLUE,
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
  },
});

export default MyFeeds;

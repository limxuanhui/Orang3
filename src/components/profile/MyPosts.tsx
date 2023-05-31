import { FlatList, StyleSheet, View } from "react-native";
import useFeedManager from "../../utils/hooks/useFeedManager";
import FeedThumbnail from "../feed/FeedThumbnail";

import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { DEVICE_HEIGHT } from "../../utils/constants/constants";
import { DUMMY_POSTS } from "../../data/dummy-posts";
import { PALETTE } from "../../utils/constants/palette";

const MyPosts = () => {
  const { refreshing, refreshPostsHandler } = useFeedManager();
  const data = DUMMY_POSTS;
  const percentage = 0.62 * DEVICE_HEIGHT;
  const height = percentage - Math.min(60, useBottomTabBarHeight());

  return (
    <View style={[styles.container, { height }]}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={[1]}
        refreshing={refreshing}
        onRefresh={refreshPostsHandler}
        renderItem={() => (
          <View style={[styles.postsGrid]} key={Math.random().toString()}>
            {data.map(item => (
              <FeedThumbnail feed={item} />
            ))}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: PALETTE.BLACK,
  },
  postsGrid: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
});

export default MyPosts;

import { useCallback, useContext, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import useFeedManager from "../../../utils/hooks/useFeedManager";

import Feed from "../../feed/Feed";
import { AuthContext } from "../../../utils/contexts/AuthContext";
import type { HomeScreenProps } from "../../../utils/types/home";

import { DEVICE_HEIGHT } from "../../../utils/constants/constants";
import { DUMMY_POSTS } from "../../../data/dummy-posts";

const HomeScreen = ({ navigation, route }: HomeScreenProps) => {
  const { user } = useContext(AuthContext);
  const [homeScreenIsFocused, setHomeScreenIsFocused] = useState<boolean>(true);
  const [activePostIndex, setActivePostIndex] = useState<number>(0);
  const [activePostItemIndex, setActivePostItemIndex] = useState<number>(0);
  const data = DUMMY_POSTS;

  const onViewableItemsChanged = useCallback(
    // change type to more suitable one
    ({ viewableItems, changed }: any) => {
      console.log("onViewableItemsChanged called: ");
      console.log("----- viewableItems : ", viewableItems);
      console.log("----- changed: ", changed);
      if (viewableItems && viewableItems?.length > 0) {
        setActivePostIndex(viewableItems[0].index);
        console.warn(viewableItems[0].index);
      }
    },
    [],
  );

  // https://reactnavigation.org/docs/function-after-focusing-screen
  // Consider using useFocusEffect
  useFocusEffect(
    useCallback(() => {
      setHomeScreenIsFocused(true);
      return () => setHomeScreenIsFocused(false);
    }, []),
  );

  const { refreshing, refreshPostsHandler } = useFeedManager();

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <Feed
            feed={item}
            inView={homeScreenIsFocused && index === activePostIndex}
          />
        )}
        showsVerticalScrollIndicator={false}
        snapToInterval={DEVICE_HEIGHT}
        snapToAlignment="start"
        decelerationRate={"fast"}
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 100,
          minimumViewTime: 200,
        }}
        onViewableItemsChanged={onViewableItemsChanged}
        refreshing={refreshing}
        onRefresh={refreshPostsHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: { width: 40, height: 40, borderRadius: 20 },
});

export default HomeScreen;

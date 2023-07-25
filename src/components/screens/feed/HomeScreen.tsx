import { useCallback, useContext, useMemo, useState } from "react";
import { FlatList, Modal, StyleSheet, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import useFeedManager from "../../../utils/hooks/useFeedManager";
import Feed from "../../feed/Feed";
import { AuthContext } from "../../../utils/contexts/AuthContext";
import type { HomeScreenProps } from "./types/types";
import {
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
} from "../../../utils/constants/constants";
import { DUMMY_FEEDS } from "../../../data/feeds";
import BottomSheet from "../../common/BottomSheet";

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { user } = useContext(AuthContext);
  const [homeScreenIsFocused, setHomeScreenIsFocused] = useState<boolean>(true);
  const [activePostIndex, setActivePostIndex] = useState<number>(0);
  const [activePostItemIndex, setActivePostItemIndex] = useState<number>(0);
  // const [commentsModalIsOpen, setCommentsModalIsOpen] =
  //   useState<boolean>(false);
  const data = DUMMY_FEEDS;

  const onViewableItemsChanged = useCallback(
    // change type to more suitable one
    ({ viewableItems, changed }: any) => {
      if (viewableItems && viewableItems?.length > 0) {
        setActivePostIndex(viewableItems[0].index);
        // console.warn(viewableItems[0].index);
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
  const viewabilityConfig = useMemo(
    () => ({
      viewAreaCoveragePercentThreshold: 100,
      minimumViewTime: 200,
    }),
    [],
  );

  // const toggleCommentsModal = useCallback(() => {
  //   setCommentsModalIsOpen(prev => !prev);
  // }, [commentsModalIsOpen]);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        // initialNumToRender={2}
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
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={onViewableItemsChanged}
        refreshing={refreshing}
        onRefresh={refreshPostsHandler}
      />
      {/* <Modal
        transparent
        visible={commentsModalIsOpen}
        onRequestClose={() => {
          setCommentsModalIsOpen(true);
        }}
        animationType="slide">
        <View
          style={{
            height: DEVICE_HEIGHT,
            width: DEVICE_WIDTH,
            backgroundColor: "#000000aa",
          }}>
          <BottomSheet
            height={0.8 * DEVICE_HEIGHT}
            width={DEVICE_WIDTH}
            maxTranslateY={-0.8 * DEVICE_HEIGHT}>
            <Text style={{ fontSize: 60, fontWeight: "900", color: "red" }}>
              Hi all
            </Text>
          </BottomSheet>
        </View>
      </Modal> */}
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

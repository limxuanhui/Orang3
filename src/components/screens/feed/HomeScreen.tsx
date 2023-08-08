import { useCallback, useContext, useState } from "react";
import {
  FlatList,
  Modal,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import useFeedManager from "../../../utils/hooks/useFeedManager";
import FeedDisplay from "../../feed/FeedDisplay";
import { AuthContext } from "../../../utils/contexts/AuthContext";
import type { HomeScreenProps } from "./types/types";
import {
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
} from "../../../utils/constants/constants";
import { DUMMY_FEEDS } from "../../../data/feeds";
import BottomSheet from "../../common/BottomSheet";
import { VIEWABILITY_CONFIG } from "../../../utils/constants/feed";
import { PALETTE } from "../../../utils/constants/palette";

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { user } = useContext(AuthContext);
  const [homeScreenIsFocused, setHomeScreenIsFocused] = useState<boolean>(true);
  const [activePostIndex, setActivePostIndex] = useState<number>(0);
  const { refreshing, refreshPostsHandler } = useFeedManager();
  const data = DUMMY_FEEDS;

  const onViewableItemsChanged = useCallback(
    // Change type to more suitable one
    ({ viewableItems, changed }: any) => {
      if (viewableItems && viewableItems?.length > 0) {
        setActivePostIndex(viewableItems[0].index);
      }
    },
    [],
  );

  useFocusEffect(
    useCallback(() => {
      setHomeScreenIsFocused(true);
      return () => setHomeScreenIsFocused(false);
    }, [setHomeScreenIsFocused]),
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        // initialNumToRender={2}
        renderItem={({ item, index }) => (
          <FeedDisplay
            data={item}
            inView={homeScreenIsFocused && index === activePostIndex}
          />
        )}
        showsVerticalScrollIndicator={false}
        snapToInterval={DEVICE_HEIGHT}
        snapToAlignment="start"
        decelerationRate={"fast"}
        viewabilityConfig={VIEWABILITY_CONFIG}
        onViewableItemsChanged={onViewableItemsChanged}
        refreshControl={
          <RefreshControl
            style={styles.refreshControl}
            tintColor={PALETTE.ORANGE}
            title="Refreshing feed"
            titleColor={PALETTE.WHITE}
            colors={[PALETTE.ORANGE]}
            refreshing={refreshing}
            onRefresh={refreshPostsHandler}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: PALETTE.BLACK,
  },
  refreshControl: { backgroundColor: PALETTE.BLACK },
});

export default HomeScreen;

// const [commentsModalIsOpen, setCommentsModalIsOpen] =
//   useState<boolean>(false);

// const toggleCommentsModal = useCallback(() => {
//   setCommentsModalIsOpen(prev => !prev);
// }, [commentsModalIsOpen]);

{
  /* <Modal
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
      </Modal> */
}

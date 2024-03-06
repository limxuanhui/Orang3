import { useCallback, useContext, useRef, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { ActivityIndicator } from "react-native-paper";
import { AuthContext } from "../../../utils/contexts/AuthContext";
import useInfiniteDataManager from "../../../utils/hooks/useInfiniteDataManager";
import FeedDisplay from "../../feed/FeedDisplay";
import type { HomeScreenProps } from "./types/types";
import {
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
} from "../../../utils/constants/constants";
import { PALETTE } from "../../../utils/constants/palette";
import { VIEWABILITY_CONFIG } from "../../../utils/constants/feed";
import EmptyFeed from "../../feed/EmptyFeed";

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { user } = useContext(AuthContext);
  const [homeScreenIsFocused, setHomeScreenIsFocused] = useState<boolean>(true);
  const [activePostIndex, setActivePostIndex] = useState<number>(0);
  const { data, isLoading, isRefetching, onEndReached, onRefresh } =
    // useInfiniteDataManager("feeds", "dev");
    useInfiniteDataManager("feeds", "prod");

  const onViewableItemsChanged = useCallback(
    // Change type to more suitable one
    ({ viewableItems, changed }: any) => {
      if (viewableItems && viewableItems?.length > 0) {
        console.log(viewableItems[0]);
        setActivePostIndex(viewableItems[0].index);
      }
    },
    [setActivePostIndex],
  );

  useFocusEffect(
    useCallback(() => {
      setHomeScreenIsFocused(true);
      return () => setHomeScreenIsFocused(false);
    }, [setHomeScreenIsFocused]),
  );

  const dataFetched = data && data.pages && data.pages[0];
  const dataFetchedIsEmpty = dataFetched && data.pages[0].length === 0;
  const dataFetchedIsNotEmpty = dataFetched && data.pages[0].length > 0;

  return (
    <View style={styles.container}>
      {!data && isLoading ? (
        <View style={styles.flexCenter}>
          <ActivityIndicator size={48} color={PALETTE.ORANGE} />
        </View>
      ) : dataFetchedIsEmpty ? (
        <View style={styles.flexCenter}>
          <Text style={styles.description}>No feeds at the moment...</Text>
        </View>
      ) : dataFetchedIsNotEmpty ? (
        <FlatList
          data={data.pages.flat(1)}
          // initialNumToRender={2}
          renderItem={({ item, index }) => (
            <FeedDisplay
              data={item}
              inView={homeScreenIsFocused && index === activePostIndex}
            />
          )}
          showsVerticalScrollIndicator={false}
          snapToInterval={DEVICE_HEIGHT}
          snapToAlignment={"start"}
          decelerationRate={"fast"}
          viewabilityConfig={VIEWABILITY_CONFIG}
          onViewableItemsChanged={onViewableItemsChanged}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.2}
          refreshControl={
            <RefreshControl
              style={styles.refreshControl}
              tintColor={PALETTE.ORANGE}
              title="Refreshing feed"
              titleColor={PALETTE.WHITE}
              colors={[PALETTE.ORANGE]}
              refreshing={isRefetching}
              onRefresh={onRefresh}
            />
          }
        />
      ) : (
        <EmptyFeed>
          <Text
            style={{
              width: '70%',
              fontFamily: "Futura",
              fontSize: 24,
              fontWeight: 'bold',
              color: PALETTE.GREY,
            }}>
            Unable to get feeds for you at the moment...
          </Text>
        </EmptyFeed>
      )}
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
  flexCenter: { flex: 1, justifyContent: "center", alignItems: "center" },
  description: {
    fontFamily: "Futura",
    fontSize: 24,
    color: PALETTE.ORANGE,
  },
  refreshControl: { backgroundColor: PALETTE.BLACK },
});

export default HomeScreen;

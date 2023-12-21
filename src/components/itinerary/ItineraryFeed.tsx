import { useCallback, useEffect, useState } from "react";
import {
  RefreshControl,
  StyleSheet,
  Text,
  View,
  ViewToken,
} from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ActivityIndicator } from "react-native-paper";
import { MasonryFlashList } from "@shopify/flash-list";
import ItineraryFeedThumbnail from "./ItineraryFeedThumbnail";
import type {
  ItineraryFeedProps,
  ItineraryFeedThumbnailInfo,
} from "./types/types";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../utils/constants/constants";
import { DIMENSION } from "../../utils/constants/dimensions";
import { DUMMY_ITINERARY_FEED } from "../../data/itinerary";
import { PALETTE } from "../../utils/constants/palette";

const ItineraryFeed = ({ data }: ItineraryFeedProps) => {
  const insets = useSafeAreaInsets();
  const bottomTabBarHeight = useBottomTabBarHeight();
  const height = DEVICE_HEIGHT - bottomTabBarHeight - getStatusBarHeight();
  const [sample, setSample] = useState<ItineraryFeedThumbnailInfo[]>([]);

  const fetchFeedsList = async () => {
    const x = new Promise((resolve, reject) => {
      setTimeout(() => {        
        resolve(data as ItineraryFeedThumbnailInfo[]);
      }, 1000);
    }).then(v => setSample(data));
  };

  useEffect(() => {
    fetchFeedsList();    
  }, [fetchFeedsList]);

  const onViewableItemsChanged = useCallback(
    ({
      viewableItems,
      changed,
    }: {
      viewableItems: ViewToken[];
      changed: ViewToken[];
    }) => {
      console.log(
        "--------------- viewableItems ---------------",
        // JSON.stringify(viewableItems.map(el => "viewable: " + el.index),null,4),
        JSON.stringify(viewableItems, null, 4),
      );
      console.log(
        "--------------- changed ---------------",
        JSON.stringify(
          changed.map(el => "changed: " + el.index),
          null,
          4,
        ),
      );
      // const viewableIndex = viewableItems.find(el => el.item.coverMedia.type === "video")?.index || -1;
    },
    [],
  );

  const onEndReached = useCallback(() => {
    console.log("END REACHED");
    // Implement infinite scroll
    fetchFeedsList();
  }, [fetchFeedsList]);

  return (
    <View
      style={[
        styles.container,
        { height, paddingTop: 8, paddingBottom: insets.bottom + 8 },
      ]}>
      <MasonryFlashList
        data={sample}
        contentContainerStyle={styles.masonryList}
        numColumns={2}
        renderItem={({ item, index }) => (
          <ItineraryFeedThumbnail index={index} data={item} />
        )}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={200}
        onEndReached={onEndReached}
        // onLoad={}
        // onRefresh={}
        // refreshing
        // loading
        refreshControl={
          <RefreshControl
            style={styles.refreshControl}
            tintColor={PALETTE.ORANGE}
            title="Refreshing feed"
            titleColor={PALETTE.GREYISHBLUE}
            colors={[PALETTE.ORANGE]}
            refreshing={false}
            // onRefresh={refreshPostsHandler}
          />
        }
        // onViewableItemsChanged={onViewableItemsChanged}
        // viewabilityConfig={{ viewAreaCoveragePercentThreshold: 0 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: DIMENSION.HUNDRED_PERCENT,
  },
  masonryList: {
    paddingHorizontal: 2,
  },
  refreshControl: { backgroundColor: PALETTE.OFFWHITE },
});

export default ItineraryFeed;

{
  /* <MasonryList
        loading={sample.length===0}
        containerStyle={styles.masonryList}
        data={sample}
        numColumns={2}
        renderItem={({ item, i }) => (
          <ItineraryFeedThumbnail
            index={i}
            data={item as ItineraryFeedThumbnailInfo}
          />
        )}
        LoadingView={<ActivityIndicator size={32} color="orange"/>}
        ListEmptyComponent={<Text>No feeds...</Text>}
        showsVerticalScrollIndicator={false}
        // onEndReached={}
        // onRefresh={}            
      /> */
}

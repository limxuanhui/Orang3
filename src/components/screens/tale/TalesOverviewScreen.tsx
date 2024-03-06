import { memo, useCallback, useEffect, useRef, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import type { TaleThumbnailInfo } from "../../tale/types/types";
import MasonryList from "@react-native-seoul/masonry-list";
import {
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
} from "../../../utils/constants/constants";
import { DUMMY_TALE_THUMBNAILS } from "../../../data/tales";
import { PALETTE } from "../../../utils/constants/palette";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import {
  FlashList,
  MasonryFlashList,
  MasonryFlashListRef,
} from "@shopify/flash-list";
import { getStatusBarHeight } from "react-native-status-bar-height";
import TaleThumbnail from "../../tale/TaleThumbnail";
import { DIMENSION } from "../../../utils/constants/dimensions";
import { ActivityIndicator } from "react-native-paper";
import useInfiniteDataManager from "../../../utils/hooks/useInfiniteDataManager";
import React from "react";
import GypsieSkeleton from "../../common/GypsieSkeleton";

const SkeletonThumbnail = memo(() => {
  return (
    <View
      style={{
        height: 300,
        width: DEVICE_WIDTH / 2 - 8,
        borderRadius: 12,
        margin: 3,
      }}>
      <View
        style={{
          flex: 5,
          width: "100%",
          marginVertical: 4,
          borderRadius: 12,
          overflow: "hidden",
        }}>
        <GypsieSkeleton />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          width: "100%",
          // borderWidth: 1,
          // borderColor:'green'
        }}>
        <View
          style={{
            height: 40,
            width: 40,
            borderRadius: 20,
            overflow: "hidden",
          }}>
          <GypsieSkeleton />
        </View>
        <View
          style={{
            flex: 1,
            height: 40,
            marginLeft: 8,
            borderRadius: 12,
            overflow: "hidden",
          }}>
          <GypsieSkeleton />
        </View>
      </View>
    </View>
  );
});

const SkeletonThumbnailList = memo(() => {
  return (
    <FlatList
      // style={{flex:1,height:DEVICE_HEIGHT}}
      // contentContainerStyle={{ paddingHorizontal: 2 }}
      data={new Array(20)}
      numColumns={2}
      renderItem={() => <SkeletonThumbnail />}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
    />
  );
});

const TalesOverviewScreen = () => {
  const insets = useSafeAreaInsets();
  const bottomTabBarHeight = useBottomTabBarHeight();
  const height = DEVICE_HEIGHT - bottomTabBarHeight - getStatusBarHeight();

  const {
    data,
    error,
    hasNextPage,
    isError,
    isFetching,
    isLoading,
    isRefetching,
    queryClient,
    fetchNextPage,
    refetch,
    onEndReached,
    onRefresh,
  } = useInfiniteDataManager("tales-md", "dev");

  const dataFetched = data && data.pages && data.pages[0];
  const dataFetchedIsEmpty = dataFetched && data.pages[0].length === 0;
  const dataFetchedIsNotEmpty = dataFetched && data.pages[0].length > 0;

  console.log("===========================");
  console.log("isFetching: ", isFetching);
  console.log("isRefetching: ", isRefetching);
  console.log("isLoading: ", isLoading);
  console.log("isError: ", isError);
  console.log("hasNextPage: ", hasNextPage);
  console.log("===========================\n");

  useEffect(() => {
    console.log("TalesOverviewScreen Mounted");
    return () => {
      console.log("TalesOverviewScreen Unmounted");
    };
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.masonryListContainer,
          { height, paddingTop: 8, paddingBottom: insets.bottom + 8 },
        ]}>
        {dataFetchedIsEmpty ? (
          <View style={styles.flexCenter}>
            <Text style={styles.description}>No tales at the moment...</Text>
          </View>
        ) : (
          <MasonryList
            containerStyle={styles.masonryList}
            data={
              dataFetched ? data.pages.flat(1) : ([] as TaleThumbnailInfo[])
            }
            numColumns={2}
            renderItem={({ item, i }) => (
              <TaleThumbnail data={item as TaleThumbnailInfo} />
            )}
            ListEmptyComponent={<SkeletonThumbnailList />}
            ListFooterComponent={
              <ActivityIndicator
                style={{ marginVertical: 8 }}
                size={24}
                color={PALETTE.ORANGE}
              />
            }
            showsVerticalScrollIndicator={false}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.5}
            onRefresh={onRefresh}
            refreshing={isRefetching}
            refreshControlProps={{
              title: "Refreshing tales...",
              titleColor: PALETTE.GREYISHBLUE,
              tintColor: PALETTE.ORANGE,
            }}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
    backgroundColor: PALETTE.OFFWHITE,
  },
  flexCenter: { flex: 1, justifyContent: "center", alignItems: "center" },
  description: {
    fontFamily: "Futura",
    fontSize: 24,
    color: PALETTE.ORANGE,
  },
  masonryListContainer: {
    width: DIMENSION.HUNDRED_PERCENT,
  },
  masonryList: {
    paddingHorizontal: 2,
  },
  refreshControl: { backgroundColor: PALETTE.OFFWHITE },
});

export default TalesOverviewScreen;

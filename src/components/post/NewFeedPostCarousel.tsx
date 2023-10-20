import { useCallback, useMemo, useState } from "react";
import { Animated, Image, StyleSheet, Text, View } from "react-native";
// import FeedDescription from "./FeedDescription";
import PageIndicator from "../common/PageIndicator";
import VlogPlayer from "../vlog/VlogPlayer";
import type { NewFeedPostCarouselProps } from "./types/types";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../utils/constants/constants";
import { DIMENSION } from "../../utils/constants/dimensions";
import { PALETTE } from "../../utils/constants/palette";
import { VIEWABILITY_CONFIG } from "../../utils/constants/feed";
import EmptyFeed from "../feed/EmptyFeed";
import { useAppDispatch, useAppSelector } from "../../utils/redux/hooks";
import { setSelectedItemId } from "../../utils/redux/reducers/newFeedPostSlice";
import FeedDescription from "../feed/FeedDescription";
import GypsieFeedCarousel from "../common/GypsieFeedCarousel";

const NewFeedPostCarousel = () => {
  // use global object to get handle
  const handle = "@Joseph";
  const { items, selectedItemId: currIndex } = useAppSelector(
    state => state.newFeedPost,
  );
  const dispatch = useAppDispatch();

  const onViewableItemsChanged = useCallback(
    ({ viewableItems, itemsChanged }: any) => {
      if (viewableItems && viewableItems.length > 0) {
        dispatch(setSelectedItemId(viewableItems[0].index));
      }
    },
    [setSelectedItemId, dispatch],
  );

  return (
    <GypsieFeedCarousel
      items={items}
      currIndex={currIndex}
      handle={handle}
      onViewableItemsChanged={onViewableItemsChanged}
    />
  );
};

const styles = StyleSheet.create({});

export default NewFeedPostCarousel;

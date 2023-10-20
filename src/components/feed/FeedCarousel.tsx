import { useCallback, useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import GypsieFeedCarousel from "../common/GypsieFeedCarousel";
import type { FeedCarouselProps } from "./types/types";

const FeedCarousel = ({ handle, items, inView }: FeedCarouselProps) => {
  const [currIndex, setCurrIndex] = useState<number>(0);

  const onViewableItemsChanged = useCallback(
    ({ viewableItems, itemsChanged }: any) => {
      if (viewableItems && viewableItems.length > 0) {
        setCurrIndex(viewableItems[0].index);
      }
    },
    [setCurrIndex],
  );

  return (
    <GypsieFeedCarousel
      items={items}
      currIndex={currIndex}
      handle={handle}
      inView={inView}
      onViewableItemsChanged={onViewableItemsChanged}
    />
  );
};

const styles = StyleSheet.create({});

export default FeedCarousel;

import { useCallback, useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import GypsieFeedCarousel from "../common/GypsieFeedCarousel";
import type { FeedCarouselProps, FeedItem } from "./types/types";
import { AWS_S3_MEDIA_URL } from "@env";

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

  const itemsToRender:FeedItem[] = items.map(el => {
    const prefix = el.media.uri.split("-")[0];
    const uri = `${AWS_S3_MEDIA_URL}/${prefix}/${el.media.uri}`;
    // console.log("URI: ", uri);
    const item = {
      ...el,
      media: {
        ...el.media,
        uri,
        // uri: el.media.uri
      },
    };
    return item;
  });

  return (
    <GypsieFeedCarousel
      items={itemsToRender}
      currIndex={currIndex}
      handle={handle}
      inView={inView}
      onViewableItemsChanged={onViewableItemsChanged}
    />
  );
};

const styles = StyleSheet.create({});

export default FeedCarousel;

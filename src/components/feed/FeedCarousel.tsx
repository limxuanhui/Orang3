import { useCallback, useState } from 'react';
import GypsieFeedCarousel from '../common/GypsieFeedCarousel';
import type { FeedCarouselProps, FeedItem } from './types/types';
import { AWS_CLOUDFRONT_URL_RAW } from '@env';

const FeedCarousel = ({ handle, items, inView }: FeedCarouselProps) => {
  const [currIndex, setCurrIndex] = useState<number>(0);

  const onViewableItemsChanged = useCallback(
    ({ viewableItems, _itemsChanged }: any) => {
      if (viewableItems && viewableItems.length > 0) {
        setCurrIndex(viewableItems[0].index);
      }
    },
    [setCurrIndex],
  );

  const itemsToRender: FeedItem[] = items.map(el => {
    const uri = `${AWS_CLOUDFRONT_URL_RAW}/${el.media.uri}`;
    const item = {
      ...el,
      media: {
        ...el.media,
        uri,
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

export default FeedCarousel;

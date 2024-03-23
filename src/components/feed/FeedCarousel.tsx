import { useCallback, useState } from 'react';
import GypsieFeedCarousel from '../common/GypsieFeedCarousel';
import type { FeedCarouselProps, FeedItem } from './types/types';
import { AWS_CLOUDFRONT_URL_RAW, AWS_S3_MEDIA_URL } from '@env';

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
    const prefix = el.media.uri.split('-')[0];
    console.log('PREFIX: ', prefix);
    const uri2 = `${AWS_S3_MEDIA_URL}/${prefix}/${el.media.uri}`;
    const uri = `${AWS_CLOUDFRONT_URL_RAW}/${el.media.uri}`;
    console.log('URI: ', uri);
    console.log('URI2: ', uri2);
    const item = {
      ...el,
      media: {
        ...el.media,
        uri,
        // uri: `${AWS_S3_MEDIA_URL}/${el.media.uri}`,
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

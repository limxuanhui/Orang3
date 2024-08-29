import { useCallback, useContext, useEffect } from 'react';
import Config from 'react-native-config';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { writeFeed_setSelectedItemId } from '@redux/reducers/writeFeedSlice';
import GypsieFeedCarousel from '@components/common/GypsieFeedCarousel';
import { AuthContext } from '@contexts/AuthContext';
import { type FeedItem } from '@components/feed/types/types';
import { printPrettyJson } from '@helpers/functions';

const WriteFeedCarousel = () => {
  const { user } = useContext(AuthContext);
  const handle = user ? `${user.handle}` : '';

  const { items, selectedItemId: currIndex } = useAppSelector(
    state => state.writeFeed,
  );
  const dispatch = useAppDispatch();

  const onViewableItemsChanged = useCallback(
    ({ viewableItems, changed }: any) => {
      if (viewableItems && viewableItems.length > 0) {
        console.log('Viewable items: ');
        printPrettyJson(viewableItems);
        console.log('Changed items: ');
        printPrettyJson(changed);

        dispatch(writeFeed_setSelectedItemId({ id: viewableItems[0].index }));
      }
    },
    [dispatch],
  );

  const itemsToRender: FeedItem[] = items.map(el => {
    if (el.isRemote) {
      const uri = `${Config.AWS_CLOUDFRONT_URL_RAW}/${el.media.uri}`;
      const item = {
        ...el,
        media: {
          ...el.media,
          uri,
        },
      };
      return item;
    }
    return el;
  });

  useEffect(() => {
    console.log('WriteFeedCarousel useEffect: currIndex', currIndex);
  }, [currIndex]);

  return (
    <GypsieFeedCarousel
      items={itemsToRender}
      currIndex={currIndex}
      handle={handle}
      onViewableItemsChanged={onViewableItemsChanged}
    />
  );
};

export default WriteFeedCarousel;

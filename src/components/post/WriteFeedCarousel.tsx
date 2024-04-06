import { useCallback, useContext } from 'react';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { writeFeed_setSelectedItemId } from '@redux/reducers/writeFeedSlice';
import GypsieFeedCarousel from '@components/common/GypsieFeedCarousel';
import { AuthContext } from '@contexts/AuthContext';

const WriteFeedCarousel = () => {
  const { user } = useContext(AuthContext);
  const handle = user ? `${user.handle}` : '';

  const { items, selectedItemId: currIndex } = useAppSelector(
    state => state.writeFeed,
  );
  const dispatch = useAppDispatch();

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: any) => {
      if (viewableItems && viewableItems.length > 0) {
        dispatch(writeFeed_setSelectedItemId(viewableItems[0].index));
      }
    },
    [dispatch],
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

export default WriteFeedCarousel;

import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/redux/hooks";
import { setSelectedItemId } from "../../utils/redux/reducers/newFeedSlice";
import GypsieFeedCarousel from "../common/GypsieFeedCarousel";

const NewFeedCarousel = () => {
  // use global object to get handle
  const handle = "@Joseph";
  const { items, selectedItemId: currIndex } = useAppSelector(
    state => state.newFeed,
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

export default NewFeedCarousel;

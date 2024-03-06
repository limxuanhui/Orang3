import { useCallback, useContext } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/redux/hooks";
import { writeFeed_setSelectedItemId } from "../../utils/redux/reducers/writeFeedSlice";
import GypsieFeedCarousel from "../common/GypsieFeedCarousel";
import { AuthContext } from "../../utils/contexts/AuthContext";

const WriteFeedCarousel = () => {
  const { user } = useContext(AuthContext);
  const handle = user ? `@${user.handle}` : "";

  const { items, selectedItemId: currIndex } = useAppSelector(
    state => state.writeFeed,
  );
  const dispatch = useAppDispatch();

  const onViewableItemsChanged = useCallback(
    ({ viewableItems, itemsChanged }: any) => {
      if (viewableItems && viewableItems.length > 0) {
        dispatch(writeFeed_setSelectedItemId(viewableItems[0].index));
      }
    },
    [writeFeed_setSelectedItemId, dispatch],
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

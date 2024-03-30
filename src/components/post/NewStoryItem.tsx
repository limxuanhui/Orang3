import { memo, useCallback } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import GypsieButton from '@components/common/buttons/GypsieButton';
import FeedItemThumbnailsCarousel from '@components/tale/FeedItemThumbnailsCarousel';
import { type StoryItem, StoryItemType } from './types/types';
import { PALETTE } from '@constants/palette';
import { DIMENSION } from '@constants/dimensions';
import CrossIcon from '@icons/CrossIcon';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { writeTale_setSelectedStoryItemIndex } from '@redux/reducers/writeTaleSlice';
import { printPrettyJson } from '@helpers/functions';
import { FeedItemThumbnailsDisplayFormat } from '@components/tale/types/types';
import { STORY_TEXT_STYLES } from '@constants/text';

type NewStoryItemProps = {
  item: StoryItem;
  onStoryItemTextChange: (id: string, text: string) => void;
  onPressDeleteStoryItem: (index: string) => void;
};

const NewStoryItem = ({
  item,
  onStoryItemTextChange,
  onPressDeleteStoryItem,
}: NewStoryItemProps) => {
  console.log('Investigate why is this component rendering 3 times');
  printPrettyJson(item);
  const dispatch = useAppDispatch();
  const { selectedStoryItemIndex } = useAppSelector(state => state.writeTale);

  const onTextInputFocus = useCallback(() => {
    dispatch(
      writeTale_setSelectedStoryItemIndex({
        selectedStoryItemIndex: item.order,
      }),
    );
  }, [dispatch, item.order]);

  if (item.type === StoryItemType.Text) {
    return (
      <View style={styles.storyItemText}>
        <TextInput
          style={[
            styles.storyItemTextInput,
            STORY_TEXT_STYLES[item.data.style],
            selectedStoryItemIndex === item.order
              ? // eslint-disable-next-line react-native/no-inline-styles
                {
                  borderLeftWidth: 5,
                  borderLeftColor: PALETTE.ORANGE,
                  backgroundColor: PALETTE.OFFWHITE,
                }
              : {},
          ]}
          onKeyPress={({ nativeEvent }) => {
            if (
              nativeEvent.key === 'Backspace' &&
              item.data.text.trim() === ''
            ) {
              onPressDeleteStoryItem(item.id);
            }
          }}
          onFocus={onTextInputFocus}
          value={item.data.text}
          onChangeText={text => onStoryItemTextChange(item.id, text)}
          autoFocus
          multiline
          selectionColor={PALETTE.ORANGE}
          scrollEnabled={false}
        />
      </View>
    );
  } else if (item.type === StoryItemType.Media) {
    return (
      <View style={styles.storyItemMedia} key={item.id}>
        <FeedItemThumbnailsCarousel
          feedId={item.data.feedId}
          displayFormat={FeedItemThumbnailsDisplayFormat.CAROUSEL}
        />
        <GypsieButton
          customButtonStyles={styles.deleteButton}
          customIconStyles={styles.deleteIcon}
          Icon={CrossIcon}
          onPress={() => onPressDeleteStoryItem(item.id)}
        />
      </View>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  storyItemText: {
    flexDirection: 'row',
  },
  storyItemTextInput: {
    height: DIMENSION.HUNDRED_PERCENT,
    width: DIMENSION.HUNDRED_PERCENT,
    marginVertical: 8,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 0,
  },
  storyItemMedia: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
  },
  deleteButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: 24,
    width: 24,
    shadowColor: PALETTE.GREY,
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    zIndex: 1,
  },
  deleteIcon: {
    fontSize: 24,
    color: PALETTE.GREY,
  },
});

export default memo(NewStoryItem);

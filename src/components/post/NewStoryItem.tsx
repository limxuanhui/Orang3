import { StyleSheet, TextInput, View } from 'react-native';
import GypsieButton from '@components/common/buttons/GypsieButton';
import FeedItemThumbnailsCarousel from '@components/tale/FeedItemThumbnailsCarousel';
import { type StoryItem, StoryItemType } from './types/types';
import { PALETTE } from '@constants/palette';
import { DIMENSION } from '@constants/dimensions';
import CrossIcon from '@icons/CrossIcon';

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
  console.log('ITEM: ', item);
  if (item.type === StoryItemType.Text) {
    return (
      <View style={styles.storyItemText}>
        <TextInput
          style={[styles.storyItemTextInput, item.style]}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === 'Backspace' && item.text.trim() === '') {
              onPressDeleteStoryItem(item.id);
            }
          }}
          // onFocus={e => {
          //   console.log(e.nativeEvent.text);
          //   setFocusedText(e.nativeEvent.text);
          // }}
          value={item.text}
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
        <FeedItemThumbnailsCarousel data={item.data} />
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
    marginBottom: 8,
    // borderBottomWidth: 1,
    // borderColor: PALETTE.LIGHTERGREY,
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

export default NewStoryItem;

import { StyleSheet, Text, TextInput, View } from "react-native";
import GypsieButton from "../common/buttons/GypsieButton";
import SquaredCrossIcon from "../common/icons/SquaredCrossIcon";
import LinkedFeedsList from "../itinerary/LinkedFeedsList";
import { type StoryItem, StoryItemType } from "./types/types";
import { PALETTE } from "../../utils/constants/palette";
import { useEffect } from "react";

type NewStoryItemProps = {
  item: StoryItem;
  onStoryItemTextChange: (id: string, text: string) => void;
  onPressDeleteLinkedFeed: () => void;
};

const NewStoryItem = ({
  item,
  onStoryItemTextChange,
  onPressDeleteLinkedFeed,
}: NewStoryItemProps) => {
  console.log("Investigate why is this component rendering 3 times");

  if (item.type === StoryItemType.Text) {
    return (
      <View style={styles.storyItemText}>
        <TextInput
          style={[styles.storyItemTextInput, item.style]}
          // onKeyPress={}
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
        <GypsieButton
          customButtonStyles={styles.deleteButton}
          customIconStyles={styles.deleteIcon}
          Icon={SquaredCrossIcon}
          onPress={onPressDeleteLinkedFeed}
        />
      </View>
    );
  } else if (item.type === StoryItemType.Media) {
    return (
      <View style={styles.storyItemMedia} key={item.id}>
        <LinkedFeedsList data={item.data} />
        <GypsieButton
          customButtonStyles={styles.deleteButton}
          customIconStyles={styles.deleteIcon}
          Icon={SquaredCrossIcon}
          onPress={onPressDeleteLinkedFeed}
        />
      </View>
    );
  } else return null;
};

const styles = StyleSheet.create({
  storyItemText: {
    flexDirection: "row",
  },
  storyItemTextInput: {
    height: "100%",
    width: "100%",
    marginBottom: 8,
    borderBottomWidth: 1,
    borderColor: PALETTE.LIGHTERGREY,
  },
  storyItemMedia: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 16,
  },
  deleteButton: {
    position: "absolute",
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
    color: PALETTE.RED,
  },
});

export default NewStoryItem;

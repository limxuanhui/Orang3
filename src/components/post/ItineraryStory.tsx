import { SectionList, StyleProp, TextStyle } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { LinkedFeedsListItem } from "../itinerary/types/types";
import Divider from "../common/Divider";
import { BottomSheetSectionList } from "@gorhom/bottom-sheet";

export type StoryText = {
  text: string;
  style: StyleProp<TextStyle>;
};

type StoryMedia = LinkedFeedsListItem[];

export type StorySection = {
  title: string;
  data: StoryText[];
};

type ItineraryStoryProps = {
  data: StorySection[];
};

const ItineraryStory = ({ data }: ItineraryStoryProps) => {
  return (
    <BottomSheetSectionList
      style={{ borderWidth: 1, borderColor: "green", marginTop: 8 }}
      sections={data}
      renderSectionHeader={el => (
        <Text style={{ backgroundColor: "grey" }}>{el.section.title}</Text>
      )}
      renderItem={el => <Text style={el.item.style}>{el.item.text}</Text>}
      ItemSeparatorComponent={({leadingItem, separator}) => {
        console.log("FUCK", leadingItem);

        return <Divider shade="dark"/>;
      }}
      SectionSeparatorComponent={() => (
        <View
          style={{
            width: 100,
            height: 2,
            backgroundColor: "red",
            marginTop: 16,
          }}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({});

export default ItineraryStory;

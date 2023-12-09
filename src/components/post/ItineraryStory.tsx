import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomSheetSectionList } from "@gorhom/bottom-sheet";
import LinkedFeedsList from "../itinerary/LinkedFeedsList";
import { StorySectionItemType, type ItineraryStoryProps } from "./types/types";

const ItineraryStory = ({ data }: ItineraryStoryProps) => {
  const insets = useSafeAreaInsets();

  return (
    <BottomSheetSectionList
      style={[styles.container, { marginBottom: insets.bottom + 48 }]}
      showsVerticalScrollIndicator={false}
      sections={data}
      renderSectionHeader={el => (
        <View style={{ marginBottom: 8 }}>
          <Text style={el.section.title.style}>{el.section.title.text}</Text>
        </View>
      )}
      renderItem={el => {
        if (el.item.type === StorySectionItemType.Text) {
          return (
            <View style={{ marginVertical: 12 }}>
              <Text style={el.item.style}>{el.item.text}</Text>
            </View>
          );
        } else {
          return (
            <View style={{ marginVertical: 12 }}>
              <LinkedFeedsList data={el.item.data} />
            </View>
          );
        }
      }}
      // ItemSeparatorComponent={({ leadingItem, separator }) => {
      //   console.log("leadingItem ------ ", leadingItem);
      //   console.log("separator ------ ", separator);

      //   return <Divider style={{ marginVertical: 8 }} shade="light" />;
      // }}
      // SectionSeparatorComponent={() => (
      //   <View
      //     style={{
      //       height: 4,
      //       width: 100,
      //       backgroundColor: PALETTE.ORANGE,
      //       borderRadius: 4,
      //     }}
      //   />
      // )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    borderWidth: 0,
    borderColor: "green",
  },
});

export default ItineraryStory;

import { StyleSheet, Text, View } from "react-native";
import MasonryList from "@react-native-seoul/masonry-list";
import TaleThumbnail from "../tale/TaleThumbnail";
import { TaleThumbnailInfo } from "../tale/types/types";
import { DUMMY_TALE_THUMBNAILS } from "../../data/tales";
import { useContext } from "react";
import { BottomTabBarHeightContext } from "@react-navigation/bottom-tabs";
import { DEVICE_HEIGHT } from "../../utils/constants/constants";

const MyTales = () => {
  // Fetch data that belong to user
  const data: TaleThumbnailInfo[] = DUMMY_TALE_THUMBNAILS;

  const bh = useContext(BottomTabBarHeightContext) || 0;
  const height = (1 - 0.25 - 0.05) * DEVICE_HEIGHT - bh;

  return (
    <View style={[styles.container, { height: height }]}>
      <MasonryList
        contentContainerStyle={{
          //   borderWidth: 0,
          //   borderColor: "red",
          paddingHorizontal: 2,
        }}
        data={data}
        renderItem={el => <TaleThumbnail data={el.item as TaleThumbnailInfo} />}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default MyTales;

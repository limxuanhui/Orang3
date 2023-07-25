import { useCallback, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../utils/constants/constants";
import Indicator from "../common/Indicator";

const bgs = ["#A5BBFF", "#DDBEFE", "#FF63ED", "#B98EFF"];
const DATA = [
  {
    key: "3571572",
    title: "Multi-lateral intermediate moratorium",
    description:
      "I'll back up the multi-byte XSS matrix, that should feed the SCSI application!",
    image: "/Users/limxuanhui/bluextech/gypsie/assets/images/sample1.jpg",
  },
  {
    key: "3571747",
    title: "Automated radical data-warehouse",
    description:
      "Use the optical SAS system, then you can navigate the auxiliary alarm!",
    image: "/Users/limxuanhui/bluextech/gypsie/assets/images/sample2.jpg",
  },
  {
    key: "3571680",
    title: "Inverse attitude-oriented system engine",
    description:
      "The ADP array is down, compress the online sensor so we can input the HTTP panel!",
    image: "/Users/limxuanhui/bluextech/gypsie/assets/images/sample3.jpg",
  },
  {
    key: "3571603",
    title: "Monitored global data-warehouse",
    description: "We need to program the open-source IB interface!",
    image: "/Users/limxuanhui/bluextech/gypsie/assets/images/sample1.jpg",
  },
];

const TestScreen = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const onViewableItemsChanged = useCallback(
    ({ viewableItems, itemsChanged }: any) => {
      if (viewableItems && viewableItems.length > 0) {
        setActiveIndex(viewableItems[0].index);
      }
    },
    [],
  );

  return (
    <View style={styles.container}>
      <Animated.FlatList
        contentContainerStyle={{ paddingBottom: 100 }}
        data={DATA}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={32}
        onScroll={e => {
          Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
            useNativeDriver: false,
          });
        }}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 51,
          minimumViewTime: 200,
        }}
        pagingEnabled
        keyExtractor={item => item.key}
        renderItem={({ item }) => (
          <View
            style={{
              width: DEVICE_WIDTH,
              //   justifyContent: "center",
              alignItems: "center",
            }}>
            <View
              style={{
                flex: 0.7,
                backgroundColor: "red",
                justifyContent: "center",
                padding: 20,
              }}>
              <Image
                source={{ uri: item.image }}
                style={{
                  width: DEVICE_WIDTH / 2,
                  height: DEVICE_WIDTH / 2,
                  resizeMode: "contain",
                  //   backgroundColor: "red",
                }}
              />
            </View>
            <View style={{ flex: 0.3, backgroundColor: "skyblue" }}>
              <Text
                style={{ fontWeight: "800", fontSize: 24, marginBottom: 10 }}>
                {item.title + item.key}
              </Text>
              <Text>{item.description}</Text>
            </View>
          </View>
        )}
      />
      <Indicator
        scrollX={scrollX}
        dataCount={DATA.length}
        activeIndex={activeIndex}
      />
    </View>
  );
};

export default TestScreen;

const styles = StyleSheet.create({
  container: {
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
    justifyContent: "center",
  },
});

{
  /* <Carousel
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10],
        }}
        // overscrollEnabled={false}
        // pagingEnabled={false}
        // snapEnabled={false}
        loop={false}
        width={DEVICE_WIDTH}
        height={DEVICE_HEIGHT}
        data={DUMMY_POSTS[0].items}
        renderItem={item =>
          item.item.type === "video" ? (
            <VlogPlayer
              vlog={item.item}
              shouldPlay={inView && item.index === currIndex}
            />
          ) : (
            <Image
              style={styles.image}
              source={{ uri: item.item.uri }}
              resizeMode="contain"
            />
          )
        }
        onSnapToItem={(index: number) => {
          console.warn("GypsiePost item index: ", index);
          setCurrIndex(index);
        }}
      /> */
}

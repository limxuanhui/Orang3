import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import {
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
  MAP_SCREEN_BOTTOM_SHEET_CONSTANTS,
} from "../../utils/constants/constants";
import BottomSheet from "../common/BottomSheet";
import TestScreen from "./TestScreen";

const Tab = createMaterialTopTabNavigator();

const MapScreen = () => {
  const STATUS_BAR_HEIGHT = getStatusBarHeight();
  const TOP_TAB_BAR_HEIGHT = 40;
  console.log("StatusBar height: ", STATUS_BAR_HEIGHT);
  const X = () => {
    return (
      <SafeAreaView style={{ marginTop: STATUS_BAR_HEIGHT }}>
        <Text>X</Text>
      </SafeAreaView>
    );
  };
  const Y = () => {
    return (
      <View
        style={{
          width: "100%",
          height: DEVICE_HEIGHT - STATUS_BAR_HEIGHT - TOP_TAB_BAR_HEIGHT,
          borderWidth: 2,
          borderColor: "red",
        }}>
        <Text>Y</Text>
        <BottomSheet
          height={MAP_SCREEN_BOTTOM_SHEET_CONSTANTS.height}
          width={MAP_SCREEN_BOTTOM_SHEET_CONSTANTS.width}
          maxTranslateY={MAP_SCREEN_BOTTOM_SHEET_CONSTANTS.maxTranslateY}
        />
      </View>
    );
  };
  const Z = () => {
    return (
      <View>
        <Text>Z</Text>
      </View>
    );
  };
  return (
    // <>
    <Tab.Navigator
      style={{
        top: 0,
        // height: DEVICE_HEIGHT /2,
        borderWidth: 5,
        borderColor: "orange",
      }}
      initialRouteName="Feed"
      screenOptions={{
        tabBarActiveTintColor: "#e91e63",
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: {
          top: STATUS_BAR_HEIGHT,
          backgroundColor: "white",
          height: TOP_TAB_BAR_HEIGHT,
        },
      }}>
      <Tab.Screen name="test" component={X} options={{ tabBarLabel: "Home" }} />
      <Tab.Screen
        name="test2"
        component={Y}
        options={{ tabBarLabel: "Updates" }}
      />
      <Tab.Screen
        name="Profile"
        component={Z}
        options={{ tabBarLabel: "Profile" }}
      />
    </Tab.Navigator>
    // </>
  );
};

const styles = StyleSheet.create({});

export default MapScreen;

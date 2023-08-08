import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import DriversOverviewScreen from "../screens/driver/DriversOverviewScreen";
import HomeScreen from "../screens/feed/HomeScreen";
import NewFeedPostScreen from "../screens/post/NewFeedPostScreen";
import ItineraryStackNavigator from "./ItineraryStackNavigator";
import ProfileStackNavigator from "./ProfileStackNavigator";
import type { BottomTabNavigatorParamList } from "./types/types";
import { PALETTE } from "../../utils/constants/palette";
import TestScreen from "../screens/TestScreen";

const BottomTab = createBottomTabNavigator<BottomTabNavigatorParamList>();

const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={({ navigation, route }) => {
        return {
          headerShown: false,
          tabBarStyle: {
            backgroundColor:
              route.name === "ProfileStack" ||
              route.name === "ItineraryStack" ||
              route.name === "DriverStack"
                ? PALETTE.OFFWHITE
                : PALETTE.TRANSPARENT,
            position: "absolute",
            bottom: 0,
            elevation: 0,
            borderTopWidth: 0,
          },
          tabBarShowLabel: false,
        };
      }}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="flower"
              size={24}
              color={focused ? PALETTE.ORANGE : PALETTE.GREY}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="ItineraryStack"
        component={ItineraryStackNavigator}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="map"
              size={24}
              color={focused ? PALETTE.ORANGE : PALETTE.GREY}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Post"
        component={TestScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="plus-circle"
              size={40}
              color={focused ? PALETTE.ORANGE : PALETTE.ORANGE}
            />
          ),
            
        }}    
        listeners={({ navigation }) => ({
          tabPress: (event) => {
            event.preventDefault();
            navigation.navigate("Modal", { screen: "NewFeedPost" });
          },
        })}
      />
      <BottomTab.Screen
        name="DriverStack"
        component={DriversOverviewScreen}
        options={{
          headerShown: true,
          title: "Find drivers",
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="car"
              size={24}
              color={focused ? PALETTE.ORANGE : PALETTE.GREY}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="ProfileStack"
        component={ProfileStackNavigator}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="brain"
              size={24}
              color={focused ? PALETTE.ORANGE : PALETTE.GREY}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;

import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/feed/HomeScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import MapStackNavigator from "./MapStackNavigator";

import type { BottomTabNavigatorParamList } from "../../utils/types/navigation";
import { PALETTE } from "../../utils/constants/palette";
import ProfileStackNavigator from "./ProfileStackNavigator";

const BottomTab = createBottomTabNavigator<BottomTabNavigatorParamList>();

const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="home"
      screenOptions={({ navigation, route }) => {
        console.log("navigation: ", navigation);
        console.log("route: ", route);
        return {
          headerShown: false,
          // tabBarVisible: false,
          tabBarStyle: {
            // backgroundColor: getBackgroundColor(route.name),
            backgroundColor:
              route.name === "Profile"
                ? "white"
                : route.name === "map-stack"
                ? "#aaaaaa55"
                : "transparent",
            position: "absolute",
            bottom: 0,
            elevation: 0,
            borderTopWidth: 0,
          },
          tabBarShowLabel: false,
          tabBarIconStyle: { color: route.name === "Profile" ? "orange" : "" },
        };
      }}>
      <BottomTab.Screen
        name="home"
        component={HomeScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <Entypo
              // name={focused ? "home" : "home-outline"}
              name="home"
              size={24}
              color={focused ? PALETTE.ORANGE : PALETTE.GREY}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="map-stack"
        component={MapStackNavigator}
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
        name="Profile"
        component={ProfileStackNavigator}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="user"
              size={24}
              color={focused ? PALETTE.ORANGE : PALETTE.GREY}
            />
          ),
        }}
        // getId={({ params}) => params.avatarUri}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;

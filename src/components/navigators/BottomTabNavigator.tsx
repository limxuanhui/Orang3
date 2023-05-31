import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { PALETTE } from "../../utils/constants/palette";
import { BottomTabNavigatorParamList } from "../../utils/types/navigation";
import HomeScreen from "../screens/HomeScreen";
import ItineraryPlanningScreen from "../screens/ItineraryPlanningScreen";
import MapScreen from "../screens/MapScreen";
import ProfileScreen from "../screens/user/ProfileScreen";
import TestScreen from "../screens/TestScreen";
import MapStackNavigator from "./MapStackNavigator";

const BottomTab = createBottomTabNavigator<BottomTabNavigatorParamList>();

const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          // backgroundColor: getBackgroundColor(route.name),
          backgroundColor:
            route.name === "profile"
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
        tabBarIconStyle: { color: route.name === "profile" ? "orange" : "" },
      })}>
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
      {/* <BottomTab.Screen
        name="test"
        component={TestScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="user"
              size={24}
              color={focused ? "#ffffff" : "#aaaaaa"}
            />
          ),
        }}
      /> */}
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
        name="profile"
        component={ProfileScreen}
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

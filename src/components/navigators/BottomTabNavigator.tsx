import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/feed/HomeScreen";
import ItineraryStackNavigator from "./ItineraryStackNavigator";
import ProfileStackNavigator from "./ProfileStackNavigator";
import type { BottomTabNavigatorParamList } from "./types/types";
import { PALETTE } from "../../utils/constants/palette";

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
              route.name === "ProfileStack"
                ? PALETTE.OFFWHITE
                : route.name === "ItineraryStack"
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

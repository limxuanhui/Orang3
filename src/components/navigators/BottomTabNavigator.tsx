import { useCallback, useContext } from "react";
import { Image, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import DriversOverviewScreen from "../screens/driver/DriversOverviewScreen";
import HomeScreen from "../screens/feed/HomeScreen";
import ItineraryStackNavigator from "./ItineraryStackNavigator";
import ProfileStackNavigator from "./ProfileStackNavigator";
import type { BottomTabNavigatorParamList } from "./types/types";
import { PALETTE } from "../../utils/constants/palette";
import TestScreen from "../screens/TestScreen";
import { AuthContext } from "../../utils/contexts/AuthContext";
import BottomSheet from "../common/BottomSheet";
import {
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
  MAX_TRANSLATE_Y,
} from "../../utils/constants/constants";
import { Text } from "react-native";
import NewPostOptions from "../post/NewPostOptions";

const BottomTab = createBottomTabNavigator<BottomTabNavigatorParamList>();

const BottomTabNavigator = () => {
  const { user } = useContext(AuthContext);

  const Placeholder = useCallback(() => {
    return null;
  }, []);

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={({ navigation, route }) => {
        return {
          animationEnabled: false,
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
        component={Placeholder}
        options={{
          tabBarShowLabel: false,
          tabBarButton: () => <NewPostOptions />,
        }}
        // listeners={({ navigation }) => ({
        //   tabPress: event => {
        //     event.preventDefault();
        //     navigation.navigate("Modal", { screen: "NewPostOptions" });
        //   },
        // })}
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
          tabBarIcon: ({ focused }) =>
            user?.picture ? (
              <Image
                style={[
                  styles.avatar,
                  {
                    borderColor: focused ? PALETTE.ORANGE : PALETTE.LIGHTGREY,
                    height: focused ? 32 : 24,
                    width: focused ? 32 : 24,
                  },
                ]}
                source={{
                  uri: user.picture,
                }}
              />
            ) : (
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

const styles = StyleSheet.create({
  avatar: {
    borderWidth: 2,
    borderRadius: 20,
  },
});

export default BottomTabNavigator;

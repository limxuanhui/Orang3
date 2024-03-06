import { useCallback, useContext } from "react";
import { Image, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import DriversOverviewScreen from "../screens/driver/DriversOverviewScreen";
import HomeScreen from "../screens/feed/HomeScreen";
import TaleStackNavigator from "./TaleStackNavigator";
import ProfileStackNavigator from "./ProfileStackNavigator";
import type { BottomTabNavigatorParamList } from "./types/types";
import { PALETTE } from "../../utils/constants/palette";
import { AuthContext } from "../../utils/contexts/AuthContext";
import NewPostOptions from "../post/NewPostOptions";
import BookOpenIcon from "../common/icons/BookOpenIcon";
import BookIcon from "../common/icons/BookIcon";

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
              route.name === "TaleStack" ||
              route.name === "DriverStack"
                ? PALETTE.GREYISHBLUE
                : PALETTE.TRANSPARENT,
            position: "absolute",
            bottom: 0,

            // Remove border top on both android & ios
            borderTopWidth: 0,
            borderTopColor: "transparent",
            elevation: 0,
            shadowOpacity: 0,
            shadowOffset: {
              height: 0,
              width: 0,
            },
            shadowRadius: 0,
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
        name="TaleStack"
        component={TaleStackNavigator}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return (
                <BookOpenIcon style={{ fontSize: 24, color: PALETTE.ORANGE }} />
              );
            } else {
              return <BookIcon style={{ fontSize: 24, color: PALETTE.GREY }} />;
            }
          },
        }}
      />
      <BottomTab.Screen
        name="Post"
        component={Placeholder}
        options={{
          tabBarShowLabel: false,
          tabBarButton: () => <NewPostOptions />,
        }}
      />
      {/* <BottomTab.Screen
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
      /> */}
      <BottomTab.Screen
        name="ProfileStack"
        component={ProfileStackNavigator}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) =>
            user?.avatar ? (
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
                  uri: user.avatar?.uri,
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

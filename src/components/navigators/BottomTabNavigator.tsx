import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { BottomTabNavigatorParamList } from "../../utils/types/navigation";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import TestScreen from "../screens/TestScreen";

const BottomTab = createBottomTabNavigator<BottomTabNavigatorParamList>();

const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          // backgroundColor: getBackgroundColor(route.name),
          backgroundColor: "transparent",
          position: "absolute",
          bottom: 0,
          elevation: 0,
          borderTopWidth: 0,
        },
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
              color={focused ? "#ffffff" : "#aaaaaa"}
            />
          ),
        }}
      />
      <BottomTab.Screen
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
              color={focused ? "#ffffff" : "#aaaaaa"}
            />
          ),
        }}
        // getId={({ params}) => params.avatarUri}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;

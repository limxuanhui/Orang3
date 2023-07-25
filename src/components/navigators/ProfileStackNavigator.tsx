import { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../screens/profile/AccountScreen";
import PrivacyScreen from "../screens/profile/PrivacyScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import SettingsScreen from "../screens/profile/SettingsScreen";
import { AuthContext } from "../../utils/contexts/AuthContext";
import type { ProfileStackNavigatorParamList } from "../screens/profile/types/types";
import { PALETTE } from "../../utils/constants/palette";

const ProfileStack = createStackNavigator<ProfileStackNavigatorParamList>();

const ProfileStackNavigator = () => {
  const { user } = useContext(AuthContext);
  // Get from global user data
  const avatarUri = user?.picture;
  console.log("ProfileStackNavigator: ", JSON.stringify(user, null, 4));
    // "/Users/limxuanhui/bluextech/gypsie/assets/avatars/jennie2.png";

  return (
    <ProfileStack.Navigator
      initialRouteName="Profile"
      screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        initialParams={{
          avatarUri,
        }}
      />
      <ProfileStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitle: "",
          headerStyle: { backgroundColor: PALETTE.OFFWHITE },
          headerTintColor: PALETTE.BLACK,
          headerShadowVisible: false,
        }}
      />
      <ProfileStack.Screen
        name="Account"
        component={AccountScreen}
        options={{
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitle: "Account",
          headerStyle: { backgroundColor: PALETTE.OFFWHITE },
          headerTintColor: PALETTE.BLACK,
          headerShadowVisible: false,
        }}
      />
      <ProfileStack.Screen
        name="Privacy"
        component={PrivacyScreen}
        options={{
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitle: "Privacy",
          headerStyle: { backgroundColor: PALETTE.OFFWHITE },
          headerTintColor: PALETTE.BLACK,
          headerShadowVisible: false,
        }}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileStackNavigator;

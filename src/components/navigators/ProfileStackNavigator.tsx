import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../screens/profile/ProfileScreen";
import SettingsScreen from "../screens/profile/SettingsScreen";
import { ProfileStackNavigatorParamList } from "../../utils/types/profile";
import { PALETTE } from "../../utils/constants/palette";
import AccountScreen from "../screens/profile/AccountScreen";
import PrivacyScreen from "../screens/profile/PrivacyScreen";

const ProfileStack = createStackNavigator<ProfileStackNavigatorParamList>();

const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator
      initialRouteName="Profile"
      screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
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

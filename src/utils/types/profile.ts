import { StackNavigationProp } from "@react-navigation/stack";

export interface ProfileScreenProps {
  navigation: StackNavigationProp<ProfileStackNavigatorParamList, "Profile">;
}

export type ProfileStackNavigatorParamList = {
  Profile: undefined;
  Settings: undefined;
  Account: undefined;
  Privacy: undefined;
};

export interface SettingsScreenProps {
  navigation: StackNavigationProp<ProfileStackNavigatorParamList, "Settings">;
}

export interface AccountScreenProps {
  navigation: StackNavigationProp<ProfileStackNavigatorParamList, "Settings">;
}

export interface PrivacyScreenProps {
  navigation: StackNavigationProp<ProfileStackNavigatorParamList, "Settings">;
}

// export type ProfileScreenProps = CompositeScreenProps<
//   BottomTabScreenProps<BottomTabNavigatorParamList, "profile">,

// >

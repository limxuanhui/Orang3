import type {
  CompositeNavigationProp,
  RouteProp,
} from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { AppStackNavigatorParamList, ModalNavigatorParamList } from "../../../navigators/types/types";

export type ProfileScreenParams = {
  userId?: number;
  avatarUri?: string;
};

export type ProfileStackNavigatorParamList = {
  Profile: ProfileScreenParams;
  Settings: undefined;
  Account: undefined;
  Privacy: undefined;
};

// --------------------------- ProfileScreen ---------------------------
export type ProfileScreenProps = {
  navigation: ProfileScreenNavigationProp;
  route: ProfileScreenRouteProp;
};

type ProfileScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<ProfileStackNavigatorParamList, "Profile">,
  StackNavigationProp<AppStackNavigatorParamList, "Modal">
>;

type ProfileScreenRouteProp = RouteProp<
  ProfileStackNavigatorParamList,
  "Profile"
>;

// --------------------------- SettingsScreen ---------------------------
export type SettingsScreenProps = {
  navigation: SettingsScreenNavigationProp;
};

type SettingsScreenNavigationProp = StackNavigationProp<
  ProfileStackNavigatorParamList,
  "Settings"
>;

// --------------------------- AccountScreen ---------------------------
export type AccountScreenProps = {
  navigation: AccountScreenNavigationProp;
};

type AccountScreenNavigationProp = StackNavigationProp<
  ProfileStackNavigatorParamList,
  "Account"
>;

// --------------------------- PrivacyScreen ---------------------------
export type PrivacyScreenProps = {
  navigation: PrivacyScreenNavigationProp;
};

type PrivacyScreenNavigationProp = StackNavigationProp<
  ProfileStackNavigatorParamList,
  "Privacy"
>;

// --------------------------- AvatarScreen ---------------------------
export type AvatarScreenProps = {
  navigation: AvatarScreenNavigationProp;
  route: AvatarScreenRouteProp;
};

type AvatarScreenNavigationProp = StackNavigationProp<
  ModalNavigatorParamList,
  "Avatar"
>;

type AvatarScreenRouteProp = RouteProp<ModalNavigatorParamList, "Avatar">;

export type AvatarScreenParams = {
  avatarUri: string;
};

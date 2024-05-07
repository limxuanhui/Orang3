import { StackNavigationProp } from '@react-navigation/stack';
import { ModalNavigatorParamList } from '@navigators/types/types';

// --------------------------- SettingsScreen ---------------------------
export type SettingsScreenProps = {
  navigation: SettingsScreenNavigationProp;
};

type SettingsScreenNavigationProp = StackNavigationProp<
  ModalNavigatorParamList,
  'Settings'
>;

// --------------------------- AccountScreen ---------------------------
export type AccountScreenProps = {
  navigation: AccountScreenNavigationProp;
};

type AccountScreenNavigationProp = StackNavigationProp<
  ModalNavigatorParamList,
  'Account'
>;

// --------------------------- PrivacyScreen ---------------------------
export type PrivacyScreenProps = {
  navigation: PrivacyScreenNavigationProp;
};

type PrivacyScreenNavigationProp = StackNavigationProp<
  ModalNavigatorParamList,
  'Privacy'
>;

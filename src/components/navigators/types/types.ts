import { NavigatorScreenParams } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import type { FeedScreenParams } from '@screens/feed/types/types';
import type { AuthStackNavigatorParamList } from '@screens/auth/types/types';
import type {
  ItineraryScreenParams,
  PlaceSearchScreenParams,
} from '@screens/tale/types/types';
import type {
  AvatarScreenParams,
  EditProfileScreenParams,
  ProfileScreenParams,
} from '@screens/profile/types/types';
import {
  TaleViewScreenParams,
  WriteFeedScreenParams,
  WriteTaleScreenParams,
} from '@screens/post/types/types';
import type { Media } from '@components/feed/types/types';

export type GypsieUser = {
  id: string;
  name: string;
  handle: string;
  email: string;
  avatar?: Media;
  bio: string;
  createdAt?: string;
  lastUpdatedNameAt?: string;
  lastUpdatedHandleAt?: string;
  lastUpdatedBioAt?: string;
  lastUpdatedAvatarAt?: string;
  isDeactivated: boolean;
};

export type RootStackNavigatorParamList = {
  Auth: AuthStackNavigatorParamList | undefined;
  App: AppStackNavigatorParamList | undefined;
};

export type AppStackNavigatorParamList = {
  BottomTabs: NavigatorScreenParams<BottomTabNavigatorParamList>;
  Modal: NavigatorScreenParams<ModalNavigatorParamList>;
};

export type BottomTabNavigatorParamList = {
  Home: undefined;
  TaleStack: undefined;
  Post: undefined;
  DriverStack: undefined;
  ProfileStack: ProfileScreenParams;
};

// --------------------------- ModalNavigator ---------------------------
export type ModalNavigatorNavigationProp = StackNavigationProp<
  AppStackNavigatorParamList,
  'Modal'
>;

export type ModalNavigatorParamList = {
  WriteFeed: WriteFeedScreenParams;
  WriteTale: WriteTaleScreenParams;
  TaleView: TaleViewScreenParams;
  Itinerary: ItineraryScreenParams;
  Feed: FeedScreenParams;
  Avatar: AvatarScreenParams;
  PlaceSearch: PlaceSearchScreenParams;
  Profile: ProfileScreenParams;
  Account: undefined;
  EditProfile: EditProfileScreenParams;
  Settings: undefined;
  UserInfo: undefined;
  DeleteOrDeactivate: undefined;
  Delete: undefined;
  Deactivate: undefined;
  Privacy: undefined;
};

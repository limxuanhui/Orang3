import { NavigatorScreenParams } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import type { FeedScreenParams } from '../../screens/feed/types/types';
import type { AuthStackNavigatorParamList } from '../../screens/auth/types/types';
import type {
  ItineraryScreenParams,
  PlaceSearchScreenParams,
} from '@screens/tale/types/types';
import type {
  AvatarScreenParams,
  ProfileScreenParams,
} from '@screens/profile/types/types';
import {
  TaleViewScreenParams,
  WriteTaleScreenParams,
} from '@screens/post/types/types';
import type { Media } from '@components/feed/types/types';

// declare global {
//   namespace ReactNavigation {
//     interface RootParamList extends RootStackNavigatorParamList {}
//   }
// }

export type GypsieUser = {
  id: string;
  name: string;
  handle: string;
  email: string;
  avatar?: Media;
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
  WriteFeed: undefined;
  WriteTale: WriteTaleScreenParams;
  TaleView: TaleViewScreenParams;
  Itinerary: ItineraryScreenParams;
  Feed: FeedScreenParams;
  Avatar: AvatarScreenParams;
  PlaceSearch: PlaceSearchScreenParams;
  Profile: ProfileScreenParams;
};

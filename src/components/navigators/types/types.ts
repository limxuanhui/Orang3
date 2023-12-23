import { NavigatorScreenParams } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { User } from "@react-native-google-signin/google-signin";
import type { FeedScreenParams } from "../../screens/feed/types/types";
import type { AuthStackNavigatorParamList } from "../../screens/auth/types/types";
import type { PlaceSearchScreenParams } from "../../screens/tale/types/types";
import type {
  AvatarScreenParams,
  ProfileScreenParams,
} from "../../screens/profile/types/types";
import { TaleViewScreenParams } from "../../screens/post/types/types";

// declare global {
//   namespace ReactNavigation {
//     interface RootParamList extends RootStackNavigatorParamList {}
//   }
// }

export type GypsieUser =
  // | User
  {
    id: string;
    name: string;
    handle: string;
    email: string;
    picture?: string;
  } | null;

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
  // test: undefined;
  TaleStack: undefined;
  Post: undefined;
  DriverStack: undefined;
  ProfileStack: ProfileScreenParams;
};

// --------------------------- ModalNavigator ---------------------------
export type ModalNavigatorNavigationProp = StackNavigationProp<
  AppStackNavigatorParamList,
  "Modal"
>;

export type ModalNavigatorParamList = {
  NewFeed: undefined;
  NewTale: undefined;
  TaleView: TaleViewScreenParams;
  ItineraryView: undefined;
  Feed: FeedScreenParams;
  Avatar: AvatarScreenParams;
  PlaceSearch: PlaceSearchScreenParams;
  Profile: ProfileScreenParams;
};

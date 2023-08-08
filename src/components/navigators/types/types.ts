import { NavigatorScreenParams } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { User } from "@react-native-google-signin/google-signin";
import type { FeedScreenParams } from "../../screens/feed/types/types";
import type { AuthStackNavigatorParamList } from "../../screens/auth/types/types";
import type { PlaceSearchScreenParams } from "../../screens/itinerary/types/types";
import type {
  AvatarScreenParams,
  ProfileScreenParams,
} from "../../screens/profile/types/types";

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
    }
  | null;

export type RootStackNavigatorParamList = {
  Auth: AuthStackNavigatorParamList | undefined;
  App: AppStackNavigatorParamList | undefined;
};

export type AppStackNavigatorParamList = {
  // BottomTabs: undefined;
  BottomTabs: NavigatorScreenParams<BottomTabNavigatorParamList>;
  Modal: NavigatorScreenParams<ModalNavigatorParamList>;
  // Modal: undefined;
};

export type BottomTabNavigatorParamList = {
  Home: undefined;
  // test: undefined;
  ItineraryStack: undefined;
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
  NewFeedPost: undefined;
  Avatar: AvatarScreenParams;
  Feed: FeedScreenParams;
  ItineraryView: undefined;
  PlaceSearch: PlaceSearchScreenParams;
  Profile: ProfileScreenParams;
};

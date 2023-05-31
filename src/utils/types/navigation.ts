import { User } from "@react-native-google-signin/google-signin";
import { AuthStackNavigatorParamList } from "./auth";
import { HomeScreenProps } from "./home";
import { MapStackNavigatorParamList } from "./map";
import { ProfileScreenProps } from "./profile";

export type GypsieUser = User | null;

export type RootStackNavigatorParamList = {
  auth: AuthStackNavigatorParamList;
  app: AppStackNavigatorParamList;
};

export type AppStackNavigatorParamList = {
  "bottom-tab": BottomTabNavigatorParamList;
  "itinerary-planning": undefined;
  "itinerary-view": undefined;
  "place-search": undefined;
};

export type BottomTabNavigatorParamList = {
  home: HomeScreenProps;
  test: undefined;
  "map-stack": MapStackNavigatorParamList;
  profile: ProfileScreenProps;
};

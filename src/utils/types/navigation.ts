import { User } from "@react-native-google-signin/google-signin";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import {
  NativeStackScreenProps,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";

export type GypsieUser = User | null;

export type RootStackNavigatorParamList = {
  auth: AuthStackNavigatorParamList;
  app: AppStackNavigatorParamList;
};

export type AuthStackNavigatorParamList = {
  login: undefined;
  signup: undefined;
};

export type AppStackNavigatorParamList = {
  "bottom-tab": BottomTabNavigatorParamList;
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  BottomTabNavigatorParamList,
  "home"
>;

export type HomeScreenProps = NativeStackScreenProps<
  BottomTabNavigatorParamList,
  "home"
>;

export type ProfileScreenProps = NativeStackScreenProps<
  BottomTabNavigatorParamList,
  "profile"
>;
// export type ProfileScreenProps = CompositeScreenProps<
//   BottomTabScreenProps<BottomTabNavigatorParamList, "profile">,
  
// >

export type LoginScreenProps = NativeStackScreenProps<
  AuthStackNavigatorParamList,
  "login"
>;

export type SignupScreenProps = NativeStackScreenProps<
  AuthStackNavigatorParamList,
  "signup"
>;

export type BottomTabNavigatorParamList = {
  home: HomeScreenProps;
  test: undefined;
  profile: ProfileScreenProps;
};

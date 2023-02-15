import { User } from "@react-native-google-signin/google-signin";

export type GypsieUser = User | null;

export type RootStackNavigatorParamList = {
  auth: undefined;
  app: undefined;
};

export type AuthStackNavigatorParamList = {
  login: undefined;
  signup: undefined;
};

export type AppStackNavigatorParamList = {
  home: undefined;
};

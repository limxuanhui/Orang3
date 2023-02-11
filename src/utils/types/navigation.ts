import { User } from "@react-native-google-signin/google-signin";

export type AppStackNavigatorParamList = {
  login: undefined;
  signup: undefined;
  home: { user: User | undefined };
};

export type AuthStackNavigatorParamList = {
  login: undefined;
  signup: undefined;
  home: { user: User | undefined };
};

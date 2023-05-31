import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type AuthStackNavigatorParamList = {
  login: undefined;
  signup: undefined;
};

export type LoginScreenProps = NativeStackScreenProps<
  AuthStackNavigatorParamList,
  "login"
>;

export type SignupScreenProps = NativeStackScreenProps<
  AuthStackNavigatorParamList,
  "signup"
>;

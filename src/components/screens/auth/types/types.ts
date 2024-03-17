import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackNavigatorParamList } from '@navigators/types/types';
import { StackNavigationProp } from '@react-navigation/stack';

export type AuthStackNavigatorParamList = {
  Login: undefined;
  Signup: undefined;
  Splash: undefined;
};

// --------------------------- SplashScreen ---------------------------
export type SplashScreenProps = {
  navigation: SplashScreenNavigationProp;
};

export type SplashScreenNavigationProp =
  StackNavigationProp<RootStackNavigatorParamList>;

// --------------------------- LoginScreen ---------------------------
export type LoginScreenProps = NativeStackScreenProps<
  AuthStackNavigatorParamList,
  'Login'
>;

// --------------------------- SignupScreen ---------------------------
export type SignupScreenProps = NativeStackScreenProps<
  AuthStackNavigatorParamList,
  'Signup'
>;

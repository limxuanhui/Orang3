import { RootStackNavigatorParamList } from '@navigators/types/types';
import { StackNavigationProp } from '@react-navigation/stack';

export type AuthStackNavigatorParamList = {
  Splash: undefined;
};

// --------------------------- SplashScreen ---------------------------
export type SplashScreenProps = {
  navigation: SplashScreenNavigationProp;
};

export type SplashScreenNavigationProp =
  StackNavigationProp<RootStackNavigatorParamList>;

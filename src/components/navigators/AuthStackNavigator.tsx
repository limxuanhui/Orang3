import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '@screens/auth/SplashScreen';
import type { AuthStackNavigatorParamList } from '@screens/auth/types/types';
import { SCREEN_OPTIONS } from '@constants/constants';

const AuthStack = createStackNavigator<AuthStackNavigatorParamList>();

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator
      initialRouteName="Splash"
      screenOptions={SCREEN_OPTIONS}>
      <AuthStack.Screen name="Splash" component={SplashScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigator;

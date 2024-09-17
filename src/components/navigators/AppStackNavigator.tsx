import { useMemo } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from '@navigators/BottomTabNavigator';
import ModalNavigator from '@navigators/ModalNavigator';
import type { AppStackNavigatorParamList } from './types/types';
import { SCREEN_OPTIONS } from '@constants/constants';

const AppStack = createStackNavigator<AppStackNavigatorParamList>();

const AppStackNavigator = () => {
  const screenOptions = useMemo(() => SCREEN_OPTIONS, []);

  return (
    <AppStack.Navigator
      initialRouteName="BottomTabs"
      screenOptions={screenOptions}>
      <AppStack.Screen name="Modal" component={ModalNavigator} />
      <AppStack.Screen name="BottomTabs" component={BottomTabNavigator} />
    </AppStack.Navigator>
  );
};

export default AppStackNavigator;

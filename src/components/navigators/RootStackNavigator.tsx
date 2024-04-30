import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { PortalProvider } from '@gorhom/portal';
import { AuthContext } from '@contexts/AuthContext';
import AppStackNavigator from '@navigators/AppStackNavigator';
import AuthStackNavigator from '@navigators/AuthStackNavigator';
import type { RootStackNavigatorParamList } from './types/types';
import { SCREEN_OPTIONS } from '@constants/constants';

const RootStack = createStackNavigator<RootStackNavigatorParamList>();

const RootStackNavigator = () => {
  console.log(
    '@@@@@@@@@@@@@@@@@ RootStackNavigator rerendered @@@@@@@@@@@@@@@@@',
  );
  const { isLoggedIn } = useContext(AuthContext);

  // return (
  //   <View
  //     style={{
  //       flex: 1,
  //       justifyContent: 'center',
  //       alignItems: 'center',
  //       backgroundColor: PALETTE.GREYISHBLUE,
  //     }}>
  //     <Image style={{ width: 80, height: 80 }} source={Assets.AppLogo} />
  //   </View>
  // );
  return (
    <NavigationContainer
      onReady={() => {
        console.warn('App is ready:)');
      }}>
      <PortalProvider>
        <RootStack.Navigator screenOptions={SCREEN_OPTIONS}>
          {isLoggedIn ? (
            <RootStack.Screen name="App" component={AppStackNavigator} />
          ) : (
            <RootStack.Screen name="Auth" component={AuthStackNavigator} />
          )}
        </RootStack.Navigator>
      </PortalProvider>
    </NavigationContainer>
  );
};

export default RootStackNavigator;

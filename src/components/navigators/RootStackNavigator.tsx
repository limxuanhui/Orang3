import React, { useContext } from "react";
import { useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { PortalProvider } from "@gorhom/portal";
import { AuthContext } from "../../utils/contexts/AuthContext";
import AppStackNavigator from "./AppStackNavigator";
import AuthStackNavigator from "./AuthStackNavigator";
import type { RootStackNavigatorParamList } from "./types/types";
import { SCREEN_OPTIONS } from "../../utils/constants/constants";

const RootStack = createStackNavigator<RootStackNavigatorParamList>();

const RootStackNavigator = () => {
  console.log(
    "@@@@@@@@@@@@@@@@@ RootStackNavigator rerendered @@@@@@@@@@@@@@@@@",
  );
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <NavigationContainer>
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

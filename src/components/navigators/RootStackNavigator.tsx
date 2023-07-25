import React, { useContext } from "react";
import { StatusBar, useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "../../utils/contexts/AuthContext";
import AppStackNavigator from "./AppStackNavigator";
import AuthStackNavigator from "./AuthStackNavigator";
import type { RootStackNavigatorParamList } from "./types/types";
import { SCREEN_OPTIONS } from "../../utils/constants/constants";

const RootStack = createStackNavigator<RootStackNavigatorParamList>();

const RootStackNavigator = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const isDarkMode = useColorScheme() === "dark";

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={SCREEN_OPTIONS}>
        {isLoggedIn ? (
          <RootStack.Screen name="App" component={AppStackNavigator} />
        ) : (
          <RootStack.Screen name="Auth" component={AuthStackNavigator} />
        )}
        {/* <RootStack.Screen name="App" component={AppStackNavigator} /> */}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootStackNavigator;

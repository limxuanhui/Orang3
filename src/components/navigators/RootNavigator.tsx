import { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import type { RootStackNavigatorParamList } from "../../utils/types/navigation";
import { AuthContext } from "../../utils/contexts/AuthContext";
import AuthStackNavigator from "./AuthStackNavigator";
import AppStackNavigator from "./AppStackNavigator";

const RootStack = createNativeStackNavigator<RootStackNavigatorParamList>();

const RootNavigator = () => {
  const authInfo = useContext(AuthContext);

  return (
    <NavigationContainer>
      {/* <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {authInfo.user?.idToken ? (
          <RootStack.Screen name="app" component={AppStackNavigator} />
        ) : (
          <RootStack.Screen name="auth" component={AuthStackNavigator} />
        )} */}
      {/* </RootStack.Navigator> */}
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="app" component={AppStackNavigator} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;

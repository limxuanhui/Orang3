import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "./BottomTabNavigator";
import ModalNavigator from "./ModalNavigator";
import type { AppStackNavigatorParamList } from "./types/types";
import { SCREEN_OPTIONS } from "../../utils/constants/constants";
import { useMemo } from "react";

const AppStack = createStackNavigator<AppStackNavigatorParamList>();

const AppStackNavigator = () => {
  console.log(
    "@@@@@@@@@@@@@@@@@ AppStackNavigator rerendered @@@@@@@@@@@@@@@@@",
  );
  // const x = useMemo(() => ModalNavigator, [ModalNavigator]);

  const screenOptions = useMemo(() => SCREEN_OPTIONS, [SCREEN_OPTIONS]);
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

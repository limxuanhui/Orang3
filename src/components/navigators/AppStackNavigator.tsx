import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "./BottomTabNavigator";
import ModalNavigator from "./ModalNavigator";
import type { AppStackNavigatorParamList } from "./types/types";
import { SCREEN_OPTIONS } from "../../utils/constants/constants";

const AppStack = createStackNavigator<AppStackNavigatorParamList>();

const AppStackNavigator = () => {
  return (
    <AppStack.Navigator
      initialRouteName="BottomTabs"
      screenOptions={SCREEN_OPTIONS}>
      <AppStack.Screen name="Modal" component={ModalNavigator} />
      <AppStack.Screen name="BottomTabs" component={BottomTabNavigator} />
    </AppStack.Navigator>
  );
};

export default AppStackNavigator;

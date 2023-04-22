import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppStackNavigatorParamList } from "../../utils/types/navigation";
import BottomTabNavigator from "./BottomTabNavigator";

const AppStack = createNativeStackNavigator<AppStackNavigatorParamList>();

const AppStackNavigator = () => {
  return (
    <AppStack.Navigator
      initialRouteName="bottom-tab"
      screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="bottom-tab" component={BottomTabNavigator} />
    </AppStack.Navigator>
  );
};

export default AppStackNavigator;

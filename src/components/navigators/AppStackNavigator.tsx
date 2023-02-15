import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import { AppStackNavigatorParamList } from "../../utils/types/navigation";
import HomeScreen from "../screens/HomeScreen";

const AppStack = createNativeStackNavigator<AppStackNavigatorParamList>();

const AppStackNavigator = () => {
  return (
    <AppStack.Navigator
      initialRouteName="home"
      screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="home" component={HomeScreen} />
    </AppStack.Navigator>
  );
};

export default AppStackNavigator;

const styles = StyleSheet.create({});

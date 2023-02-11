import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

import type { AppStackNavigatorParamList } from "./src/utils/types/navigation";
import LoginScreen from "./src/components/screens/LoginScreen";
import SignupScreen from "./src/components/screens/SignupScreen";
import HomeScreen from "./src/components/screens/HomeScreen";

GoogleSignin.configure({
  iosClientId:
    "240016316671-bbb96sgu5i31ahsdro89fi7va1dr50r5.apps.googleusercontent.com",
});


const AppStack = createNativeStackNavigator<AppStackNavigatorParamList>();

const App = (): JSX.Element => {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* // <SafeAreaView> */}
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <NavigationContainer>
        <AppStack.Navigator screenOptions={{ headerShown: false }}>
          <AppStack.Screen name="login" component={LoginScreen} />
          <AppStack.Screen name="signup" component={SignupScreen} />
          <AppStack.Screen name="home" component={HomeScreen}/>
        </AppStack.Navigator>
      </NavigationContainer>
      {/* // </SafeAreaView> */}
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({});

export default App;

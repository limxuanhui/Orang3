import { StatusBar, useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { Provider } from "react-redux";
import { AuthContext } from "./src/utils/contexts/AuthContext";
import useAuthManager from "./src/utils/hooks/useAuthManager";
import RootStackNavigator from "./src/components/navigators/RootStackNavigator";
import store from "./src/utils/redux/store";

GoogleSignin.configure({
  iosClientId:
    "240016316671-bbb96sgu5i31ahsdro89fi7va1dr50r5.apps.googleusercontent.com",
});

const App = (): JSX.Element => {
  const authInfo = useAuthManager();
  const isDarkMode = useColorScheme() === "dark";

  return (
    <KeyboardProvider>
      <Provider store={store}>
        <AuthContext.Provider value={authInfo}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <StatusBar
              barStyle={isDarkMode ? "light-content" : "dark-content"}
              hidden
            />
            <RootStackNavigator />
          </GestureHandlerRootView>
        </AuthContext.Provider>
      </Provider>
    </KeyboardProvider>
  );
};

export default App;

import { StatusBar, useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { AuthContext } from "./src/utils/contexts/AuthContext";
import useAuthManager from "./src/utils/hooks/useAuthManager";
import RootStackNavigator from "./src/components/navigators/RootStackNavigator";
import { Provider } from "react-redux";
import store from "./src/utils/redux/store";
import { PortalProvider } from "@gorhom/portal";

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
            <PortalProvider>
            <StatusBar
              barStyle={isDarkMode ? "light-content" : "dark-content"}
              hidden
            />
            <RootStackNavigator />
            </PortalProvider>
          </GestureHandlerRootView>
        </AuthContext.Provider>
      </Provider>
    </KeyboardProvider>
  );
};

export default App;

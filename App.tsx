import {
  // SafeAreaView,
  StatusBar,
  useColorScheme,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

import { AuthContext } from "./src/utils/contexts/AuthContext";
import useAuthManager from "./src/utils/hooks/useAuthManager";
import RootNavigator from "./src/components/navigators/RootNavigator";

GoogleSignin.configure({
  iosClientId:
    "240016316671-bbb96sgu5i31ahsdro89fi7va1dr50r5.apps.googleusercontent.com",
});

const App = (): JSX.Element => {
  const authInfo = useAuthManager();
  const isDarkMode = useColorScheme() === "dark";

  return (
    <AuthContext.Provider value={authInfo}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        {/* // <SafeAreaView> */}
        <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
        <RootNavigator />
        {/* // </SafeAreaView> */}
      </GestureHandlerRootView>
    </AuthContext.Provider>
  );
};

export default App;

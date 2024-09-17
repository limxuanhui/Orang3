import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { Provider } from 'react-redux';
import Config from 'react-native-config';
import { enableFreeze } from 'react-native-screens';
import Toast from 'react-native-toast-message';
import { QueryClientProvider } from '@tanstack/react-query';
import { AuthContext } from '@contexts/AuthContext';
import useAuthManager from '@hooks/useAuthManager';
import RootStackNavigator from '@navigators/RootStackNavigator';
import store from '@redux/store';
import { queryClient } from '@helpers/singletons';

GoogleSignin.configure({
  iosClientId: Config.GOOGLE_IOS_CLIENT_ID,
});

enableFreeze(true);

const App = (): JSX.Element => {
  const authInfo = useAuthManager();
  console.warn(Config.BACKEND_BASE_URL);

  return (
    <KeyboardProvider>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <AuthContext.Provider value={authInfo}>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <RootStackNavigator />
              <Toast
                // config={{ error: {} }}
                position="bottom"
                bottomOffset={50}
                autoHide
                visibilityTime={3000}
              />
            </GestureHandlerRootView>
          </AuthContext.Provider>
        </Provider>
      </QueryClientProvider>
    </KeyboardProvider>
  );
};

export default App;

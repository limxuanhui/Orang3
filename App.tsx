// import { StatusBar, useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthContext } from '@contexts/AuthContext';
import useAuthManager from '@hooks/useAuthManager';
import RootStackNavigator from '@navigators/RootStackNavigator';
import store from '@redux/store';
import { GOOGLE_IOS_CLIENT_ID } from '@env';

GoogleSignin.configure({
  iosClientId: GOOGLE_IOS_CLIENT_ID,
});

const queryClient = new QueryClient();

const App = (): JSX.Element => {
  const authInfo = useAuthManager();
  // const isDarkMode = useColorScheme() === "dark";
  // const dataKey = 'key0';
  // const dataMode = 'prod';
  // const x = 'key1';
  // const {} = useQuery({
  //   queryKey: [dataKey],
  //   queryFn: () => {
  //     return x;
  //   },
  //   networkMode: dataMode === 'prod' ? 'online' : 'always',
  //   // initialPageParam: null,
  //   // getNextPageParam: (lastPage: { lastEvaluatedKey: any; }) => lastPage.lastEvaluatedKey,
  //   staleTime: 15000,
  // });

  return (
    <KeyboardProvider>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <AuthContext.Provider value={authInfo}>
            <GestureHandlerRootView style={{ flex: 1 }}>
              {/* <StatusBar
                barStyle={isDarkMode ? "light-content" : "dark-content"}
                hidden
              /> */}
              <RootStackNavigator />
            </GestureHandlerRootView>
          </AuthContext.Provider>
        </Provider>
      </QueryClientProvider>
    </KeyboardProvider>
  );
};

export default App;

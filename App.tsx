// import { StatusBar, useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { Provider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { AuthContext } from '@contexts/AuthContext';
import useAuthManager from '@hooks/useAuthManager';
import RootStackNavigator from '@navigators/RootStackNavigator';
import store from '@redux/store';
import { GOOGLE_IOS_CLIENT_ID } from '@env';
// import NetInfo, { useNetInfo } from '@react-native-community/netinfo';
// import { useEffect } from 'react';
// import { ActivityIndicator } from 'react-native-paper';
// import { PALETTE } from '@constants/palette';
// import { Text, View } from 'react-native';
// import { DEVICE_HEIGHT, DEVICE_WIDTH } from '@constants/constants';
import { queryClient } from '@helpers/singletons';
import { enableFreeze } from 'react-native-screens';

GoogleSignin.configure({
  iosClientId: GOOGLE_IOS_CLIENT_ID,
});

enableFreeze(true);

const App = (): JSX.Element => {
  const authInfo = useAuthManager();
  // const { isConnected } = useNetInfo();

  // useEffect(() => {
  //   NetInfo.addEventListener(state => {
  //     console.log('Connection type', state.type);
  //     console.log('Is connected?', state.isConnected);
  //   });
  // }, []);

  // // useEffect(() => {
  // //   // queryClient.prefetchQuery({ queryKey: ['feeds'], queryFn: () => {} });
  // // }, []);

  // if (!isConnected) {
  //   return (
  //     <View
  //       style={{
  //         justifyContent: 'center',
  //         alignItems: 'center',
  //         width: DEVICE_WIDTH,
  //         height: DEVICE_HEIGHT,
  //         backgroundColor: PALETTE.GREYISHBLUE,
  //       }}>
  //       <ActivityIndicator size={60} color={PALETTE.ORANGE} />
  //       {/* <Text
  //         style={{
  //           margin: 16,
  //           fontFamily: 'Futura',
  //           fontSize: 24,
  //           color: PALETTE.OFFWHITE,
  //         }}>
  //         Trying to find a connection...
  //       </Text> */}
  //     </View>
  //   );
  // }

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

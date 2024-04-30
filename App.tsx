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
import { queryClient } from '@helpers/singletons';
import { enableFreeze } from 'react-native-screens';

GoogleSignin.configure({
  iosClientId: GOOGLE_IOS_CLIENT_ID,
});

enableFreeze(true);

// const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

const App = (): JSX.Element => {
  const authInfo = useAuthManager();

  // const [animationIsVisible, setAnimationIsVisible] = useState(true);
  // const ref = useRef<LottieView>(null);
  // const progress = useSharedValue(0);
  // const opacity = useSharedValue(1);

  // useEffect(() => {
  // RNBootSplash.hide({ fade: false });
  // progress.value = withTiming(1, {
  //   duration: 2500,
  // });
  // ref.current?.play();
  // }, []);

  // const animatedOpacity = useAnimatedStyle(() => {
  //   opacity.value = withTiming(0, {
  //     duration: 250,
  //   });
  //   return {
  //     opacity: opacity.value,
  //   };
  // });

  return (
    <KeyboardProvider>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <AuthContext.Provider value={authInfo}>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <RootStackNavigator />
            </GestureHandlerRootView>
          </AuthContext.Provider>
        </Provider>
      </QueryClientProvider>
    </KeyboardProvider>
  );
};

export default App;

// {
//   animationIsVisible && (
//     <Animated.View
//       style={[
//         StyleSheet.absoluteFill,
//         // eslint-disable-next-line react-native/no-inline-styles
//         {
//           backgroundColor: '#000',
//           alignItems: 'center',
//           justifyContent: 'center',
//           opacity: opacity.value,
//         },
//       ]}>
//       <AnimatedLottieView
//         ref={ref}
//         source={require('/Users/limxuanhui/bluextech/gypsie/assets/lottie_animation.json')}
//         loop={false}
//         progress={progress.value}
//         resizeMode="contain"
//         style={{ height: 300, width: 300 }}
//         onAnimationLoaded={() => {
//           console.warn('Animating');
//         }}
//         onAnimationFinish={(isCancelled: boolean) => {
//           if (!isCancelled) {
//             opacity.value = withTiming(0, {
//               duration: 250,
//             });
//             setAnimationIsVisible(false);
//           }
//         }}
//       />
//     </Animated.View>
//   );
// }

{
  /* <StatusBar
                barStyle={isDarkMode ? "light-content" : "dark-content"}
                hidden
              /> */
}

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

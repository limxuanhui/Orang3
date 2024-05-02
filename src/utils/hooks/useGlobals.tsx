import { useEffect, useRef, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';

const useGlobals = () => {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState<AppStateStatus>(
    appState.current,
  );

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  // return { mode: __DEV__ ? 'development' : 'production', appStateVisible };
  return { mode: __DEV__ ? 'production' : 'development', appStateVisible };
};

export default useGlobals;

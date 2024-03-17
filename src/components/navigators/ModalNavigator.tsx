import { useEffect, useMemo } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AvatarScreen from '@screens/profile/AvatarScreen';
import FeedScreen from '@screens/feed/FeedScreen';
import ItineraryScreen from '@screens/tale/ItineraryScreen';
import PlaceSearchScreen from '@screens/tale/PlaceSearchScreen';
import ProfileScreen from '@screens/profile/ProfileScreen';
import TaleViewScreen from '@screens/tale/TaleViewScreen';
import { PALETTE } from '@constants/palette';
import WriteFeedScreen from '@screens/post/WriteFeedScreen';
import WriteTaleScreen from '@screens/post/WriteTaleScreen';
import type { ModalNavigatorParamList } from './types/types';

const Modal = createStackNavigator<ModalNavigatorParamList>();

const ModalNavigator = () => {
  console.log(
    '@@@@@@@@@@@@@@@@@@@ ModalNavigator rerendered @@@@@@@@@@@@@@@@@@@\n',
  );
  // const config = useMemo(
  //   () => ({
  //     stiffness: 800,
  //     damping: 50,
  //     mass: 1,
  //     overshootClamping: true,
  //     velocity: { x: 100, y: 150 },
  //   }),
  //   [],
  // );

  const options = useMemo(
    () => ({
      headerShown: true,
      headerBackTitleVisible: false,
      headerTitle: '',
      headerTransparent: true,
      headerTintColor: PALETTE.GREY,
      headerShadowVisible: false,
      useNativeDriver: true,
    }),
    [],
  );

  // const onPressOptions = useCallback(() => {
  //   console.log('Open share options');
  // }, []);

  useEffect(() => {
    console.log('ModalNavigator mounted');
    return () => {
      console.log('ModalNavigator unmounted');
    };
  }, []);

  return (
    <Modal.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        cardOverlayEnabled: true,
        cardStyle: { backgroundColor: PALETTE.TRANSPARENT },
        // animationEnabled: false,
      }}>
      <Modal.Screen
        name="WriteFeed"
        component={WriteFeedScreen}
        options={options}
      />
      <Modal.Screen
        name="WriteTale"
        component={WriteTaleScreen}
        options={{
          ...options,
          // headerTransparent: false,
          // headerTintColor: PALETTE.GREY,
          // headerRight: () => (
          //   <GypsieButton
          //     customButtonStyles={{
          //       backgroundColor: "transparent",
          //       width: "auto",
          //       right: 16,
          //     }}
          //     customIconStyles={{ fontSize: 24, color: PALETTE.GREY }}
          //     Icon={OptionsIcon}
          //     onPress={onPressOptions}
          //   />
          // ),
        }}
      />
      <Modal.Screen
        name="TaleView"
        component={TaleViewScreen}
        options={options}
      />
      <Modal.Screen name="Avatar" component={AvatarScreen} options={options} />
      <Modal.Screen
        name="Profile"
        component={ProfileScreen}
        options={options}
      />
      <Modal.Screen
        name="Itinerary"
        component={ItineraryScreen}
        options={options}
      />
      <Modal.Screen name="Feed" component={FeedScreen} options={options} />
      <Modal.Screen
        name="PlaceSearch"
        component={PlaceSearchScreen}
        options={options}
      />
    </Modal.Navigator>
  );
};

export default ModalNavigator;

import { useEffect, useMemo } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AvatarScreen from '@screens/profile/AvatarScreen';
import FeedScreen from '@screens/feed/FeedScreen';
import ItineraryScreen from '@screens/tale/ItineraryScreen';
import PlaceSearchScreen from '@screens/tale/PlaceSearchScreen';
import ProfileScreen from '@screens/profile/ProfileScreen';
import TaleViewScreen from '@screens/tale/TaleViewScreen';
import WriteFeedScreen from '@screens/post/WriteFeedScreen';
import WriteTaleScreen from '@screens/post/WriteTaleScreen';
import UserInfoScreen from '@screens/settings/UserInfoScreen';
import DeleteOrDeactivateScreen from '@screens/settings/DeleteOrDeactivateScreen';
import DeleteScreen from '@screens/settings/DeleteScreen';
import DeactivateScreen from '@screens/settings/DeactivateScreen';
import PrivacyScreen from '@screens/settings/PrivacyScreen';
import AccountScreen from '@screens/settings/AccountScreen';
import SettingsScreen from '@screens/settings/SettingsScreen';
import type { ModalNavigatorParamList } from './types/types';
import { PALETTE } from '@constants/palette';

const Modal = createStackNavigator<ModalNavigatorParamList>();

const ModalNavigator = () => {
  const options = useMemo(
    () => ({
      headerShown: true,
      headerBackTitleVisible: false,
      headerTitle: '',
      headerTransparent: true,
      headerTintColor: PALETTE.GREY,
      headerShadowVisible: false,
      // useNativeDriver: true,
    }),
    [],
  );

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
        options={options}
      />
      <Modal.Screen
        name="TaleView"
        component={TaleViewScreen}
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
      <Modal.Screen name="Avatar" component={AvatarScreen} options={options} />
      <Modal.Screen
        name="Profile"
        component={ProfileScreen}
        options={options}
      />
      <Modal.Group>
        <Modal.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            ...options,
            headerTransparent: false,
            headerStyle: { backgroundColor: PALETTE.OFFWHITE },
          }}
        />
        <Modal.Screen
          name="Account"
          component={AccountScreen}
          options={{
            ...options,
            headerTransparent: false,
            headerTitle: 'Account',
            headerTitleStyle: {
              fontFamily: 'Futura',
              fontSize: 16,
              fontWeight: 'bold',
              color: PALETTE.BLACK,
            },
            headerStyle: { backgroundColor: PALETTE.OFFWHITE },
          }}
        />
        <Modal.Screen
          name="UserInfo"
          component={UserInfoScreen}
          options={{
            ...options,
            headerTransparent: false,
            headerTitle: 'User Information',
            headerTitleStyle: {
              fontFamily: 'Futura',
              fontSize: 16,
              fontWeight: 'bold',
              color: PALETTE.BLACK,
            },
            headerStyle: { backgroundColor: PALETTE.OFFWHITE },
          }}
        />
        <Modal.Screen
          name="DeleteOrDeactivate"
          component={DeleteOrDeactivateScreen}
          options={{
            ...options,
            headerTransparent: false,
            headerTitle: '',
            headerTitleStyle: {
              fontFamily: 'Futura',
              fontSize: 16,
              fontWeight: 'bold',
              color: PALETTE.BLACK,
            },
            headerStyle: { backgroundColor: PALETTE.OFFWHITE },
          }}
        />
        <Modal.Screen
          name="Delete"
          component={DeleteScreen}
          options={{
            ...options,
            headerTransparent: false,
            headerTitle: '',
            headerTitleStyle: {
              fontFamily: 'Futura',
              fontSize: 16,
              fontWeight: 'bold',
              color: PALETTE.BLACK,
            },
            headerStyle: { backgroundColor: PALETTE.OFFWHITE },
          }}
        />
        <Modal.Screen
          name="Deactivate"
          component={DeactivateScreen}
          options={{
            ...options,
            headerTransparent: false,
            headerTitle: '',
            headerTitleStyle: {
              fontFamily: 'Futura',
              fontSize: 16,
              fontWeight: 'bold',
              color: PALETTE.BLACK,
            },
            headerStyle: { backgroundColor: PALETTE.OFFWHITE },
          }}
        />
        <Modal.Screen
          name="Privacy"
          component={PrivacyScreen}
          options={options}
        />
      </Modal.Group>
    </Modal.Navigator>
  );
};

export default ModalNavigator;

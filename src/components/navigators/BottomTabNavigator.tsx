import { ReactNode, useCallback, useContext } from 'react';
import { Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import HomeScreen from '@screens/feed/HomeScreen';
import TaleStackNavigator from '@navigators/TaleStackNavigator';
import ProfileStackNavigator from '@navigators/ProfileStackNavigator';
import type { BottomTabNavigatorParamList } from './types/types';
import { PALETTE } from '@constants/palette';
import { AuthContext } from '@contexts/AuthContext';
import NewPostOptions from '@components/post/NewPostOptions';
import BookOpenIcon from '@icons/BookOpenIcon';
import BookIcon from '@icons/BookIcon';

const BottomTab = createBottomTabNavigator<BottomTabNavigatorParamList>();

const BottomTabNavigator = () => {
  const { user } = useContext(AuthContext);

  const Placeholder = useCallback(() => {
    return null;
  }, []);

  const homeTabBarIcon = useCallback(
    ({
      focused,
    }: {
      focused: boolean;
      color: string;
      size: number;
    }): ReactNode => (
      <Entypo
        name="home"
        size={24}
        color={focused ? PALETTE.ORANGE : PALETTE.GREY}
      />
    ),
    [],
  );

  const taleStackTabBarIcon = useCallback(
    ({
      focused,
    }: {
      focused: boolean;
      color: string;
      size: number;
    }): ReactNode => {
      if (focused) {
        return <BookOpenIcon style={{ fontSize: 24, color: PALETTE.ORANGE }} />;
      } else {
        return <BookIcon style={{ fontSize: 24, color: PALETTE.GREY }} />;
      }
    },
    [],
  );

  const newPostTabBarIcon = useCallback(() => <NewPostOptions />, []);

  const profileStackTabBarIcon = useCallback(
    ({
      focused,
    }: {
      focused: boolean;
      color: string;
      size: number;
    }): ReactNode =>
      user?.avatar ? (
        <Image
          style={[
            styles.avatar,
            {
              borderColor: focused ? PALETTE.ORANGE : PALETTE.LIGHTGREY,
              height: focused ? 32 : 24,
              width: focused ? 32 : 24,
            },
          ]}
          source={{
            uri: user.avatar?.uri,
          }}
        />
      ) : (
        <MaterialCommunityIcons
          name="brain"
          size={24}
          color={focused ? PALETTE.ORANGE : PALETTE.GREY}
        />
      ),
    [user?.avatar],
  );

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => {
        return {
          animationEnabled: false,
          headerShown: false,
          tabBarStyle: {
            backgroundColor:
              route.name === 'ProfileStack' ||
              route.name === 'TaleStack' ||
              route.name === 'DriverStack'
                ? PALETTE.GREYISHBLUE
                : // PALETTE.TRANSPARENT
                  PALETTE.TRANSPARENT,
            position: 'absolute',
            bottom: 0,

            // Remove border top on both android & ios
            borderTopWidth: 0,
            borderTopColor: 'transparent',
            elevation: 0,
            shadowOpacity: 0,
            shadowOffset: {
              height: 0,
              width: 0,
            },
            shadowRadius: 0,
          },
          tabBarShowLabel: false,
        };
      }}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: homeTabBarIcon,
        }}
      />
      <BottomTab.Screen
        name="TaleStack"
        component={TaleStackNavigator}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: taleStackTabBarIcon,
        }}
      />
      <BottomTab.Screen
        name="Post"
        component={Placeholder}
        options={{
          tabBarShowLabel: false,
          tabBarButton: newPostTabBarIcon,
        }}
      />
      <BottomTab.Screen
        name="ProfileStack"
        component={ProfileStackNavigator}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: profileStackTabBarIcon,
        }}
      />
    </BottomTab.Navigator>
  );
};

const styles = StyleSheet.create({
  avatar: {
    borderWidth: 2,
    borderRadius: 20,
  },
});

export default BottomTabNavigator;

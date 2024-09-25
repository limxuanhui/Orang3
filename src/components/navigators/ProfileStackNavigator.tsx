import { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '@screens/profile/ProfileScreen';
import { AuthContext } from '@contexts/AuthContext';
import type { ProfileStackNavigatorParamList } from '@screens/profile/types/types';
import { PALETTE } from '@constants/palette';

const ProfileStack = createStackNavigator<ProfileStackNavigatorParamList>();

const ProfileStackNavigator = () => {
  const { user } = useContext(AuthContext);

  return (
    <ProfileStack.Navigator
      initialRouteName="Profile"
      screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        initialParams={{ userId: user?.id }}
        options={{
          headerBackTitleVisible: true,
          headerTitle: 'profile',
          headerTintColor: PALETTE.BLACK,
        }}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileStackNavigator;

import type {
  CompositeNavigationProp,
  RouteProp,
} from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type {
  AppStackNavigatorParamList,
  GypsieUser,
  ModalNavigatorParamList,
} from '@navigators/types/types';

export type ProfileScreenParams = {
  user: GypsieUser;
};

export type ProfileStackNavigatorParamList = {
  Profile: ProfileScreenParams;
};

// --------------------------- ProfileScreen ---------------------------
export type ProfileScreenProps = {
  navigation: ProfileScreenNavigationProp;
  route: ProfileScreenRouteProp;
};

export type ProfileScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<ProfileStackNavigatorParamList, 'Profile'>,
  StackNavigationProp<AppStackNavigatorParamList, 'Modal'>
>;

export type ProfileScreenRouteProp = RouteProp<
  ProfileStackNavigatorParamList,
  'Profile'
>;

// --------------------------- AvatarScreen ---------------------------
export type AvatarScreenProps = {
  navigation: AvatarScreenNavigationProp;
  route: AvatarScreenRouteProp;
};

type AvatarScreenNavigationProp = StackNavigationProp<
  ModalNavigatorParamList,
  'Avatar'
>;

type AvatarScreenRouteProp = RouteProp<ModalNavigatorParamList, 'Avatar'>;

export type AvatarScreenParams = {
  avatarUri: string;
};

// --------------------------- EditProfileScreen ---------------------------
export type EditProfileScreenProps = {
  navigation: EditProfileScreenNavigationProp;
  route: EditProfileScreenRouteProp;
};

type EditProfileScreenNavigationProp = StackNavigationProp<
  ModalNavigatorParamList,
  'Avatar'
>;

type EditProfileScreenRouteProp = RouteProp<
  ModalNavigatorParamList,
  'EditProfile'
>;

export type EditProfileScreenParams = {
  user: GypsieUser;
};

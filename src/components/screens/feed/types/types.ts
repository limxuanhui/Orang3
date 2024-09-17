import type { RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { ModalNavigatorParamList } from '@navigators/types/types';

export type HomeStackNavigatorParamList = {
  Home: undefined;
};

// --------------------------- HomeScreen ---------------------------
export type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
};

// export type HomeScreenNavigationProp = CompositeNavigationProp<
//   StackNavigationProp<HomeStackNavigatorParamList, "Home">,
//   StackNavigationProp<ModalNavigatorParamList>
// >;
export type HomeScreenNavigationProp = StackNavigationProp<
  HomeStackNavigatorParamList,
  'Home'
>;

// --------------------------- FeedScreen ---------------------------
export type FeedScreenParams = {
  feedId: string;
};

export type FeedScreenProps = {
  navigation: FeedScreenNavigationProp;
  route: FeedScreenRouteProp;
};

export type FeedScreenNavigationProp = StackNavigationProp<
  ModalNavigatorParamList,
  'Feed'
>;

export type FeedScreenRouteProp = RouteProp<ModalNavigatorParamList, 'Feed'>;

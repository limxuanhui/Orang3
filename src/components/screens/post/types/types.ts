import { StackNavigationProp } from '@react-navigation/stack';
import type { RouteProp } from '@react-navigation/native';
import type {
  GypsieUser,
  ModalNavigatorParamList,
} from '@navigators/types/types';

// --------------------------- TaleViewScreen ---------------------------
export type TaleViewScreenNavigationProp = StackNavigationProp<
  ModalNavigatorParamList,
  'TaleView'
>;

export type TaleViewScreenRouteProp = RouteProp<
  ModalNavigatorParamList,
  'TaleView'
>;

export type TaleViewScreenProps = {
  navigation: TaleViewScreenNavigationProp;
  route: TaleViewScreenRouteProp;
};

export type TaleViewScreenParams = {
  id: string;
  creator: GypsieUser;
};

// --------------------------- WriteTaleScreen ---------------------------
export type WriteTaleScreenNavigationProp = StackNavigationProp<
  ModalNavigatorParamList,
  'WriteTale'
>;
export type WriteTaleScreenRouteProp = RouteProp<
  ModalNavigatorParamList,
  'WriteTale'
>;

export type WriteTaleScreenProps = {
  navigation: WriteTaleScreenNavigationProp;
  route: WriteTaleScreenRouteProp;
};

export type WriteTaleScreenParams = {
  taleId?: string;
};

// --------------------------- WriteFeedScreen ---------------------------
export type WriteFeedScreenNavigationProp = StackNavigationProp<
  ModalNavigatorParamList,
  'WriteFeed'
>;
export type WriteFeedScreenRouteProp = RouteProp<
  ModalNavigatorParamList,
  'WriteFeed'
>;

export type WriteFeedScreenProps = {
  navigation: WriteFeedScreenNavigationProp;
  route: WriteFeedScreenRouteProp;
};

export type WriteFeedScreenParams = {
  feedId?: string;
};

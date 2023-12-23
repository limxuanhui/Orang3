import { StackNavigationProp } from "@react-navigation/stack";
import { ModalNavigatorParamList } from "../../../navigators/types/types";
import { RouteProp } from "@react-navigation/native";

// --------------------------- TaleViewScreen ---------------------------
export type TaleViewScreenNavigationProp = StackNavigationProp<
  ModalNavigatorParamList,
  "TaleView"
>;

export type TaleViewScreenRouteProp = RouteProp<
  ModalNavigatorParamList,
  "TaleView"
>;

export type TaleViewScreenProps = {
  navigation: TaleViewScreenNavigationProp;
  route: TaleViewScreenRouteProp;
};

export type TaleViewScreenParams = {
  id: string;
  creatorId: string;
};

// --------------------------- NewTaleScreen ---------------------------
export type NewTaleScreenProps = {
  navigation: NewTaleNavigationProp;
};

export type NewTaleNavigationProp = StackNavigationProp<
  ModalNavigatorParamList,
  "NewTale"
>;

import { StackNavigationProp } from "@react-navigation/stack";
import type { RouteProp } from "@react-navigation/native";
import type { ModalNavigatorParamList } from "../../../navigators/types/types";
import type { Creator } from "../../../tale/types/types";

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
  creator: Creator;
};

// --------------------------- NewTaleScreen ---------------------------
export type NewTaleScreenProps = {
  navigation: NewTaleNavigationProp;
};

export type NewTaleNavigationProp = StackNavigationProp<
  ModalNavigatorParamList,
  "NewTale"
>;

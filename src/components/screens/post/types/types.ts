import { StackNavigationProp } from "@react-navigation/stack";
import { ModalNavigatorParamList } from "../../../navigators/types/types";

export type ItineraryPostViewScreenProps = any;

export type NewItineraryPostScreenProps = {
  navigation: NewItineraryPostNavigationProp;
};

export type NewItineraryPostNavigationProp = StackNavigationProp<
  ModalNavigatorParamList,
  "NewItineraryPost"
>;

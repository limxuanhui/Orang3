import { StackNavigationProp } from "@react-navigation/stack";
import { ModalNavigatorParamList } from "../../../navigators/types/types";
import { RouteProp } from "@react-navigation/native";

// --------------------------- ItineraryPostViewScreen ---------------------------
export type ItineraryPostViewScreenNavigationProp = StackNavigationProp<
  ModalNavigatorParamList,
  "ItineraryPostView"
>;

export type ItineraryPostViewScreenRouteProp = RouteProp<
  ModalNavigatorParamList,
  "ItineraryPostView"
>;

export type ItineraryPostViewScreenProps = {
  navigation: ItineraryPostViewScreenNavigationProp;
  route: ItineraryPostViewScreenRouteProp;
};

export type ItineraryPostViewScreenParams = {
  id: string;
  creatorId: string;
};

// --------------------------- NewItineraryPostScreen ---------------------------
export type NewItineraryPostScreenProps = {
  navigation: NewItineraryPostNavigationProp;
};

export type NewItineraryPostNavigationProp = StackNavigationProp<
  ModalNavigatorParamList,
  "NewItineraryPost"
>;

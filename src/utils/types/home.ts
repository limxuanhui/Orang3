import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { BottomTabNavigatorParamList } from "./navigation";

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  BottomTabNavigatorParamList,
  "home"
>;

export type HomeScreenProps = NativeStackScreenProps<
  BottomTabNavigatorParamList,
  "home"
>;

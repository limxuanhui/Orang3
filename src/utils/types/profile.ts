import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabNavigatorParamList } from "./navigation";

export type ProfileScreenProps = NativeStackScreenProps<
  BottomTabNavigatorParamList,
  "profile"
>;
// export type ProfileScreenProps = CompositeScreenProps<
//   BottomTabScreenProps<BottomTabNavigatorParamList, "profile">,

// >

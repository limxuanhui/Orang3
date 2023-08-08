import Icon from "react-native-vector-icons/FontAwesome";
import type { IconProps } from "./types/types";

const HeartIcon = ({ style }: IconProps) => {
  return <Icon style={style} name="heart" />;
};

export default HeartIcon;

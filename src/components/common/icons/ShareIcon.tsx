import Icon from "react-native-vector-icons/FontAwesome";
import type { IconProps } from "./types/types";

const ShareIcon = ({ style }: IconProps) => {
  return <Icon style={style} name="share" />;
};

export default ShareIcon;

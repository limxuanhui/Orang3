import Icon from "react-native-vector-icons/FontAwesome6";
import type { IconProps } from "./types/types";

const LinkIcon = ({ style }: IconProps) => {
  return <Icon style={style} name="link" />;
};

export default LinkIcon;

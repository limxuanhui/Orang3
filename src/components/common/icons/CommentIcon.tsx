import Icon from "react-native-vector-icons/FontAwesome";
import type { IconProps } from "./types/types";

const CommentIcon = ({ style }: IconProps) => {
  return <Icon style={style} name="commenting" />;
};

export default CommentIcon;

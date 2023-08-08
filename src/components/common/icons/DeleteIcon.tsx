import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import type { IconProps } from "./types/types";

const DeleteIcon = ({ style }: IconProps) => {
  return <Icon style={style} name="delete" />;
};

export default DeleteIcon;

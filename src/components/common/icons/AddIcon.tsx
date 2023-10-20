import Icon from "react-native-vector-icons/FontAwesome";
import type { IconProps } from "./types/types";

const AddIcon = ({ style }: IconProps) => {
  return <Icon style={style} name="plus-circle" />;
};

export default AddIcon;

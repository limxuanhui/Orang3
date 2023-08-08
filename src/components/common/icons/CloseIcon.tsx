import Icon from "react-native-vector-icons/Ionicons";
import type { IconProps } from "./types/types";

const CloseIcon = ({ style }: IconProps) => {
  return <Icon style={style} name="close" />;
};

export default CloseIcon;

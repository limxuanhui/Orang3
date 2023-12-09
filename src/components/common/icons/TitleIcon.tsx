import Icon from "react-native-vector-icons/MaterialIcons";
import type { IconProps } from "./types/types";

const TitleIcon = ({ style }: IconProps) => {
  return <Icon style={style} name="title" />;
};

export default TitleIcon;

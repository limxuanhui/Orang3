import Icon from "react-native-vector-icons/FontAwesome6";
import { IconProps } from "./types/types";

const BookIcon = ({ style }: IconProps) => {
  return <Icon style={style} name="book" />;
};

export default BookIcon;

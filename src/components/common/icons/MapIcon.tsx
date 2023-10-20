import Icon from "react-native-vector-icons/FontAwesome";
import type { IconProps } from "./types/types";

const MapIcon = ({ style }: IconProps) => {
  return <Icon style={style} name="map" />;
};

export default MapIcon;

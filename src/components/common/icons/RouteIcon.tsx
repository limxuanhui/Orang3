import Icon from 'react-native-vector-icons/FontAwesome5';
import type { IconProps } from './types/types';

const RouteIcon = ({ style }: IconProps) => {
  return <Icon style={style} name="route" />;
};

export default RouteIcon;

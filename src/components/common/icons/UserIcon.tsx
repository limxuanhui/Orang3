import Icon from 'react-native-vector-icons/FontAwesome';
import type { IconProps } from './types/types';

const UserIcon = ({ style }: IconProps) => {
  return <Icon style={style} name="user" />;
};

export default UserIcon;

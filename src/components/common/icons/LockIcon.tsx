import Icon from 'react-native-vector-icons/FontAwesome';
import type { IconProps } from './types/types';

const LockIcon = ({ style }: IconProps) => {
  return <Icon style={style} name="lock" />;
};

export default LockIcon;

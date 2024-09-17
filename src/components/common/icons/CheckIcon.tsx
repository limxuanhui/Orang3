import Icon from 'react-native-vector-icons/Octicons';
import type { IconProps } from './types/types';

const CheckIcon = ({ style }: IconProps) => {
  return <Icon style={style} name="check" />;
};

export default CheckIcon;

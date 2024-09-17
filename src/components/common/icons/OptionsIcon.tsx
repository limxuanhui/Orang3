import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import type { IconProps } from './types/types';

const OptionsIcon = ({ style }: IconProps) => {
  return <Icon style={style} name="dots-horizontal" />;
};

export default OptionsIcon;

import Icon from 'react-native-vector-icons/Ionicons';
import type { IconProps } from './types/types';

const CameraIcon = ({ style }: IconProps) => {
  return <Icon style={style} name="camera" />;
};

export default CameraIcon;

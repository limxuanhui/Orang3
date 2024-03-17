import Icon from 'react-native-vector-icons/FontAwesome';
import type { IconProps } from './types/types';

const SearchIcon = ({ style }: IconProps) => {
  return <Icon style={style} name="search" />;
};

export default SearchIcon;

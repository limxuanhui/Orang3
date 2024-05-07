import { ComponentType } from 'react';
import {
  PressableStateCallbackType,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { IconProps } from '../../icons/types/types';

export type GypsieButtonProps = {
  customButtonStyles?:
    | StyleProp<ViewStyle>
    | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>);
  customTextContainerStyles?: StyleProp<ViewStyle>;
  customTextStyles?: StyleProp<TextStyle>;
  customSubtextStyles?: StyleProp<TextStyle>;
  customIconStyles?: StyleProp<TextStyle>;
  Icon?: ComponentType<IconProps>;
  text?: string;
  subtext?: string;
  loading?: boolean;
  disabled?: boolean;
  onPress: () => void;
};

export type LinkButtonProps = {
  customLinkButtonStyles?: StyleProp<TextStyle>;
  customLinkTextStyles?: StyleProp<TextStyle>;
  text: string;
  onPress: () => void;
};

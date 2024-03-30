import { StyleProp, TextStyle } from 'react-native';
import { PALETTE } from './palette';

export const storyTitleStyle: StyleProp<TextStyle> = {
  // fontFamily: 'Futura',
  fontFamily: 'Avenir',
  fontSize: 24,
  fontWeight: 'bold',
  color: PALETTE.GREYISHBLUE,
};

export const storyParagraphStyle: StyleProp<TextStyle> = {
  fontFamily: 'Avenir',
  fontSize: 16,
  fontWeight: 'normal',
  color: PALETTE.GREYISHBLUE,
};

export const STORY_TEXT_STYLES = {
  0: storyTitleStyle,
  1: storyParagraphStyle,
};

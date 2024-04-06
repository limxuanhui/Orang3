import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { PALETTE } from '@constants/palette';
import { DIMENSION } from '@constants/dimensions';

type MessageDisplayProps = {
  message: string;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

const MessageDisplay = ({
  message,
  containerStyle,
  textStyle,
}: MessageDisplayProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.text, textStyle]}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: DIMENSION.HUNDRED_PERCENT,
    width: DIMENSION.HUNDRED_PERCENT,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 4,
    // borderColor: PALETTE.RED,
  },
  text: {
    width: DIMENSION.NINETY_PERCENT,
    // width: '95%',
    fontFamily: 'Futura',
    fontSize: 24,
    fontWeight: 'bold',
    color: PALETTE.LIGHTGREY,
    textAlign: 'center',
  },
});

export default MessageDisplay;

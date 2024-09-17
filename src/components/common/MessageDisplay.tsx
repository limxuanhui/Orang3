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
import GypsieButton from './buttons/GypsieButton';

type MessageDisplayProps = {
  message?: string;
  handler?: () => void;
  handlerText?: string;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  buttonTextStyle?: StyleProp<TextStyle>;
  buttonIconStyle?: StyleProp<ViewStyle>;
};

const MessageDisplay = ({
  message,
  handler,
  handlerText,
  containerStyle,
  textStyle,
  buttonStyle,
  buttonTextStyle,
  buttonIconStyle,
}: MessageDisplayProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {message ? <Text style={[styles.text, textStyle]}>{message}</Text> : null}
      {handler ? (
        <GypsieButton
          customButtonStyles={[styles.handlerButton, buttonStyle]}
          customTextStyles={[styles.handlerText, buttonTextStyle]}
          customIconStyles={[styles.handlerIcon, buttonIconStyle]}
          text={handlerText}
          onPress={handler}
        />
      ) : null}
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
    fontFamily: 'Futura',
    fontSize: 24,
    fontWeight: 'bold',
    color: PALETTE.LIGHTGREY,
    textAlign: 'center',
  },
  handlerButton: {
    height: 40,
    width: '20%',
    backgroundColor: 'white',
  },
  handlerText: {
    fontFamily: 'Futura',
  },
  handlerIcon: {},
});

export default MessageDisplay;

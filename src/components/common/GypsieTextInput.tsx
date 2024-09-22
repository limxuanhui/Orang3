import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { PALETTE } from '@constants/palette';
import { DIMENSION } from '@constants/dimensions';

type GypsieTextInputProps = {
  customContainerStyles?: StyleProp<TextStyle>;
  customTextInputContainerStyles?: StyleProp<TextStyle>;
  customTextInputStyles?: StyleProp<TextStyle>;
  customPrefixStyles?: StyleProp<TextStyle>;
  customCounterStyles?: StyleProp<TextStyle>;
  customErrorMsgStyles?: StyleProp<TextStyle>;
  icon?: string;
  secureTextEntry?: boolean;
  placeholder?: string;
  multiline?: boolean;
  maxLength?: number;
  showCounter?: boolean;
  prefix?: { type: 'text' | 'icon'; value: string };
  textInputValue: string;
  disabledInput?: boolean;
  errorMessage?: string;
  onChangeText: (text: string) => void;
};

const GypsieTextInput = ({
  customContainerStyles,
  customTextInputContainerStyles,
  customTextInputStyles,
  customPrefixStyles,
  customCounterStyles,
  customErrorMsgStyles,
  prefix,
  secureTextEntry,
  placeholder,
  multiline,
  maxLength,
  showCounter,
  textInputValue,
  disabledInput = false,
  errorMessage,
  onChangeText,
}: GypsieTextInputProps) => {
  const showError: boolean = !!disabledInput && !!errorMessage;

  return (
    <View style={[styles.defaultContainer, customContainerStyles]}>
      <View
        style={[
          styles.defaultTextInputContainer,
          customTextInputContainerStyles,
          {
            backgroundColor: disabledInput
              ? PALETTE.LIGHTGREY
              : PALETTE.OFFWHITE,
          },
        ]}>
        {prefix ? (
          prefix.type === 'text' ? (
            <Text style={[styles.defaultPrefix, customPrefixStyles]}>
              {prefix.value}
            </Text>
          ) : prefix.type === 'icon' ? (
            <Icon
              style={[styles.defaultPrefix, customPrefixStyles]}
              name={prefix.value}
            />
          ) : null
        ) : null}

        <TextInput
          style={[styles.defaultTextInput, customTextInputStyles]}
          value={textInputValue}
          placeholder={placeholder}
          placeholderTextColor={PALETTE.GREY}
          multiline={multiline}
          scrollEnabled={multiline}
          maxLength={maxLength}
          secureTextEntry={secureTextEntry}
          selectionColor={PALETTE.ORANGE}
          onChangeText={onChangeText}
          editable={!disabledInput}
          // onBlur={onTitleChangeEnded}
          // numberOfLines={8} // android
        />
        {maxLength && showCounter ? (
          <Text
            style={[
              styles.defaultCounter,
              customCounterStyles,
            ]}>{`${textInputValue.length} / ${maxLength}`}</Text>
        ) : null}
      </View>
      {showError ? (
        <Text style={[styles.defaultErrorMsg, customErrorMsgStyles]}>
          {errorMessage}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  defaultContainer: {
    height: 'auto',
    width: DIMENSION.HUNDRED_PERCENT,
    marginVertical: 8,
  },
  defaultTextInputContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: PALETTE.LIGHTERGREY,
    backgroundColor: PALETTE.OFFWHITE,
  },
  defaultPrefix: {
    marginRight: 8,
    fontFamily: 'Futura',
    fontSize: 14,
    fontWeight: 'bold',
    color: PALETTE.GREYISHBLUE,
    // backgroundColor: PALETTE.RED,
  },
  defaultTextInput: {
    // height: DIMENSION.HUNDRED_PERCENT,
    width: DIMENSION.HUNDRED_PERCENT,
    paddingLeft: 16,
    paddingRight: 32,
    fontFamily: 'Futura',
    fontSize: 16,
  },
  defaultCounter: {
    position: 'absolute',
    right: 6,
    bottom: 4,
    fontFamily: 'Futura',
    fontSize: 12,
    color: PALETTE.GREY,
  },
  defaultErrorMsg: {
    marginVertical: 4,
    marginHorizontal: 16,
    fontFamily: 'Futura',
    fontSize: 12,
    fontWeight: 'bold',
    color: PALETTE.GREY,
  },
});

export default GypsieTextInput;

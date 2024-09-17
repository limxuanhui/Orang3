import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextStyle,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

type GypsieTextBoxProps = {
  customTextBoxStyles?: StyleProp<TextStyle>;
  customIconStyles?: StyleProp<TextStyle>;
  icon?: string;
  secureTextEntry?: boolean;
  placeholder: string;
};

const GypsieTextBox = ({
  customTextBoxStyles,
  customIconStyles,
  icon,
  secureTextEntry,
  placeholder,
}: GypsieTextBoxProps) => {
  return (
    <View style={styles.textBoxWrapper}>
      {icon && (
        <Icon name={icon} style={[styles.icon, customIconStyles]} size={20} />
      )}
      <TextInput
        style={[styles.textbox, customTextBoxStyles]}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}></TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  textBoxWrapper: {
    // width: '100%',
    // height: ''
    // backgroundColor: 'lightblue',
    marginVertical: 10,
  },
  icon: {
    position: 'absolute',
    top: 10,
    left: 20,
    zIndex: 1,
    color: '#aaaaaa',
  },
  textbox: {
    width: '100%',
    height: 40,
    paddingLeft: 50,
    borderWidth: 1,
    borderColor: '#dddddd',
  },
});

export default GypsieTextBox;

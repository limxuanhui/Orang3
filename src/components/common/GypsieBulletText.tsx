import { StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native';
import { DIMENSION } from '@constants/dimensions';

type GypsieBulletTextProps = {
  bullet?: string;
  text: string;
  customBulletStyles?: StyleProp<TextStyle>;
  customTextStyles?: StyleProp<TextStyle>;
};

const GypsieBulletText = ({
  bullet,
  text,
  customBulletStyles,
  customTextStyles,
}: GypsieBulletTextProps) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.defaultBulletStyles, customBulletStyles]}>
        {bullet ? bullet : '•'}
      </Text>
      <Text style={[styles.defaultTextStyles, customTextStyles]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignContent: 'flex-start',
    width: DIMENSION.HUNDRED_PERCENT,
  },
  defaultBulletStyles: {
    marginRight: 4,
  },
  defaultTextStyles: {},
});

export default GypsieBulletText;

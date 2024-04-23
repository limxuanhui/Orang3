import { Pressable, StyleSheet, Text } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import type { GypsieButtonProps } from './types/types';
import { DIMENSION } from '@constants/dimensions';
import { PALETTE } from '@constants/palette';

const GypsieButton = ({
  customButtonStyles,
  customIconStyles,
  customTextStyles,
  Icon,
  text,
  loading = false,
  disabled = false,
  onPress,
}: GypsieButtonProps) => {
  return (
    <Pressable
      style={({ pressed }) => [
        { opacity: pressed ? 0.7 : 1 },
        styles.defaultButtonStyles,
        typeof customButtonStyles === 'function'
          ? customButtonStyles({ pressed })
          : customButtonStyles,
      ]}
      disabled={disabled || loading}
      onPress={onPress}>
      {!loading && Icon ? <Icon style={customIconStyles} /> : null}
      {loading ? (
        <ActivityIndicator color={PALETTE.LIGHTGREY} size={24} />
      ) : text ? (
        <Text style={[styles.defaultTextStyles, customTextStyles]}>{text}</Text>
      ) : null}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  defaultButtonStyles: {
    justifyContent: 'center',
    alignItems: 'center',
    width: DIMENSION.HUNDRED_PERCENT,
    borderRadius: 4,
  },
  defaultIconStyles: {},
  defaultTextStyles: {},
});

export default GypsieButton;

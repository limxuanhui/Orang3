import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import type { GypsieButtonProps } from './types/types';
import { DIMENSION } from '@constants/dimensions';
import { PALETTE } from '@constants/palette';

const GypsieButton = ({
  customButtonStyles,
  customIconStyles,
  customTextContainerStyles,
  customTextStyles,
  customSubtextStyles,
  Icon,
  text,
  subtext,
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
        <View
          style={[
            styles.defaultTextContainerStyles,
            customTextContainerStyles,
          ]}>
          <Text style={[styles.defaultTextStyles, customTextStyles]}>
            {text}
          </Text>
          {subtext ? (
            <Text style={[styles.defaultSubtextStyles, customSubtextStyles]}>
              {subtext}
            </Text>
          ) : null}
        </View>
      ) : null}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  defaultButtonStyles: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: DIMENSION.HUNDRED_PERCENT,
    borderRadius: 4,
  },
  defaultIconStyles: {},
  defaultTextContainerStyles: {},
  defaultTextStyles: {},
  defaultSubtextStyles: {},
});

export default GypsieButton;

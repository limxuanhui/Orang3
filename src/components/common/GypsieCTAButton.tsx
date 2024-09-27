import { StyleSheet } from 'react-native';
import GypsieButton from '@components/common/buttons/GypsieButton';
import { DEVICE_WIDTH } from '@constants/constants';
import { PALETTE } from '@constants/palette';

type GypsieCTAButtonProps = {
  type: 'primary' | 'danger';
  text: string;
  loading?: boolean;
  disabled?: boolean;
  onPress: () => void;
};

const GypsieCTAButton = ({
  type,
  text,
  loading,
  disabled,
  onPress,
}: GypsieCTAButtonProps) => {
  const buttonIsDisabled = disabled || loading;

  return (
    <GypsieButton
      customButtonStyles={[
        styles.button,
        {
          backgroundColor: buttonIsDisabled
            ? PALETTE.GREY
            : type === 'primary'
              ? PALETTE.ORANGE
              : PALETTE.REDPINK,
        },
      ]}
      customTextStyles={styles.text}
      text={text}
      loading={loading}
      disabled={buttonIsDisabled}
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    bottom: 50,
    height: 40,
    width: DEVICE_WIDTH - 64,
    borderRadius: 8,
    backgroundColor: PALETTE.ORANGE,
  },
  text: {
    fontFamily: 'Futura',
    fontSize: 14,
    fontWeight: 'bold',
    color: PALETTE.WHITE,
  },
});

export default GypsieCTAButton;

import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GypsieButton from '@components/common/buttons/GypsieButton';
import { AuthContext } from '@contexts/AuthContext';
import Sun from '@components/common/splash/Sun';
import GoogleIcon from '@icons/GoogleIcon';
import type { SplashScreenProps } from './types/types';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '@constants/constants';
import { GYPSIE_THEME, PALETTE } from '@constants/palette';

const SplashScreen = ({}: SplashScreenProps) => {
  const { loading, googleSigninHandler } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Happir</Text>
      <GypsieButton
        customButtonStyles={styles.googleSigninButton}
        customTextStyles={styles.googleText}
        customIconStyles={styles.googleIcon}
        text="Continue with Google"
        Icon={GoogleIcon}
        onPress={googleSigninHandler}
        loading={loading}
      />
      <Sun />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
    backgroundColor: PALETTE.OFFWHITE,
  },
  title: {
    margin: 16,
    fontFamily: 'Futura',
    fontSize: 50,
    fontWeight: '700',
    color: PALETTE.ORANGE,
  },
  googleSigninButton: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    height: 40,
    width: '60%',
    marginVertical: 8,
    backgroundColor: GYPSIE_THEME.GOOGLE_SECONDARY,
  },
  googleText: {
    color: GYPSIE_THEME.GOOGLE_PRIMARY,
    fontFamily: 'Futura',
    fontSize: 14,
    fontWeight: '700',
  },
  googleIcon: {
    color: GYPSIE_THEME.GOOGLE_PRIMARY,
    fontSize: 14,
  },
});

export default SplashScreen;

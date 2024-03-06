import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import GypsieButton from "../../common/buttons/GypsieButton";
import { AuthContext } from "../../../utils/contexts/AuthContext";
import Sun from "../../common/splash/Sun";
import GoogleIcon from "../../common/icons/GoogleIcon";
import type { SplashScreenProps } from "./types/types";
import {
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
} from "../../../utils/constants/constants";
import { GYPSIE_THEME, PALETTE } from "../../../utils/constants/palette";

const SplashScreen = ({ navigation }: SplashScreenProps) => {
  const {
    user,
    isLoggedIn,
    loading,
    googleSigninHandler,
    logoutHandler,
  } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sunday</Text>
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
    justifyContent: "center",
    alignItems: "center",
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
    backgroundColor: PALETTE.OFFWHITE,
  },
  title: {
    margin: 16,
    fontFamily: "Futura",
    fontSize: 50,
    fontWeight: "700",
    color: PALETTE.ORANGE,
  },
  googleSigninButton: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    height: 40,
    width: "50%",
    marginVertical: 8,
    backgroundColor: GYPSIE_THEME.GOOGLE_SECONDARY,
  },
  googleText: {
    color: GYPSIE_THEME.GOOGLE_PRIMARY,
    fontSize: 14,
    fontWeight: "700",
  },
  googleIcon: {
    color: GYPSIE_THEME.GOOGLE_PRIMARY,
    fontWeight: "500",
  },
});

export default SplashScreen;

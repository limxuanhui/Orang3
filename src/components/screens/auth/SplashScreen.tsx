import React, { useContext, useEffect, useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { GYPSIE_THEME, PALETTE } from "../../../utils/constants/palette";
import GypsieButton from "../../common/buttons/GypsieButton";
import { AuthContext } from "../../../utils/contexts/AuthContext";
import Sun from "../../common/splash/Sun";
import type { SplashScreenProps } from "./types/types";
import {
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
} from "../../../utils/constants/constants";

const SplashScreen = ({ navigation }: SplashScreenProps) => {
  const {
    user,
    isLoggedIn,
    loading,
    loginHandler,
    googleSigninHandler,
    logoutHandler,
  } = useContext(AuthContext);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    console.log("Progress: " + loadingProgress);
  }, [loadingProgress]);

  useEffect(() => {
    // If logged in, transition to app
    if (isLoggedIn) {
      // navigation.replace("App");
      // navigation.push("App")
      // Send idToken (JWT) to backend for verification
    }

    // If not logged in, slide in authentication buttons
  }, [isLoggedIn]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sunday</Text>
      <ActivityIndicator />
      <GypsieButton
        customButtonStyles={styles.googleSigninButton}
        customTextStyles={styles.googleText}
        customIconStyles={styles.googleIcon}
        text="Continue with Google"
        icon="google"
        onPress={googleSigninHandler}
        loading={loading}
      />
      <Sun />
      {/* <Superman progress={loadingProgress} /> */}
      {/* <Pressable style={{ borderWidth: 1, borderColor: "red" }} onPress={logoutHandler}>
        <Text>Logout</Text>
      </Pressable> */}
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
    fontFamily: "Futura",
    fontSize: 50,
    fontWeight: "700",
    color: PALETTE.ORANGE,
  },
  googleSigninButton: {
    height: 40,
    width: "80%",
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

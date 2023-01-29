import { Image, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import {
  GoogleSignin,
  statusCodes,
  User,
} from "@react-native-google-signin/google-signin";

import GypsieButton from "../common/GypsieButton";
import GypsieTextBox from "../common/GypsieTextBox";
import LinkButton from "../common/LinkButton";
import { GYPSIE_THEME } from "../../utils/constants/palette";

const LoginScreen = () => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(false);

  const googleSignIn = async () => {
    setLoading(true);
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUser(userInfo);
      console.log("USER: ", userInfo);
      console.warn("Signed in");
      //   setPhoto(userInfo.user.photo || "");
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation log in is in progress
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available
      } else {
        // some other error happened
      }
    }
    setLoading(false);
  };

  const login = async () => {
    console.warn("Logging in");
  };

  return (
    <View style={styles.root}>
      <Image
        style={styles.logo}
        source={require("../../../assets/images/logo-no-background.png")}
        resizeMode="contain"
      />
      <View style={styles.form}>
        <GypsieTextBox placeholder="Username" icon="user" />
        <GypsieTextBox placeholder="Password" icon="lock" secureTextEntry />
        <GypsieButton
          customButtonStyles={styles.button}
          customTextStyles={styles.text}
          text="Log in"
          onPress={login}
        />
        <View style={styles.linkButtonsContainer}>
          <LinkButton text="Forgot password?" onPress={() => {}} />
          <LinkButton text="New to Gypsie?" onPress={() => {}} />
        </View>
        <GypsieButton
          customButtonStyles={styles.googleSigninButton}
          customTextStyles={styles.googleText}
          customIconStyles={styles.googleIcon}
          text="Continue with Google"
          icon="google"
          onPress={googleSignIn}
          loading={loading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
    paddingTop: 100,
  },
  logo: {
    width: "70%",
    height: 100,
    maxWidth: 500,
    // borderWidth: 1,
    // borderColor: "black",
  },
  form: {
    width: "100%",
    height: "80%",
    marginTop: 40,
    // borderWidth: 1,
    // borderColor: "blue",
  },
  button: {
    height: 40,
    marginVertical: 16,
    backgroundColor: GYPSIE_THEME.SECONDARY,
  },
  text: {
    color: GYPSIE_THEME.PRIMARY,
    fontSize: 14,
    fontWeight: "700",
  },
  googleSigninButton: {
    height: 40,
    marginVertical: 8,
    backgroundColor: GYPSIE_THEME.GOOGLE_SECONDARY,
  },
  googleText: {
    color: GYPSIE_THEME.GOOGLE_PRIMARY,
    fontSize: 14,
    fontWeight: "500",
  },
  googleIcon: {
    color: GYPSIE_THEME.GOOGLE_PRIMARY,
    fontWeight: "500",
  },
  linkButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
  },
});

export default LoginScreen;

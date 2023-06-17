import { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import {
  GoogleSignin,
  statusCodes,
  User,
} from "@react-native-google-signin/google-signin";

import LinkButton from "../../common/LinkButton";
import GypsieTextBox from "../../common/GypsieTextBox";
import GypsieButton from "../../common/buttons/GypsieButton";
import type { SignupScreenProps } from "../../../utils/types/auth";
import { GYPSIE_THEME } from "../../../utils/constants/palette";

const SignupScreen = ({ navigation }: SignupScreenProps) => {
  const [user, setUser] = useState<User>();

  const [loading, setLoading] = useState<boolean>(false);

  const signup = () => {
    console.warn("signed up!");
  };

  const googleSignUp = async () => {
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
          text="Start Gypsing"
          onPress={signup}
        />
        <View style={styles.linkButtonsContainer}>
          <LinkButton
            customLinkTextStyles={styles.primaryLinkTextStyle}
            text="Have an account?"
            onPress={() => {
              navigation.navigate("login");
            }}
          />
        </View>
        <GypsieButton
          customButtonStyles={styles.googleSigninButton}
          customTextStyles={styles.googleText}
          customIconStyles={styles.googleIcon}
          text="Continue with Google"
          icon="google"
          onPress={googleSignUp}
          loading={loading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    height: "100%",
  },
  logo: {
    width: "70%",
    height: 100,
    maxWidth: 500,
  },
  form: {
    width: "100%",
    marginTop: 40,
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
  linkButtonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginVertical: 8,
  },
  primaryLinkTextStyle: {
    color: GYPSIE_THEME.PRIMARY,
  },
  googleSigninButton: {
    height: 40,
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

export default SignupScreen;

import { useCallback, useContext } from "react";
import { Image, StyleSheet, View } from "react-native";

import type { LoginScreenProps } from "../../../utils/types/auth";
import GypsieButton from "../../common/buttons/GypsieButton";
import GypsieTextBox from "../../common/GypsieTextBox";
import LinkButton from "../../common/buttons/LinkButton";
import { GYPSIE_THEME } from "../../../utils/constants/palette";
import { AuthContext } from "../../../utils/contexts/AuthContext";

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const { user, loading, loginHandler, googleSigninHandler } =
    useContext(AuthContext);

  // useEffect(() => {
  //   if (user?.idToken) {
  //     navigation.navigate("home");
  //   }
  // }, [user]);

  const onPressForgotPassword = useCallback(() => {}, []);

  const onPressNewAccount = useCallback(() => {
    navigation.navigate("signup");
  }, [navigation]);

  return (
    <View style={styles.root}>
      <Image
        style={styles.logo}
        source={{
          uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/logo-no-background.png",
        }}
        resizeMode="contain"
      />
      <View style={styles.form}>
        <GypsieTextBox placeholder="Username" icon="user" />
        <GypsieTextBox placeholder="Password" icon="lock" secureTextEntry />
        <GypsieButton
          customButtonStyles={styles.button}
          customTextStyles={styles.text}
          text="Log in"
          onPress={loginHandler}
        />
        <View style={styles.linkButtonsContainer}>
          <LinkButton text="Forgot password?" onPress={onPressForgotPassword} />
          <LinkButton
            customLinkTextStyles={styles.primaryLinkTextStyle}
            text="New to Gypsie?"
            onPress={onPressNewAccount}
          />
        </View>
        <GypsieButton
          customButtonStyles={styles.googleSigninButton}
          customTextStyles={styles.googleText}
          customIconStyles={styles.googleIcon}
          text="Continue with Google"
          icon="google"
          onPress={googleSigninHandler}
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
  linkButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  primaryLinkTextStyle: {
    color: GYPSIE_THEME.PRIMARY,
  },
});

export default LoginScreen;

import React, { useState } from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from "react-native";

import { Colors } from "react-native/Libraries/NewAppScreen";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
  User,
} from "@react-native-google-signin/google-signin";
import LoginScreen from "./src/components/screens/LoginScreen";

GoogleSignin.configure({
  iosClientId:
    "240016316671-bbb96sgu5i31ahsdro89fi7va1dr50r5.apps.googleusercontent.com",
});

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <SafeAreaView>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        // backgroundColor={backgroundStyle.backgroundColor}
      />
      <LoginScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default App;

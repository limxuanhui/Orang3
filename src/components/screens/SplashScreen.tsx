import { StackNavigationProp } from "@react-navigation/stack";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { AppStackNavigatorParamList } from "../../utils/types/navigation";
import { useEffect } from "react";
import { PALETTE } from "../../utils/constants/palette";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../utils/constants/constants";

interface SplashScreenProps {
  navigation: StackNavigationProp<AppStackNavigatorParamList, "Splash">;
};

const SplashScreen = ({ navigation }: SplashScreenProps) => {
  useEffect(() => {
    // if authenticated
    setTimeout(() => {
      navigation.replace("bottom-tab");
    }, 2000);

    // if not authenticated, slide in auth buttons
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sunday</Text>
      <ActivityIndicator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
    backgroundColor: PALETTE.ORANGE,
  },
  title: {
    fontFamily: "Arial",
    fontSize: 40,
    fontWeight: "700",
  },
});

export default SplashScreen;

import { StyleSheet, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { AuthStackNavigatorParamList } from "../../utils/types/navigation";

type HomeScreenProps = NativeStackScreenProps<
  AuthStackNavigatorParamList,
  "home"
>;

const HomeScreen = ({ user }: any) => {
  return (
    <View style={styles.container}>
      <Text>{user}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 100,
    left: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "black",
    width: "70%",
    height: "50%",
  },
});

export default HomeScreen;

import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { AppStackNavigatorParamList } from "../../utils/types/navigation";
import { AuthContext } from "../../utils/contexts/AuthContext";
import { useContext } from "react";

type HomeScreenProps = NativeStackScreenProps<
  AppStackNavigatorParamList,
  "home"
>;

const HomeScreen = ({ navigation, route }: HomeScreenProps) => {
  const { user, logoutHandler } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Image
        style={styles.avatar}
        source={{
          uri: user?.user.photo || "assets/images/logo-no-background.png",
        }}
      />
      <Text>{JSON.stringify(user?.user, null, 4)}</Text>
      <Pressable
        style={{ borderWidth: 1, borderColor: "red" }}
        onPress={logoutHandler}>
        <Text>Log out</Text>
      </Pressable>
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
  avatar: { width: 40, height: 40, borderRadius: 20 },
});

export default HomeScreen;

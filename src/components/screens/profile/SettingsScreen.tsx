import { useCallback, useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { AuthContext } from "../../../utils/contexts/AuthContext";
import type { SettingsScreenProps } from "./types/types";
import {
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
} from "../../../utils/constants/constants";
import { PALETTE } from "../../../utils/constants/palette";

const SettingsScreen = ({ navigation }: SettingsScreenProps) => {
  const { logoutHandler } = useContext(AuthContext);

  const onPressAccount = useCallback(() => {
    navigation.push("Account");
  }, []);

  const onPressPrivacy = useCallback(() => {
    navigation.push("Privacy");
  }, []);

  const onPressLogout = useCallback(() => {
    console.warn("Log out pressed!");
    logoutHandler();
  }, [logoutHandler]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account settings</Text>
      <ScrollView>
        {/* <View style={styles.section}>
          <Text style={styles.subtitle}>Account</Text>
          <View style={styles.sectionItems}>
            <Pressable
              style={({ pressed }) => [
                styles.sectionItem,
                {
                  backgroundColor: pressed ? PALETTE.OFFWHITE : PALETTE.WHITE,
                },
              ]}
              onPress={onPressAccount}>
              <FontAwesome name="user" color={PALETTE.DARKGREY} size={16} />
              <Text style={styles.sectionItemTitle}>Account</Text>
              <Ionicons
                style={styles.rightChevron}
                name="chevron-forward"
                color={PALETTE.DARKGREY}
                size={16}
              />
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                styles.sectionItem,
                {
                  backgroundColor: pressed ? PALETTE.OFFWHITE : PALETTE.WHITE,
                },
              ]}
              onPress={onPressPrivacy}>
              <FontAwesome name="lock" color={PALETTE.DARKGREY} size={16} />
              <Text style={styles.sectionItemTitle}>Privacy</Text>
              <Ionicons
                style={styles.rightChevron}
                name="chevron-forward"
                color={PALETTE.DARKGREY}
                size={16}
              />
            </Pressable>
          </View>
        </View> */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Account</Text>
          <View style={styles.sectionItems}>
            <Pressable
              style={({ pressed }) => [
                styles.sectionItem,
                {
                  backgroundColor: pressed ? PALETTE.OFFWHITE : PALETTE.WHITE,
                },
              ]}
              onPress={onPressLogout}>
              <MaterialIcons name="logout" color={PALETTE.DARKGREY} size={16} />
              <Text style={styles.sectionItemTitle}>Log out</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
    backgroundColor: PALETTE.OFFWHITE,
  },
  title: {
    marginLeft: 16,
    fontFamily: "Futura",
    fontSize: 24,
    fontWeight: "800",
    letterSpacing: 0,
  },
  subtitle: {
    marginHorizontal: 16,
    marginVertical: 8,
    fontSize: 14,
    fontWeight: "bold",
    color: PALETTE.DARKGREY,
  },
  section: { marginVertical: 8 },
  sectionItems: {
    alignSelf: "center",
    width: DEVICE_WIDTH - 16,
    backgroundColor: PALETTE.WHITE,
  },
  sectionItem: {
    flexDirection: "row",
    padding: 8,
    alignItems: "center",
  },
  sectionItemTitle: { marginLeft: 8, fontWeight: "bold", fontSize: 16 },
  rightChevron: { position: "absolute", right: 8 },
});

export default SettingsScreen;

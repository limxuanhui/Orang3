import { useCallback, useContext, useEffect } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Fontisto from "react-native-vector-icons/Fontisto";
import Ionicons from "react-native-vector-icons/Ionicons";

import useUserProfileManager from "../../../utils/hooks/useUserProfileManager";
import MyPosts from "../../profile/MyPosts";
import Reactions from "../../profile/Reactions";
import type { ProfileScreenProps } from "./types/types";
import { GYPSIE_THEME, PALETTE } from "../../../utils/constants/palette";
import { DIMENSION } from "../../../utils/constants/dimensions";

const Tab = createMaterialTopTabNavigator();

const ProfileScreen = ({ navigation, route }: ProfileScreenProps) => {
  // const { userId, avatarUri } = route.params;
  console.log("--------");
  console.log("--------");
  console.log("--------" + "rendered ProfileScreen");
  let userId: number | undefined;
  let avatarUri: string | undefined;
  if (route.params) {
    userId = route.params.userId;
    avatarUri = route.params.avatarUri;
  } else {
  }

  const { isLoading, userData } = useUserProfileManager(10001);

  const onPressAvatar = useCallback(() => {
    if (avatarUri) {
      navigation.push("Modal", { screen: "Avatar", params: { avatarUri } });
    }
  }, [avatarUri, navigation]);

  const onPressSettings = useCallback(() => {
    navigation.push("Settings");
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          styles.avatarContainer,
          { transform: [{ scale: pressed ? 0.98 : 1 }] },
        ]}
        onPress={onPressAvatar}>
        <Image
          style={styles.avatar}
          source={{
            uri: avatarUri,
          }}
        />
      </Pressable>
      <Pressable style={styles.banner}>
        <Image
          style={styles.bannerImage}
          source={{ uri: userData.bannerUri }}
        />
      </Pressable>
      <Pressable style={styles.settingsButton} onPress={onPressSettings}>
        <Ionicons name="settings" size={24} color={PALETTE.OFFWHITE} />
      </Pressable>
      <View style={styles.userDetails}>
        {/* <Text style={styles.userDetail}>{userData.handle || "Name"}</Text>
        <Text style={styles.userDetail}>{userData.email || "Email"}</Text> */}
      </View>
      <Tab.Navigator
        sceneContainerStyle={styles.sceneContainer}
        initialRouteName="myposts"
        screenOptions={{
          tabBarStyle: { backgroundColor: PALETTE.WHITE, height: "8%" },
          tabBarShowLabel: false,
          tabBarIndicatorStyle: { backgroundColor: PALETTE.ORANGE },
        }}>
        <Tab.Screen
          name="myposts"
          component={MyPosts}
          options={{
            tabBarLabel: "Posts",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "grid" : "grid-outline"}
                size={20}
                color={focused ? PALETTE.ORANGE : PALETTE.BLACK}
              />
            ),
          }}
        />
        <Tab.Screen
          name="reactions"
          component={Reactions}
          options={{
            tabBarLabel: "Reactions",
            tabBarIcon: ({ focused }) => (
              <Fontisto
                name={focused ? "open-mouth" : "zipper-mouth"}
                size={20}
                color={focused ? PALETTE.ORANGE : PALETTE.BLACK}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: DIMENSION.HUNDRED_PERCENT,
    height: DIMENSION.HUNDRED_PERCENT,
    backgroundColor: PALETTE.BLUE,
  },
  sceneContainer: {
    // borderWidth: 10,
    // borderColor: "green",
    backgroundColor: PALETTE.OFFWHITE,
  },
  settingsButton: { position: "absolute", top: 50, right: 20, zIndex: 3 },
  banner: {
    height: DIMENSION.TWENTYFIVE_PERCENT,
    width: DIMENSION.HUNDRED_PERCENT,
    borderBottomWidth: 1,
    borderBottomColor: PALETTE.LIGHTGREY,
  },
  bannerImage: {
    height: DIMENSION.HUNDRED_PERCENT,
    width: DIMENSION.HUNDRED_PERCENT,
  },
  avatarContainer: {
    position: "absolute",
    top: DIMENSION.FIFTEEN_PERCENT,
    alignSelf: "center",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: PALETTE.RED,
    shadowOffset: { width: 0, height: 10 },
    shadowColor: PALETTE.GREY,
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 20,
    zIndex: 1,
    overflow: "hidden",
  },
  avatar: {
    ...StyleSheet.absoluteFillObject,
    height: undefined,
    width: undefined,
    resizeMode: "cover",
    borderRadius: 8,
    // height: DIMENSION.HUNDRED_PERCENT,
    // width: DIMENSION.HUNDRED_PERCENT,
    // borderRadius: 50,
  },
  userDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "5%",
    width: DIMENSION.HUNDRED_PERCENT,
    paddingHorizontal: 20,
    backgroundColor: PALETTE.WHITE,
    // borderBottomWidth: 1,
    // borderBottomColor: PALETTE.BLUE,
  },
  userDetail: {
    color: GYPSIE_THEME.PRIMARY,
    fontWeight: "bold",
  },
});

export default ProfileScreen;

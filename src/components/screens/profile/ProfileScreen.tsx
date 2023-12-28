import { useCallback, useContext, useEffect } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import AddIcon from "../../common/icons/AddIcon";
import BookOpenIcon from "../../common/icons/BookOpenIcon";
import BookIcon from "../../common/icons/BookIcon";
import { AuthContext } from "../../../utils/contexts/AuthContext";
import useUserProfileManager from "../../../utils/hooks/useUserProfileManager";
import GypsieButton from "../../common/buttons/GypsieButton";
import MyFeeds from "../../profile/MyFeeds";
import MyTales from "../../profile/MyTales";
import type { ProfileScreenProps } from "./types/types";
import { DIMENSION } from "../../../utils/constants/dimensions";
import { PALETTE } from "../../../utils/constants/palette";

const Tab = createMaterialTopTabNavigator();

const ProfileScreen = ({ navigation, route }: ProfileScreenProps) => {
  const userInfo = useContext(AuthContext);
  let userId: string | undefined;
  let avatarUri: string | undefined;
  if (route.params) {
    userId = route.params.userId;
    avatarUri = route.params.avatarUri;
  }

  const { isLoading, userData } = useUserProfileManager(10001);

  const onPressAvatar = useCallback(() => {
    if (avatarUri) {
      navigation.push("Modal", { screen: "Avatar", params: { avatarUri } });
    }
  }, [avatarUri, navigation]);

  const onPressChangeAvatar = useCallback(() => {}, []);

  const onPressSettings = useCallback(() => {
    navigation.push("Settings");
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.banner}>
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
          <GypsieButton
            customButtonStyles={styles.changeAvatarButton}
            customIconStyles={{ fontSize: 20 }}
            Icon={AddIcon}
            onPress={onPressChangeAvatar}
          />
        </Pressable>

        <View style={styles.bannerInfoContainer}>
          <Text style={styles.bannerInfoText}>
            {"@" + userInfo.user?.handle}
          </Text>
        </View>
      </View>

      {/* Check if profile is current user's. If not, hide settings button. */}
      <Pressable style={styles.settingsButton} onPress={onPressSettings}>
        <Ionicons name="settings" size={24} color={PALETTE.BLACK} />
      </Pressable>

      <Tab.Navigator
        sceneContainerStyle={styles.sceneContainer}
        initialRouteName="myfeeds"
        screenOptions={{
          tabBarStyle: {
            backgroundColor: PALETTE.OFFWHITE,
            height: "7%",
          },
          tabBarShowLabel: false,
          tabBarIndicatorStyle: { backgroundColor: PALETTE.ORANGE },
        }}>
        <Tab.Screen
          name="myfeeds"
          component={MyFeeds}
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "grid" : "grid-outline"}
                size={20}
                color={focused ? PALETTE.GREYISHBLUE : PALETTE.GREYISHBLUE}
              />
            ),
          }}
        />
        <Tab.Screen
          name="mytales"
          component={MyTales}
          options={{
            tabBarIcon: ({ focused }) =>
              focused ? (
                <BookOpenIcon
                  style={{ fontSize: 20, color: PALETTE.GREYISHBLUE }}
                />
              ) : (
                <BookIcon
                  style={{ fontSize: 20, color: PALETTE.GREYISHBLUE }}
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
    // backgroundColor: PALETTE.GREYISHBLUE,
    backgroundColor: PALETTE.OFFWHITE,
  },
  sceneContainer: {
    backgroundColor: PALETTE.OFFWHITE,
  },
  settingsButton: { position: "absolute", top: 50, right: 20, zIndex: 3 },
  banner: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: DIMENSION.TWENTYFIVE_PERCENT,
    width: DIMENSION.HUNDRED_PERCENT,
  },
  bannerImage: {
    height: DIMENSION.HUNDRED_PERCENT,
    width: DIMENSION.HUNDRED_PERCENT,
  },
  bannerInfoContainer: {
    backgroundColor: PALETTE.OFFWHITE,
    justifyContent: "center",
    alignItems: "center",
    height: DIMENSION.HUNDRED_PERCENT,
    width: DIMENSION.FIFTY_PERCENT,
  },
  bannerInfoText: {
    marginBottom: 8,
    color: PALETTE.BLACK,
    fontSize: 20,
    fontFamily: "Futura",
    fontWeight: "bold",
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: PALETTE.WHITE,
    shadowOffset: { height: 2, width: 0 },
    shadowColor: PALETTE.BLACK,
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    zIndex: 1,
  },
  avatar: {
    height: DIMENSION.HUNDRED_PERCENT,
    width: DIMENSION.HUNDRED_PERCENT,
    borderRadius: 60,
  },
  changeAvatarButton: {
    position: "absolute",
    bottom: 8,
    right: 8,
    justifyContent: "center",
    alignItems: "center",
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: PALETTE.OFFWHITE,
    backgroundColor: PALETTE.ORANGE,
  },
});

export default ProfileScreen;

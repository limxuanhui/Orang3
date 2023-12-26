import { useCallback, useContext, useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Fontisto from "react-native-vector-icons/Fontisto";
import Ionicons from "react-native-vector-icons/Ionicons";

import useUserProfileManager from "../../../utils/hooks/useUserProfileManager";
import MyPosts from "../../profile/MyPosts";
import Reactions from "../../profile/Reactions";
import type { ProfileScreenProps } from "./types/types";
import { GYPSIE_THEME, PALETTE } from "../../../utils/constants/palette";
import { DIMENSION } from "../../../utils/constants/dimensions";
import { Avatar, Image, Skeleton } from "@rneui/themed";
import GypsieButton from "../../common/buttons/GypsieButton";
import AddIcon from "../../common/icons/AddIcon";
import BookOpenIcon from "../../common/icons/BookOpenIcon";
import BookIcon from "../../common/icons/BookIcon";

const Tab = createMaterialTopTabNavigator();

const ProfileScreen = ({ navigation, route }: ProfileScreenProps) => {
  // const { userId, avatarUri } = route.params;
  let userId: string | undefined;
  let avatarUri: string | undefined;
  if (route.params) {
    userId = route.params.userId;
    avatarUri = route.params.avatarUri;
    console.log("AVATAR:", avatarUri);
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
            PlaceholderContent={
              <Skeleton style={{ flex: 1 }} animation="pulse" />
            }
          />
          <GypsieButton
            customButtonStyles={{
              position: "absolute",
              bottom: 8,
              right: 8,
              justifyContent: "center",
              alignItems: "center",
              // zIndex: 1,
              height: 24,
              width: 24,
              borderRadius: 10,
              shadowColor: "black",
              shadowOpacity: 0.1,
              shadowRadius: 0.4,
              shadowOffset: { height: 2, width: 0 },
              // borderWidth: 2,
              // borderColor: "black",
              backgroundColor: PALETTE.ORANGE,
            }}
            customIconStyles={{ fontSize: 20 }}
            Icon={AddIcon}
            onPress={() => {}}
          />
        </Pressable>

        <View
          style={{
            backgroundColor: PALETTE.OFFWHITE,
            justifyContent: "center",
            height: "100%",
            width: "50%",
            borderWidth: 1,
            borderColor: "red",
          }}>
          <Text
            style={{
              color: "black",
              fontSize: 20,
              fontWeight: "bold",
              fontFamily: "Futura",
              marginBottom: 8,
            }}>
            @Joseph
          </Text>
          <Text
            style={{
              color: "black",
              fontSize: 16,
              fontFamily: "Futura",
              marginBottom: 8,
            }}>
            Love travelling
          </Text>
          <GypsieButton
            customButtonStyles={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              width: 100,
              padding: 4,
              backgroundColor: PALETTE.ORANGE,
            }}
            customTextStyles={{
              color: PALETTE.GREYISHBLUE,
              fontFamily: 'Futura',
              fontSize: 14,
              fontWeight: "bold",
            }}
            customIconStyles={{ fontSize: 14 }}
            Icon={AddIcon}
            text="Follow"
            onPress={() => {}}
          />
        </View>
      </View>

      {/* Check if profile is current user's. If not, hide settings button. */}
      <Pressable style={styles.settingsButton} onPress={onPressSettings}>
        <Ionicons name="settings" size={24} color={PALETTE.BLACK} />
      </Pressable>

      <Tab.Navigator
        sceneContainerStyle={styles.sceneContainer}
        // style={{flex:1}}
        initialRouteName="myfeeds"
        screenOptions={{
          tabBarStyle: {
            // backgroundColor: PALETTE.GREYISHBLUE,
            backgroundColor: PALETTE.OFFWHITE,
            height: "7%",
            // padding: 8,
          },
          tabBarShowLabel: false,
          tabBarIndicatorStyle: { backgroundColor: PALETTE.ORANGE },
        }}>
        <Tab.Screen
          name="myfeeds"
          component={MyPosts}
          options={{
            tabBarLabel: "Posts",
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
          component={MyPosts}
          options={{
            tabBarLabel: "Posts",
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

        {/* <Tab.Screen
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
        /> */}
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
    // flex:1,
    backgroundColor: PALETTE.OFFWHITE,
    // backgroundColor: PALETTE.GREYISHBLUE,
  },
  settingsButton: { position: "absolute", top: 50, right: 20, zIndex: 3 },
  banner: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: DIMENSION.TWENTYFIVE_PERCENT,
    width: DIMENSION.HUNDRED_PERCENT,
    // backgroundColor: "skyblue",
    // borderBottomWidth: 1,
    // borderBottomColor: PALETTE.LIGHTGREY,
  },
  bannerImage: {
    height: DIMENSION.HUNDRED_PERCENT,
    width: DIMENSION.HUNDRED_PERCENT,
  },
  avatarContainer: {
    // position: "absolute",
    // top: DIMENSION.FORTY_PERCENT,
    // left: '5%',
    // alignSelf: "center",
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: PALETTE.WHITE,
    shadowOffset: { width: 0, height: 10 },
    shadowColor: PALETTE.GREY,
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 20,
    zIndex: 1,
    // overflow: "hidden",
  },
  avatar: {
    height: DIMENSION.HUNDRED_PERCENT,
    width: DIMENSION.HUNDRED_PERCENT,
    borderRadius: 60,
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

import { useCallback, useContext } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import { ProfileScreenProps } from "../../../utils/types/profile";
import { AuthContext } from "../../../utils/contexts/AuthContext";
import Fontisto from "react-native-vector-icons/Fontisto";
import Ionicons from "react-native-vector-icons/Ionicons";
import { GYPSIE_THEME, PALETTE } from "../../../utils/constants/palette";
import { DIMENSION } from "../../../utils/constants/dimensions";
import { DUMMY_POSTS } from "../../../data/dummy-posts";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MyPosts from "../../profile/MyPosts";
import Reactions from "../../profile/Reactions";

const Tab = createMaterialTopTabNavigator();

const ProfileScreen = ({ navigation, route }: ProfileScreenProps) => {
  const { height, width } = useWindowDimensions();
  const { user, logoutHandler } = useContext(AuthContext);
  const bannerUri =
    "/Users/limxuanhui/bluextech/gypsie/assets/images/sample1.jpg";
  const dummyAvatar =
    "/Users/limxuanhui/bluextech/gypsie/assets/images/portrait1.jpg";
  // const data = [
  //   1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  // ];
  const data = DUMMY_POSTS;

  // const onPressLogout = useCallback(({pressed}) => {

  // },[])

  const onPressAvatar = useCallback(() => {
    console.warn("Avatar pressed");
  }, []);

  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          styles.avatarContainer,
          // { opacity: pressed ? 0.9 : 1 },
          { transform: [{ scale: pressed ? 0.98 : 1 }] },
        ]}
        onPress={onPressAvatar}>
        <Image
          style={styles.avatar}
          source={{
            uri:
              // avatarUri ||
              user?.user.photo || dummyAvatar,
          }}
        />
      </Pressable>
      {/* <Text>{JSON.stringify(user?.user, null, 4)}</Text> */}
      <Pressable style={styles.banner}>
        <Image style={styles.bannerImage} source={{ uri: bannerUri }} />
      </Pressable>
      <View style={styles.userDetails}>
        <Text style={styles.userDetail}>
          {/* {(user?.user.givenName || "") + " " + (user?.user.familyName || "")} */}
          {user?.user.name || "Joseph Lim"}
        </Text>
        <Text style={styles.userDetail}>
          {user?.user.email || "ordika.17@gmail.com"}
        </Text>
      </View>
      <Tab.Navigator
        initialRouteName="myposts"
        screenOptions={{
          // tabBarActiveTintColor: "#e91e63",
          // tabBarLabelStyle: { fontSize: 12 },
          tabBarStyle: { backgroundColor: PALETTE.WHITE, height: "8%" },
          tabBarShowLabel: false,
          tabBarIndicatorStyle: { backgroundColor: "orange" },
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
                color={focused ? "orange" : PALETTE.BLACK}
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
                color={focused ? "orange" : PALETTE.BLACK}
              />
            ),
          }}
        />
      </Tab.Navigator>

      {/* <GypsieButton
        text="Log out"
        customButtonStyles={styles.logoutButton}
        onPress={logoutHandler}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // justifyContent: "space-between",
    // alignItems: "center",
    // borderWidth: 2,
    // borderColor: "magenta",
    width: DIMENSION.HUNDRED_PERCENT,
    height: DIMENSION.HUNDRED_PERCENT,
  },
  banner: {
    height: DIMENSION.TWENTYFIVE_PERCENT,
    width: DIMENSION.HUNDRED_PERCENT,
    borderBottomWidth: 1,
    borderBottomColor: PALETTE.LIGHTGREY,
  },
  bannerImage: {
    height: DIMENSION.HUNDRED_PERCENT,
    width: DIMENSION.HUNDRED_PERCENT,
    // zIndex: 100,
  },
  avatarContainer: {
    position: "absolute",
    top: DIMENSION.FIFTEEN_PERCENT,
    alignSelf: "center",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: PALETTE.WHITE,
    shadowOffset: { width: 0, height: 10 },
    shadowColor: PALETTE.GREY,
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 20,
    zIndex: 1,
  },
  avatar: {
    height: DIMENSION.HUNDRED_PERCENT,
    width: DIMENSION.HUNDRED_PERCENT,
    borderRadius: 50,
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

  logoutButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 40,
    borderWidth: 1,
    borderColor: PALETTE.RED,
  },
});

export default ProfileScreen;

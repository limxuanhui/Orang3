import { useCallback, useContext } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import { ProfileScreenProps } from "../../utils/types/navigation";
import { AuthContext } from "../../utils/contexts/AuthContext";
import { GYPSIE_THEME, PALETTE } from "../../utils/constants/palette";
import { DIMENSION } from "../../utils/constants/dimensions";
import GypsiePostThumbnail from "../post/GypsiePostThumbnail";
import useFeedManager from "../../utils/hooks/useFeedManager";
import { DUMMY_POSTS } from "../../data/dummy-posts";

const ProfileScreen = ({ navigation, route }: ProfileScreenProps) => {
  const { height, width } = useWindowDimensions();
  const { user, logoutHandler } = useContext(AuthContext);
  const { refreshing, refreshPostsHandler } = useFeedManager();
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
      <FlatList
        showsVerticalScrollIndicator={false}
        data={[1]}
        refreshing={refreshing}
        onRefresh={refreshPostsHandler}
        renderItem={() => (
          <View style={styles.postsGrid} key={Math.random().toString()}>
            {data.map(post => (
              // <Text>Hi</Text>
              <GypsiePostThumbnail post={post} />
            ))}
          </View>
        )}
      />
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
    alignItems: "center",
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
    height: 40,
    width: DIMENSION.HUNDRED_PERCENT,
    paddingHorizontal: 20,
    // borderBottomWidth: 1,
    // borderBottomColor: PALETTE.BLUE,
  },
  userDetail: {
    color: GYPSIE_THEME.PRIMARY,
    fontWeight: "bold",
  },
  postsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    // justifyContent: "space-evenly",
    // height: 20,
    width: DIMENSION.HUNDRED_PERCENT,
    // backgroundColor: "red",
    // borderWidth: 1,
    // borderColor: "blue",
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

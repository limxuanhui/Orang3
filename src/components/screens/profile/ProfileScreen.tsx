import { memo, useContext } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BookIcon from '@icons/BookIcon';
import BookOpenIcon from '@icons/BookOpenIcon';
import MyFeeds from '@components/profile/MyFeeds';
import MyTales from '@components/profile/MyTales';
import type { ProfileScreenProps } from './types/types';
import { DIMENSION } from '@constants/dimensions';
import { PALETTE } from '@constants/palette';
import type { FeedThumbnailInfo } from '@components/feed/types/types';
import type { TaleThumbnailInfo } from '@components/tale/types/types';
import useProfileManager from '@hooks/useProfileManager';
import { AuthContext } from '@contexts/AuthContext';

const Tab = createMaterialTopTabNavigator();

const ProfileScreen = ({ route }: ProfileScreenProps) => {
  const { user: currentUser } = useContext(AuthContext);
  const profileUser = route.params.user;
  const { feedsMetadata, talesMetadata, onPressAvatar, onPressSettings } =
    useProfileManager(profileUser);
  console.log('\n');
  console.log('route: ', route);
  console.log('profile user: ', profileUser);
  console.log('logged in user: ', currentUser);
  console.log('\n');

  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <View style={styles.bannerImageContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.avatarContainer,
              { transform: [{ scale: pressed ? 0.98 : 1 }] },
            ]}
            onPress={onPressAvatar}>
            <Image
              style={styles.avatar}
              source={{
                uri: profileUser.avatar?.uri,
              }}
              // loadingIndicatorSource={}
              // resizeMode="cover"
            />
          </Pressable>
        </View>
        <View style={styles.bannerInfoContainer}>
          <Text style={[styles.bannerInfoText, { color: PALETTE.ORANGE }]}>
            @
          </Text>
          <Text style={styles.bannerInfoText}>{profileUser.handle}</Text>
        </View>
      </View>

      {profileUser.id === currentUser?.id ? (
        <Pressable style={styles.settingsButton} onPress={onPressSettings}>
          <Ionicons name="settings" size={24} color={PALETTE.BLACK} />
        </Pressable>
      ) : null}

      <Tab.Navigator
        sceneContainerStyle={styles.sceneContainer}
        initialRouteName="myfeeds"
        screenOptions={{
          tabBarStyle: {
            backgroundColor: PALETTE.OFFWHITE,
            height: '7%',
          },
          tabBarShowLabel: false,
          tabBarIndicatorStyle: { backgroundColor: PALETTE.ORANGE },
        }}>
        <Tab.Screen
          name="myfeeds"
          children={() => (
            <MyFeeds data={feedsMetadata as FeedThumbnailInfo[]} />
          )}
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? 'grid' : 'grid-outline'}
                size={20}
                color={focused ? PALETTE.ORANGE : PALETTE.GREYISHBLUE}
              />
            ),
          }}
        />
        <Tab.Screen
          name="mytales"
          children={() => (
            <MyTales data={talesMetadata as TaleThumbnailInfo[]} />
          )}
          options={{
            tabBarIcon: ({ focused }) =>
              focused ? (
                <BookOpenIcon style={{ fontSize: 20, color: PALETTE.ORANGE }} />
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
    backgroundColor: PALETTE.OFFWHITE,
  },
  sceneContainer: {
    // backgroundColor: PALETTE.GREYISHBLUE,
    // height:'100%'
  },
  settingsButton: { position: 'absolute', top: 50, right: 20, zIndex: 3 },
  banner: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: DIMENSION.TWENTYFIVE_PERCENT,
    width: DIMENSION.HUNDRED_PERCENT,
    borderWidth: 0,
    borderColor: 'blue',
  },
  bannerImageContainer: {
    justifyContent: 'center',
    height: DIMENSION.HUNDRED_PERCENT,
  },
  avatarContainer: {
    height: 120,
    width: 120,
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
  bannerInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: DIMENSION.HUNDRED_PERCENT,
    width: DIMENSION.FIFTY_PERCENT,
    backgroundColor: PALETTE.OFFWHITE,
  },
  bannerInfoText: {
    marginBottom: 8,
    color: PALETTE.BLACK,
    fontSize: 24,
    fontFamily: 'Futura',
    fontWeight: 'bold',
  },
  changeAvatarButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    justifyContent: 'center',
    alignItems: 'center',
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: PALETTE.OFFWHITE,
    backgroundColor: PALETTE.ORANGE,
  },
});

export default memo(ProfileScreen);

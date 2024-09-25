import { memo, useCallback } from 'react';
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
import type { FeedMetadata } from '@components/feed/types/types';
import type { TaleMetadata } from '@components/tale/types/types';
import useProfileManager from '@hooks/useProfileManager';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GypsieButton from '@components/common/buttons/GypsieButton';

const Tab = createMaterialTopTabNavigator();
const BANNER_HEIGHT: number = 280;
const TAB_BAR_HEIGHT: number = 50;

const ProfileScreen = ({ route }: ProfileScreenProps) => {
  const insets = useSafeAreaInsets();
  const profileUserId = route.params.userId;
  const {
    avatarThumbnailUri,
    userMetadata,
    userIsProfileOwner,
    feedsMetadata,
    talesMetadata,
    onRefreshFeedsMetadata,
    onRefreshTalesMetadata,
    onPressAvatar,
    onPressEditProfile,
    onPressSettings,
  } = useProfileManager(profileUserId);

  const myFeedsIcon = useCallback(
    ({ focused }: { focused: boolean; color: string }) => (
      <Ionicons
        name={focused ? 'grid' : 'grid-outline'}
        size={20}
        color={focused ? PALETTE.ORANGE : PALETTE.GREYISHBLUE}
      />
    ),
    [],
  );

  const myTalesIcon = useCallback(
    ({ focused }: { focused: boolean; color: string }) =>
      focused ? (
        <BookOpenIcon style={{ fontSize: 20, color: PALETTE.ORANGE }} />
      ) : (
        <BookIcon style={{ fontSize: 20, color: PALETTE.GREYISHBLUE }} />
      ),
    [],
  );

  return (
    <View style={styles.container}>
      <View style={[styles.banner, { paddingTop: insets.top }]}>
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
                uri: avatarThumbnailUri,
              }}
              // loadingIndicatorSource={}
              // resizeMode="cover"
            />
          </Pressable>
        </View>
        <View style={styles.bannerInfoContainer}>
          <View style={styles.handleContainer}>
            <Text style={[styles.handleText, { color: PALETTE.ORANGE }]}>
              @
            </Text>
            <Text style={styles.handleText}>{userMetadata?.handle}</Text>
          </View>
          <Text style={styles.bioText}>
            {userMetadata?.bio
              ? userMetadata.bio
              : userIsProfileOwner
                ? 'Add a short bio...'
                : ''}
          </Text>
          {userIsProfileOwner ? (
            <GypsieButton
              customButtonStyles={styles.editProfileButton}
              customTextStyles={styles.editProfileText}
              text="Edit profile"
              onPress={onPressEditProfile}
            />
          ) : null}
        </View>
      </View>

      {userIsProfileOwner ? (
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
            height: TAB_BAR_HEIGHT,
          },
          tabBarShowLabel: false,
          tabBarIndicatorStyle: { backgroundColor: PALETTE.ORANGE },
        }}>
        <Tab.Screen
          name="myfeeds"
          children={() => (
            <MyFeeds
              data={feedsMetadata as FeedMetadata[]}
              onRefresh={onRefreshFeedsMetadata}
            />
          )}
          options={{ tabBarIcon: myFeedsIcon }}
        />
        <Tab.Screen
          name="mytales"
          children={() => (
            <MyTales
              data={talesMetadata as TaleMetadata[]}
              onRefresh={onRefreshTalesMetadata}
            />
          )}
          options={{
            tabBarIcon: myTalesIcon,
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
  sceneContainer: {},
  settingsButton: { position: 'absolute', top: 50, right: 20, zIndex: 3 },
  banner: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: BANNER_HEIGHT,
    width: DIMENSION.HUNDRED_PERCENT,
    padding: 16,
  },
  bannerImageContainer: {
    justifyContent: 'center',
    height: DIMENSION.HUNDRED_PERCENT,
  },
  avatarContainer: {
    height: 120,
    width: 120,
    borderRadius: 60,
    backgroundColor: PALETTE.OFFWHITE,
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 120,
    width: DIMENSION.FIFTY_PERCENT,
    paddingHorizontal: 8,
  },
  handleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  handleText: {
    color: PALETTE.BLACK,
    fontSize: 22,
    fontFamily: 'Lilita One',
    fontWeight: 'bold',
  },
  bioText: {
    width: DIMENSION.HUNDRED_PERCENT,
    marginBottom: 16,
    fontSize: 12,
    // fontStyle: 'italic',
    color: PALETTE.GREYISHBLUE,
    textAlign: 'center',
  },
  editProfileButton: {
    width: 'auto',
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: PALETTE.LIGHTERGREY,
  },
  editProfileText: {
    fontFamily: 'Futura',
    fontSize: 12,
    color: PALETTE.GREYISHBLUE,
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

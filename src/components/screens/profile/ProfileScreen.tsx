import { memo, useCallback, useContext, useMemo } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { QueryKey, queryOptions, useQuery } from '@tanstack/react-query';
import BookIcon from '@icons/BookIcon';
import BookOpenIcon from '@icons/BookOpenIcon';
import { AuthContext } from '@contexts/AuthContext';
import MyFeeds from '@components/profile/MyFeeds';
import MyTales from '@components/profile/MyTales';
import type { ProfileScreenProps, ProfileScreenRouteProp } from './types/types';
import { DIMENSION } from '@constants/dimensions';
import { PALETTE } from '@constants/palette';
import { DUMMY_DATABASE } from '@data/database';
import type { DataKey } from '@data/types/types';
import type { FeedThumbnailInfo } from '@components/feed/types/types';
import type { TaleThumbnailInfo } from '@components/tale/types/types';

const Tab = createMaterialTopTabNavigator();
// const imageLibraryOptions: ImageLibraryOptions = {
//   mediaType: "photo",
//   presentationStyle: "fullScreen",
//   selectionLimit: 1,
// };

// const { openGallery } = useMediaHandlers(imageLibraryOptions);

// const onPressChangeAvatar = useCallback(async () => {

const ProfileScreen = ({ navigation, route }: ProfileScreenProps) => {
  const userInfo = useContext(AuthContext);
  const { params } = useRoute<ProfileScreenRouteProp>();

  let userId: string | undefined;
  let avatarUri: string | undefined;
  console.log('PARAMS: ', params);
  if (route.params) {
    userId = route.params.userId;
    avatarUri = route.params.avatarUri;
  } else {
    userId = userInfo.user?.id;
    avatarUri = userInfo.user?.avatar?.uri;
  }

  const onPressAvatar = useCallback(() => {
    if (avatarUri) {
      navigation.push('Modal', { screen: 'Avatar', params: { avatarUri } });
    }
  }, [avatarUri, navigation]);
  //   const response = await openGallery();
  //   if (response.assets) {
  //     const asset = response.assets[0];

  //     // > avatarUri = asset.uri
  //     // > Send file to s3 storage and update metadata table for changing avatarUri
  //   }
  //   console.log("RESPONSE: " , response);
  // }, [openGallery]);

  const onPressSettings = useCallback(() => {
    navigation.push('Settings');
  }, [navigation]);

  const feedsMetadataQueryFn = useCallback(
    async ({
      queryKey,
    }: {
      queryKey: QueryKey;
    }): Promise<FeedThumbnailInfo[]> => {
      const [key, userId] = queryKey;
      console.log('QUERY FUNCTION CALLED');
      return new Promise((resolve, _reject) => {
        const feedsThumbnails: FeedThumbnailInfo[] = DUMMY_DATABASE[
          key as DataKey
        ] as FeedThumbnailInfo[];
        const userfeedsThumbnails: FeedThumbnailInfo[] = feedsThumbnails.filter(
          (el: FeedThumbnailInfo) => el.creator.id === userId,
        );
        setTimeout(() => {
          resolve(userfeedsThumbnails);
        }, 2000);
      });
    },
    [],
  );

  const feedsMetadataOptions = useMemo(() => {
    const queryKey = ['feeds-md', userId];
    return queryOptions({
      queryKey,
      queryFn: feedsMetadataQueryFn,
      networkMode: 'online',
      enabled: true,
      gcTime: 1000 * 60 * 5,
      staleTime: Infinity,
    });
  }, [userId, feedsMetadataQueryFn]);

  const { data: feedsMetadata } = useQuery(feedsMetadataOptions);

  const talesMetadataQueryFn = useCallback(
    async ({
      queryKey,
    }: {
      queryKey: QueryKey;
    }): Promise<TaleThumbnailInfo[]> => {
      const [key, userId] = queryKey;
      console.log('QUERY FUNCTION CALLED');
      return new Promise((resolve, _reject) => {
        const talesThumbnails: TaleThumbnailInfo[] = DUMMY_DATABASE[
          key as DataKey
        ] as TaleThumbnailInfo[];
        const userTalesThumbnails: TaleThumbnailInfo[] = talesThumbnails.filter(
          (el: TaleThumbnailInfo) => el.creator.id === userId,
        );
        setTimeout(() => {
          resolve(userTalesThumbnails);
        }, 2000);
      });
    },
    [],
  );

  const talesMetadataOptions = useMemo(() => {
    const queryKey = ['tales-md', userId];
    return queryOptions({
      queryKey,
      queryFn: talesMetadataQueryFn,
      networkMode: 'online',
      enabled: true,
      gcTime: 1000 * 60 * 5,
      staleTime: Infinity,
    });
  }, [userId, talesMetadataQueryFn]);

  const { data: talesMetadata } = useQuery(talesMetadataOptions);

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
                uri: avatarUri,
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
          <Text style={styles.bannerInfoText}>{userInfo.user?.handle}</Text>
        </View>
      </View>

      {userId === userInfo.user?.id ? (
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

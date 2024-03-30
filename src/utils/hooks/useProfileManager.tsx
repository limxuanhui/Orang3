import { useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { QueryKey, queryOptions, useQuery } from '@tanstack/react-query';
import { ProfileScreenNavigationProp } from '@screens/profile/types/types';
import { FeedMetadata, FeedThumbnailInfo } from '@components/feed/types/types';
import { TaleMetadata, TaleThumbnailInfo } from '@components/tale/types/types';
import { DUMMY_DATABASE } from '@data/database';
import { DataKey } from '@data/types/types';
import { GypsieUser } from '@navigators/types/types';
import { axiosClient } from '@helpers/singletons';
import useGlobals from '@hooks/useGlobals';

const useProfileManager = (user: GypsieUser) => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const { mode } = useGlobals();

  const onPressAvatar = useCallback(() => {
    if (user.avatar) {
      navigation.push('Modal', {
        screen: 'Avatar',
        params: { avatarUri: user.avatar.uri },
      });
    }
  }, [navigation, user.avatar]);

  const onPressSettings = useCallback(() => {
    navigation.push('Settings');
  }, [navigation]);

  const feedsMetadataQueryFn = useCallback(
    async ({
      queryKey,
    }: {
      queryKey: QueryKey;
    }): Promise<FeedThumbnailInfo[]> => {
      const [key, key1, key2, uid] = queryKey;
      console.log('Refreshing queryKey: ', queryKey);
      switch (mode) {
        case 'production':
          try {
            const url = `/${key}/${key1}/${key2}/${uid}`;
            const response = await axiosClient.get(url);
            return response.data.items.map((el: FeedMetadata) => ({
              feedId: el.id,
              creator: el.creator,
              media: el.thumbnail,
            }));
          } catch (err) {
            console.error(err);
            return [];
          }
        case 'development':
          return new Promise((resolve, _reject) => {
            const feedsThumbnails: FeedThumbnailInfo[] = DUMMY_DATABASE[
              key as DataKey
            ] as FeedThumbnailInfo[];
            const userfeedsThumbnails: FeedThumbnailInfo[] =
              feedsThumbnails.filter(
                (el: FeedThumbnailInfo) => el.creator.id === uid,
              );
            setTimeout(() => {
              resolve(userfeedsThumbnails);
            }, 2000);
          });
        default:
          return [];
      }
    },
    [mode],
  );

  const feedsMetadataOptions = useMemo(() => {
    const queryKey = ['feeds', 'user', 'metadata', user.id];
    return queryOptions({
      queryKey,
      queryFn: feedsMetadataQueryFn,
      networkMode: 'online',
      enabled: true,
      gcTime: 1000 * 60 * 5,
      staleTime: Infinity,
      // select: (data: FeedMetadata[]) => {
      //   return data.map((el: FeedMetadata) => {
      //     return { feedId: el.id, creator: el.creator, media: el.thumbnail };
      //   });
      // },
    });
  }, [feedsMetadataQueryFn, user.id]);

  const { data: feedsMetadata } = useQuery(feedsMetadataOptions);

  const talesMetadataQueryFn = useCallback(
    async ({
      queryKey,
    }: {
      queryKey: QueryKey;
    }): Promise<TaleThumbnailInfo[]> => {
      const [key, key1, key2, uid] = queryKey;
      console.log('Refreshing queryKey: ', queryKey);
      switch (mode) {
        case 'production':
          try {
            const url = `/${key}/${key1}/${key2}/${uid}`;
            const response = await axiosClient.get(url);
            return response.data.items.map((el: TaleMetadata) => ({
              taleId: el.id,
              creator: el.creator,
              thumbnail: el.thumbnail,
              title: el.title,
            }));
          } catch (err) {
            console.error(err);
            return [];
          }
        case 'development':
          return new Promise((resolve, _reject) => {
            const talesThumbnails: TaleThumbnailInfo[] = DUMMY_DATABASE[
              key as DataKey
            ] as TaleThumbnailInfo[];
            const userTalesThumbnails: TaleThumbnailInfo[] =
              talesThumbnails.filter(
                (el: TaleThumbnailInfo) => el.creator.id === uid,
              );
            setTimeout(() => {
              resolve(userTalesThumbnails);
            }, 2000);
          });
        default:
          return [];
      }
    },
    [mode],
  );

  const talesMetadataOptions = useMemo(() => {
    const queryKey = ['tales', 'user', 'metadata', user.id];
    return queryOptions({
      queryKey,
      queryFn: talesMetadataQueryFn,
      networkMode: 'online',
      enabled: true,
      gcTime: 1000 * 60 * 5,
      staleTime: Infinity,
    });
  }, [talesMetadataQueryFn, user.id]);

  const { data: talesMetadata } = useQuery(talesMetadataOptions);

  return { feedsMetadata, talesMetadata, onPressAvatar, onPressSettings };
};

export default useProfileManager;

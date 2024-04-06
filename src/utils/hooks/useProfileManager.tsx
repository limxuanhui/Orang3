import { useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { QueryKey, queryOptions, useQuery } from '@tanstack/react-query';
import { ProfileScreenNavigationProp } from '@screens/profile/types/types';
import { FeedMetadata, FeedThumbnailInfo } from '@components/feed/types/types';
import { TaleMetadata } from '@components/tale/types/types';
import { GypsieUser } from '@navigators/types/types';
import { axiosClient } from '@helpers/singletons';
import useGlobals from '@hooks/useGlobals';
import { urlFactory } from '@helpers/factory';
import { DataKey } from '@data/types/types';

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
    }): Promise<FeedThumbnailInfo[] | null> => {
      const [dKey, uId] = queryKey;
      const key = dKey as DataKey;
      const id = uId as string;
      console.log('Refreshing queryKey: ', queryKey);
      switch (mode) {
        case 'production':
          try {
            const url = urlFactory(key, { id });
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
        case 'testing':
          return null;
        case 'development':
          return null;
        default:
          return null;
      }
    },
    [mode],
  );

  const feedsMetadataOptions = useMemo(() => {
    const queryKey = ['feeds-metadata-by-userid', user.id];
    return queryOptions({
      queryKey,
      queryFn: feedsMetadataQueryFn,
      networkMode: 'online',
      enabled: true,
      gcTime: 1000 * 60 * 5,
      staleTime: Infinity,
    });
  }, [feedsMetadataQueryFn, user.id]);

  const { data: feedsMetadata } = useQuery(feedsMetadataOptions);

  const talesMetadataQueryFn = useCallback(
    async ({
      queryKey,
    }: {
      queryKey: QueryKey;
    }): Promise<TaleMetadata[] | null> => {
      const [dKey, uId] = queryKey;
      const key = dKey as DataKey;
      const id = uId as string;
      console.log('Refreshing queryKey: ', queryKey);
      switch (mode) {
        case 'production':
          try {
            const url = urlFactory(key, { id });
            const response = await axiosClient.get(url);
            return response.data.items;
          } catch (err) {
            console.error(err);
            return [];
          }
        case 'testing':
          return null;
        case 'development':
          return null;
        default:
          return null;
      }
    },
    [mode],
  );

  const talesMetadataOptions = useMemo(() => {
    const queryKey = ['tales-metadata-by-userid', user.id];
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

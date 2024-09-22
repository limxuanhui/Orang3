import { useCallback, useContext, useEffect, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { type ProfileScreenNavigationProp } from '@screens/profile/types/types';
import {
  ModalNavigatorNavigationProp,
  type GypsieUser,
} from '@navigators/types/types';
import { type TaleMetadata } from '@components/tale/types/types';
import { type FeedMetadata } from '@components/feed/types/types';
import useInfiniteDataManager from '@hooks/useInfiniteDataManager';
import { AuthContext } from '@contexts/AuthContext';
import { getImageUrl } from '@helpers/functions';

const useProfileManager = (user: GypsieUser) => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const modalNavigation = useNavigation<ModalNavigatorNavigationProp>();
  const { user: currentUser } = useContext(AuthContext);
  const userIsProfileOwner = user.id === currentUser?.id;
  const avatarThumbnailUri: string = useMemo(
    () => getImageUrl(user.avatar?.uri as string, 'thumbnail'),
    [user.avatar?.uri],
  );
  const avatarRawUri: string = useMemo(
    () => getImageUrl(user.avatar?.uri as string, 'raw'),
    [user.avatar?.uri],
  );

  const onPressAvatar = useCallback(() => {
    if (user.avatar) {
      navigation.push('Modal', {
        screen: 'Avatar',
        params: { avatarUri: avatarRawUri },
      });
    }
  }, [avatarRawUri, navigation, user.avatar]);

  const onPressEditProfile = useCallback(() => {
    if (user) {
      modalNavigation.push('Modal', {
        screen: 'EditProfile',
        params: { user },
      });
    }
  }, [modalNavigation, user]);

  const onPressSettings = useCallback(() => {
    modalNavigation.push('Modal', { screen: 'Settings' });
  }, [modalNavigation]);

  const { data: feedsMetadata, onRefresh: onRefreshFeedsMetadata } =
    useInfiniteDataManager<FeedMetadata[]>(
      'feeds-metadata-by-userid',
      user.id,
      { gcTime: 0, staleTime: Infinity },
    );
  const { data: talesMetadata, onRefresh: onRefreshTalesMetadata } =
    useInfiniteDataManager<TaleMetadata[]>('tales-metadata-by-userid', user.id);

  useEffect(() => {
    if (userIsProfileOwner) {
      navigation.setParams({ user: currentUser });
    }
  }, [currentUser, navigation, userIsProfileOwner]);

  return {
    avatarThumbnailUri,
    userIsProfileOwner,
    feedsMetadata: feedsMetadata?.pages[0].items,
    talesMetadata: talesMetadata?.pages[0].items,
    onRefreshFeedsMetadata,
    onRefreshTalesMetadata,
    onPressAvatar,
    onPressEditProfile,
    onPressSettings,
  };
};

export default useProfileManager;

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
import useDataManager from './useDataManager';

const useProfileManager = (userId: string) => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const modalNavigation = useNavigation<ModalNavigatorNavigationProp>();
  const { user: currentUser } = useContext(AuthContext);
  const userIsProfileOwner = userId === currentUser?.id;
  const { data: userMetadata } = useDataManager<GypsieUser>(
    'user-by-userid',
    userId,
  );
  const avatarThumbnailUri: string = useMemo(() => {
    if (userMetadata) {
      return getImageUrl(userMetadata.avatar?.uri as string, 'thumbnail');
    }
    return '';
  }, [userMetadata]);
  const avatarRawUri: string = useMemo(() => {
    if (userMetadata) {
      return getImageUrl(userMetadata.avatar?.uri as string, 'raw');
    }
    return '';
  }, [userMetadata]);

  const onPressAvatar = useCallback(() => {
    if (userMetadata) {
      navigation.push('Modal', {
        screen: 'Avatar',
        params: { avatarUri: avatarRawUri },
      });
    }
  }, [avatarRawUri, navigation, userMetadata]);

  const onPressEditProfile = useCallback(() => {
    console.log('Triggered pressEditProfile: ', userMetadata);
    if (userId) {
      console.log('Navigating to edit profile screen');
      modalNavigation.push('Modal', {
        screen: 'EditProfile',
        params: { user: userMetadata as GypsieUser },
      });
    }
  }, [modalNavigation, userId, userMetadata]);

  const onPressSettings = useCallback(() => {
    modalNavigation.push('Modal', { screen: 'Settings' });
  }, [modalNavigation]);

  const {
    data: feedsMetadata,
    error: feedsMetadataError,
    isError: feedsMetadataIsError,
    onRefresh: onRefreshFeedsMetadata,
  } = useInfiniteDataManager<FeedMetadata[]>(
    'feeds-metadata-by-userid',
    userId,
  );
  const {
    data: talesMetadata,
    error: talesMetadataError,
    isError: talesMetadataIsError,
    onRefresh: onRefreshTalesMetadata,
  } = useInfiniteDataManager<TaleMetadata[]>(
    'tales-metadata-by-userid',
    userId,
  );

  useEffect(() => {
    if (userId) {
      navigation.setParams({ userId });
    }
  }, [navigation, userId]);

  return {
    avatarThumbnailUri,
    userMetadata,
    userIsProfileOwner,
    feedsMetadata: feedsMetadata?.pages[0].items,
    feedsMetadataError,
    feedsMetadataIsError,
    talesMetadata: talesMetadata?.pages[0].items,
    talesMetadataError,
    talesMetadataIsError,
    onRefreshFeedsMetadata,
    onRefreshTalesMetadata,
    onPressAvatar,
    onPressEditProfile,
    onPressSettings,
  };
};

export default useProfileManager;

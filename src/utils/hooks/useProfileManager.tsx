import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { type ProfileScreenNavigationProp } from '@screens/profile/types/types';
import { type GypsieUser } from '@navigators/types/types';
import { type TaleMetadata } from '@components/tale/types/types';
import { type FeedMetadata } from '@components/feed/types/types';
import useInfiniteDataManager from '@hooks/useInfiniteDataManager';

const useProfileManager = (user: GypsieUser) => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

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

  const { data: feedsMetadata, onRefresh: onRefreshFeedsMetadata } =
    useInfiniteDataManager<FeedMetadata[]>(
      'feeds-metadata-by-userid',
      user.id,
      { gcTime: 0, staleTime: Infinity },
    );
  const { data: talesMetadata, onRefresh: onRefreshTalesMetadata } =
    useInfiniteDataManager<TaleMetadata[]>('tales-metadata-by-userid', user.id);

  return {
    feedsMetadata: feedsMetadata?.pages[0].items,
    talesMetadata: talesMetadata?.pages[0].items,
    onRefreshFeedsMetadata,
    onRefreshTalesMetadata,
    onPressAvatar,
    onPressSettings,
  };
};

export default useProfileManager;

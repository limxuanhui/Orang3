import { useCallback, useContext, useEffect, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ImagePickerResponse } from 'react-native-image-picker';
import type { AxiosResponse } from 'axios';
import { nanoid } from '@reduxjs/toolkit';
import type {
  GypsieUser,
  ModalNavigatorNavigationProp,
} from '@navigators/types/types';
import type { Media, MediaMimeType } from '@components/feed/types/types';
import useKeyboardHandlers from '@hooks/useKeyboardHandlers';
import useMediaHandlers from '@hooks/useMediaHandlers';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import {
  editProfile_initProfile,
  editProfile_resetEditProfileSlice,
  editProfile_setAvatar,
  editProfile_setBio,
  editProfile_setHandle,
  editProfile_setName,
  editProfile_setSaving,
} from '@redux/reducers/editProfileSlice';
import {
  getBlobsFromLocalUris,
  getImageUrl,
  getPresignedUrls,
  UploadMediaDetails,
  uploadMediaFiles,
} from '@helpers/functions';
import useAxiosManager from '@hooks/useAxiosManager';
import { keyFactory, urlFactory } from '@helpers/factory';
import { AuthContext } from '@contexts/AuthContext';
import Toast from 'react-native-toast-message';
import { TOAST_TITLE_STYLE } from '@constants/constants';
import { queryClient } from '@helpers/singletons';

const CANNOT_UPDATE_NAME_YET_ERROR: string =
  'You may only update your name every 7 days';
const CANNOT_UPDATE_HANDLE_YET_ERROR: string =
  'You may only update your handle every 30 days';
const ONE_DAY_MS: number = 1000 * 60 * 60 * 24;

const useEditProfileManager = (user: GypsieUser) => {
  const navigation = useNavigation<ModalNavigatorNavigationProp>();
  const { refreshUserData } = useContext(AuthContext);
  const { closeKeyboard } = useKeyboardHandlers();
  const { axiosPrivate } = useAxiosManager();
  const { openGallery } = useMediaHandlers({
    mediaType: 'photo',
    selectionLimit: 1,
    presentationStyle: 'fullScreen',
  });
  const dispatch = useAppDispatch();
  const { avatar, name, handle, bio, saving } = useAppSelector(
    state => state.editProfile,
  );
  const originalAvatarUri: string = useMemo(
    () => getImageUrl(user.avatar?.uri as string, 'thumbnail'),
    [user.avatar?.uri],
  );
  const canEditName: boolean =
    !user.lastUpdatedNameAt ||
    Date.parse(user.lastUpdatedNameAt) + ONE_DAY_MS * 7 < Date.now();
  const canEditHandle: boolean =
    !user.lastUpdatedHandleAt ||
    Date.parse(user.lastUpdatedHandleAt) + ONE_DAY_MS * 30 < Date.now();
  const avatarChanged: boolean = avatar?.id !== user.avatar?.id;
  const nameChanged: boolean = name !== user.name;
  const handleChanged: boolean = handle !== user.handle;
  const bioChanged: boolean = bio !== user.bio;
  const edited: boolean =
    avatarChanged || nameChanged || handleChanged || bioChanged;
  const saveButtonIsDisabled: boolean = !edited || saving;

  const onPressChangeAvatar = useCallback(async () => {
    const assetsResponse: ImagePickerResponse = await openGallery();
    if (assetsResponse.didCancel) {
      return;
    }

    if (assetsResponse.assets && assetsResponse.assets.length > 0) {
      const selectedAvatar = assetsResponse.assets[0];
      const newAvatar: Media = {
        id: nanoid(),
        type: selectedAvatar.type as MediaMimeType,
        height: selectedAvatar.height as number,
        width: selectedAvatar.width as number,
        uri: selectedAvatar.uri as string,
      };

      dispatch(editProfile_setAvatar({ avatar: newAvatar }));
    }
  }, [dispatch, openGallery]);

  const onNameChange = useCallback(
    (text: string) => {
      dispatch(editProfile_setName({ name: text }));
    },
    [dispatch],
  );

  const onHandleChange = useCallback(
    (text: string) => {
      dispatch(editProfile_setHandle({ handle: text }));
    },
    [dispatch],
  );

  const onBioChange = useCallback(
    (text: string) => {
      dispatch(editProfile_setBio({ bio: text }));
    },
    [dispatch],
  );

  const onSaveChanges = useCallback(async () => {
    dispatch(editProfile_setSaving({ saving: true }));
    closeKeyboard();

    if (!edited) {
      navigation.goBack();
      return;
    }

    // Send request to save
    const requestData = {
      userId: user.id,
      avatar: avatarChanged ? avatar : null,
      name: nameChanged ? name : null,
      handle: handleChanged ? handle : null,
      bio: bioChanged ? bio : null,
    };

    // Upload avatar if changed
    if (avatar && avatarChanged) {
      const blobs = await getBlobsFromLocalUris([avatar.uri]);
      const uploadMediaDetailsList: UploadMediaDetails[] =
        await getPresignedUrls([avatar.type]);
      if (blobs.length !== uploadMediaDetailsList.length) {
        return;
      }
      const presignedUrl: string = uploadMediaDetailsList[0].presignedUrl;
      const key: string = uploadMediaDetailsList[0].key;
      const keyWithoutExt: string = key.split('.')[0];
      const keyUuid: string = keyWithoutExt.split('/')[1];

      const uploadMediaFilesResponse: AxiosResponse[] | null =
        await uploadMediaFiles([presignedUrl], blobs);

      if (!(uploadMediaFilesResponse && uploadMediaFilesResponse[0].status)) {
        return;
      }

      requestData.avatar = {
        ...avatar,
        id: keyUuid,
        uri: key,
      };
    }

    try {
      const response = await axiosPrivate.put(
        urlFactory('user-edit-profile'),
        requestData,
      );

      refreshUserData(response.data);
    } catch (err: any) {
      Toast.show({
        type: 'error',
        swipeable: true,
        text1: err?.response.data,
        text1Style: TOAST_TITLE_STYLE,
      });
      dispatch(editProfile_setSaving({ saving: false }));
      return;
    }

    await queryClient.invalidateQueries({
      queryKey: keyFactory('user-by-userid', user.id),
    });
    dispatch(editProfile_setSaving({ saving: false }));
    navigation.goBack();
  }, [
    avatar,
    avatarChanged,
    axiosPrivate,
    bio,
    bioChanged,
    closeKeyboard,
    dispatch,
    edited,
    handle,
    handleChanged,
    name,
    nameChanged,
    navigation,
    refreshUserData,
    user,
  ]);

  useEffect(() => {
    if (user) {
      dispatch(editProfile_initProfile({ user }));
    }

    return () => {
      dispatch(editProfile_resetEditProfileSlice());
    };
  }, [dispatch, user]);

  return {
    avatar,
    name,
    handle,
    bio,
    saveButtonIsDisabled,
    saving,
    originalAvatarUri,
    avatarChanged,
    canEditName,
    cannotEditNameError: CANNOT_UPDATE_NAME_YET_ERROR,
    canEditHandle,
    cannotEditHandleError: CANNOT_UPDATE_HANDLE_YET_ERROR,
    onPressChangeAvatar,
    onNameChange,
    onHandleChange,
    onBioChange,
    onSaveChanges,
  };
};

export default useEditProfileManager;

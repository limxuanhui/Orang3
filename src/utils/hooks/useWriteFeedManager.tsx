import { useCallback, useContext, useEffect, useState } from 'react';
import { Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import { v4 as uuidv4 } from 'uuid';
import { ulid } from 'ulid';
import { AxiosResponse } from 'axios';
import { Feed, FeedItem } from '@components/feed/types/types';
import type { ModalNavigatorNavigationProp } from '@components/navigators/types/types';
import useModalHandlers from '@hooks/useModalHandlers';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import {
  writeFeed_addItems,
  writeFeed_deleteItemById,
  writeFeed_editCaption,
  writeFeed_resetWriteFeedSlice,
  writeFeed_setPosting,
} from '@redux/reducers/writeFeedSlice';
import { AuthContext } from '@contexts/AuthContext';
import {
  UploadMediaDetails,
  getBlobsFromLocalUris,
  getPresignedUrls,
  uploadMediaFiles,
} from '@helpers/functions';
// import { BACKEND_BASE_URL } from '@env';
import { axiosClient, queryClient } from '@helpers/singletons';
import { useMutation } from '@tanstack/react-query';

const imageLibraryOptions: ImageLibraryOptions = {
  mediaType: 'mixed',
  presentationStyle: 'fullScreen',
  selectionLimit: 10,
};

const useWriteFeedManager = () => {
  const { user } = useContext(AuthContext);
  const { modalIsOpen, closeModal, openModal } = useModalHandlers();
  const navigation = useNavigation<ModalNavigatorNavigationProp>();
  const [captionWritten, setCaptionWritten] = useState<string>('');
  const {
    items,
    selectedItemId: currIndex,
    posting,
  } = useAppSelector(state => state.writeFeed);
  const dispatch = useAppDispatch();

  const openGallery = useCallback(async () => {
    await launchImageLibrary(imageLibraryOptions, res => {
      let newFeedItems = [];
      if (res.assets) {
        newFeedItems = res.assets.map(el => {
          return {
            id: ulid(),
            media: {
              id: uuidv4(),
              type: el.type,
              uri: el.uri,
              height: el.height,
              width: el.width,
            },
            caption: '',
          } as FeedItem;
        });
        dispatch(writeFeed_addItems({ id: currIndex, items: newFeedItems }));
        console.log(JSON.stringify(newFeedItems, null, 4));
      }
    });
  }, [currIndex, dispatch]);

  const onChangeCaption = useCallback(
    (text: string) => {
      setCaptionWritten(text);
    },
    [setCaptionWritten],
  );

  const onPressAdd = useCallback(() => {
    openGallery();
  }, [openGallery]);

  const onPressDelete = useCallback(() => {
    dispatch(writeFeed_deleteItemById(currIndex));
  }, [currIndex, dispatch]);

  const onDismissEditCaption = useCallback(() => {
    setCaptionWritten(items[currIndex]?.caption || '');
    closeModal();
  }, [items, currIndex, closeModal, setCaptionWritten]);

  const onPressEdit = useCallback(() => {
    openModal();
  }, [openModal]);

  const onSaveEditCaption = useCallback(() => {
    Keyboard.dismiss();
    dispatch(writeFeed_editCaption({ id: currIndex, caption: captionWritten }));
    closeModal();
  }, [captionWritten, currIndex, closeModal, dispatch]);

  const onPressPost = useCallback(async () => {
    dispatch(writeFeed_setPosting(true));
    if (!user) {
      dispatch(writeFeed_setPosting(false));
      return;
    }

    console.warn('Posting!');
    const url = '/feeds/new';

    // For new feed
    const blobs = await getBlobsFromLocalUris(items.map(el => el.media.uri));
    const uploadMediaDetailsList: UploadMediaDetails[] = await getPresignedUrls(
      items.map(el => el.media.type),
    );
    if (blobs.length !== uploadMediaDetailsList.length) {
      return;
    }
    const presignedUrls = uploadMediaDetailsList.map(el => el.presignedUrl);
    const keys = uploadMediaDetailsList.map(el => el.key);

    const uploadMediaFilesResponse: AxiosResponse[] | null =
      await uploadMediaFiles(presignedUrls, blobs);

    // If success from Promise.all, proceed, else try to check for uploaded media files, and delete them.
    if (uploadMediaFilesResponse) {
      console.log(JSON.stringify(uploadMediaFilesResponse[0].status, null, 4));
    }

    // Success in uploading all media files, dispatch to save the new media file names
    const newFeedId: string = ulid();
    const feedData: FeedItem[] = items.map((el: FeedItem, index: number) => {
      const isVideo = el.media.type.startsWith('video');
      return {
        ...el,
        media: { ...el.media, uri: keys[index] },
        thumbnail: {
          ...el.media,
          type: isVideo ? 'image/gif' : el.media.type,
          uri: isVideo ? `${keys[index].split('.')[0]}.gif` : keys[index],
          width: 200,
          height: (el.media.height / el.media.width) * 200,
        },
        feedId: newFeedId,
      };
    });
    const thumbnailSrc = feedData[0];
    const requestData: Feed = {
      metadata: {
        id: newFeedId,
        creator: user,
        thumbnail: thumbnailSrc.thumbnail,
      },
      feedItems: feedData,
    };
    console.log(
      'Feed data to be saved in backend:',
      JSON.stringify(requestData, null, 4),
    );

    // Upload feed to backend url at /api/v1/feeds with axios.post (or axios.put/patch)
    const uploadMetadataResponse = await axiosClient.post(url, requestData);
    console.log(
      'Metadata response: ',
      JSON.stringify(uploadMetadataResponse, null, 4),
    );

    // If success in uploading feed, proceed
    // Else try to try to check for uploaded media files, and delete them.

    // Dispatch resetWriteFeedSlice, invalidate query cache for feeds, feeds-md, then go back to previous screen
    dispatch(writeFeed_setPosting(false));
    dispatch(writeFeed_resetWriteFeedSlice());
    await queryClient.invalidateQueries({ queryKey: ['feeds'] });
    navigation.goBack();
  }, [items, navigation, user, dispatch]);

  const { mutate } = useMutation({
    mutationFn: onPressPost,
  });

  useEffect(() => {
    setCaptionWritten(items[currIndex]?.caption || '');
  }, [currIndex, items, setCaptionWritten]);

  return {
    captionWritten,
    modalIsOpen,
    posting,
    closeModal,
    openModal,
    onChangeCaption,
    onDismissEditCaption,
    onPressAdd,
    onPressDelete,
    onPressEdit,
    onPressPost: mutate,
    onSaveEditCaption,
  };
};

export default useWriteFeedManager;

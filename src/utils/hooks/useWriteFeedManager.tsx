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
  writeFeed_initFeed,
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
import { axiosClient, queryClient } from '@helpers/singletons';
import { useMutation } from '@tanstack/react-query';
import useDataManager from '@hooks/useDataManager';
import { NEW_FEED_URL } from '@constants/urls';

const imageLibraryOptions: ImageLibraryOptions = {
  mediaType: 'mixed',
  presentationStyle: 'fullScreen',
  selectionLimit: 10,
};

const useWriteFeedManager = (feedId?: string) => {
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

  const createNewFeed = useCallback(async () => {
    if (!user) {
      return;
    }

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
    try {
      const uploadMetadataResponse = await axiosClient.post(
        NEW_FEED_URL,
        requestData,
      );
      console.log(
        'Metadata response: ',
        JSON.stringify(uploadMetadataResponse, null, 4),
      );
    } catch (err) {
      console.error(err);
      return;
    }

    // If success in uploading feed, proceed
    // Else try to try to check for uploaded media files, and delete them.
  }, [items, user]);

  const updateExistingFeed = useCallback(async () => {
    if (!user) {
      return;
    }

    // compare each object in write feed state

    // items, posting, selectedItemId, mode
    // we only need to check items array
    // how will we check items array for changes?
    // we need original array, and keep track of changes
    // (possibly in a custom itemsChange array, where each itemChange object consists of the object id, action performed, resource update),
    // in this updateExistingFeed function

    // ADD feed item action: push new feed item into array -> trigger reorder
    // DELETE feed item action: remove feed item from array -> trigger reorder
    // UPDATE feed item media: change the uri of the feed item media and thumbnail
    // UPDATE feed item caption action: change the caption of the feed item
  }, [user]);

  const onPressPost = useCallback(async () => {
    dispatch(writeFeed_setPosting(true));
    console.warn('Posting!');

    if (feedId) {
      updateExistingFeed();
    } else {
      createNewFeed();
    }

    // Dispatch resetWriteFeedSlice, invalidate query cache for feeds, feeds-md, then go back to previous screen
    dispatch(writeFeed_setPosting(false));
    dispatch(writeFeed_resetWriteFeedSlice());
    await queryClient.invalidateQueries({ queryKey: ['feeds'] });
    navigation.goBack();
  }, [dispatch, feedId, navigation, updateExistingFeed, createNewFeed]);

  const { mutate } = useMutation({
    mutationFn: onPressPost,
  });

  const { data, isLoading } = useDataManager<Feed>('feeds', feedId);

  useEffect(() => {
    if (data) {
      dispatch(writeFeed_initFeed({ items: data.feedItems }));
    }
  }, [data, dispatch]);

  useEffect(() => {
    setCaptionWritten(items[currIndex]?.caption || '');
  }, [currIndex, items, setCaptionWritten]);

  return {
    data,
    isLoading,
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

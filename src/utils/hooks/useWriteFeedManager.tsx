import { useCallback, useContext, useEffect, useState } from 'react';
import { Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  Asset,
  ImageLibraryOptions,
  ImagePickerResponse,
} from 'react-native-image-picker';
import { ulid } from 'ulid';
import { AxiosResponse } from 'axios';
import {
  Feed,
  FeedItem,
  FeedMetadata,
  UpdateFeedDto,
} from '@components/feed/types/types';
import type { ModalNavigatorNavigationProp } from '@components/navigators/types/types';
import useModalHandlers from '@hooks/useModalHandlers';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import {
  writeFeed_addItems,
  writeFeed_deleteItemById,
  writeFeed_editCaption,
  writeFeed_initFeed,
  writeFeed_reorderFeedItems,
  writeFeed_resetWriteFeedSlice,
  writeFeed_setPosting,
  writeFeed_setSelectedItemId,
  writeFeed_updateModified,
} from '@redux/reducers/writeFeedSlice';
import { AuthContext } from '@contexts/AuthContext';
import {
  UploadMediaDetails,
  getBlobsFromLocalUris,
  getPresignedUrls,
  printPrettyJson,
  uploadMediaFiles,
} from '@helpers/functions';
import { queryClient } from '@helpers/singletons';
import { useMutation } from '@tanstack/react-query';
import useDataManager from '@hooks/useDataManager';
import { MEDIA_THUMBNAIL_MAX_WIDTH } from '@constants/constants';
import { keyFactory, urlFactory } from '@helpers/factory';
import useMediaHandlers from './useMediaHandlers';
import { nanoid } from '@reduxjs/toolkit';
import useAxiosManager from './useAxiosManager';

const imageLibraryOptions: ImageLibraryOptions = {
  mediaType: 'mixed',
  presentationStyle: 'fullScreen',
  selectionLimit: 10,
};

const useWriteFeedManager = (feedId?: string) => {
  const { user } = useContext(AuthContext);
  const { axiosPrivate } = useAxiosManager();
  const { modalIsOpen, closeModal, openModal } = useModalHandlers();
  const { openGallery } = useMediaHandlers(imageLibraryOptions);
  const navigation = useNavigation<ModalNavigatorNavigationProp>();
  const [captionWritten, setCaptionWritten] = useState<string>('');
  const dispatch = useAppDispatch();
  const {
    metadata,
    items,
    selectedItemId: currIndex,
    posting,
    changes,
  } = useAppSelector(state => state.writeFeed);
  const { data, isLoading } = useDataManager<Feed>('feed-by-feedid', feedId);

  const onChangeCaption = useCallback(
    (text: string) => {
      setCaptionWritten(text);
    },
    [setCaptionWritten],
  );

  const onPressAdd = useCallback(async () => {
    const assetsResponse: ImagePickerResponse = await openGallery();
    if (assetsResponse.didCancel) {
      return;
    }

    let newFeedItems: FeedItem[];
    if (assetsResponse.assets && assetsResponse.assets.length > 0) {
      newFeedItems = assetsResponse.assets.map((el: Asset) => {
        return {
          id: ulid(),
          media: {
            id: nanoid(), // temporary id
            type: el.type,
            uri: el.uri,
            height: el.height,
            width: el.width,
          },
          caption: '',
          feedId,
        } as FeedItem;
      });
      dispatch(writeFeed_addItems({ id: currIndex, items: newFeedItems }));
      dispatch(writeFeed_reorderFeedItems());
      dispatch(writeFeed_updateModified());
      if (!(currIndex === 0 && items.length === 0)) {
        dispatch(writeFeed_setSelectedItemId({ id: currIndex + 1 }));
      }
    }
  }, [currIndex, dispatch, feedId, items.length, openGallery]);

  const onPressDelete = useCallback(() => {
    const deleteIndex = currIndex;
    if (currIndex === items.length - 1) {
      dispatch(
        writeFeed_setSelectedItemId({ id: Math.max(items.length - 2, 0) }),
      );
    }

    dispatch(writeFeed_deleteItemById({ id: deleteIndex }));
    dispatch(writeFeed_reorderFeedItems());
    dispatch(writeFeed_updateModified());
  }, [currIndex, dispatch, items.length]);

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
      console.log(JSON.stringify(uploadMediaFilesResponse, null, 4));
    }

    // Success in uploading all media files, dispatch to save the new media file names
    const newFeedId: string = ulid();
    const feedData: FeedItem[] = items.map((el: FeedItem, index: number) => {
      const isVideo = el.media.type.startsWith('video');
      // e.g. key: images/ceba4430-5436-4aec-9746-37c3e781f147.jpg
      const key = keys[index];
      const keyWithoutExt = key.split('.')[0];
      const keyUuid = keyWithoutExt.split('/')[1];

      return {
        ...el,
        media: { ...el.media, id: keyUuid, uri: key },
        thumbnail: {
          id: keyUuid,
          type: isVideo ? 'image/gif' : el.media.type,
          uri: isVideo ? `${keyWithoutExt}.gif` : key,
          width: MEDIA_THUMBNAIL_MAX_WIDTH,
          height:
            (el.media.height / el.media.width) * MEDIA_THUMBNAIL_MAX_WIDTH,
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
        taleId: '',
      },
      feedItems: feedData,
    };

    console.log('====== Create feed ======');
    printPrettyJson(requestData);
    try {
      const uploadMetadataResponse = await axiosPrivate.post(
        urlFactory('feed-new'),
        requestData,
      );
      console.log('Upload metadata response: ', uploadMetadataResponse.status);
    } catch (err) {
      console.error(err);
      return;
    }

    // If success in uploading feed, proceed
    // Else try to try to check for uploaded media files, and delete them.
  }, [axiosPrivate, items, user]);

  const updateExistingFeed = useCallback(async () => {
    if (!user || !feedId) {
      return;
    }

    switch (changes.type) {
      case 'NONE':
        return;
      case 'ONLY_CAPTIONS':
        try {
          // exclude isRemote property when sending to backend
          const modifiedFeedData: FeedItem[] = changes.modified.map(
            (el: FeedItem, index: number) => {
              return {
                id: el.id,
                media: el.media,
                thumbnail: el.thumbnail,
                caption: el.caption,
                feedId: el.feedId,
                order: el.order || index,
              };
            },
          );
          const requestData = {
            metadata: null,
            modified: modifiedFeedData,
            deleted: [],
          };
          const response = await axiosPrivate.put(
            urlFactory('feed-edit'),
            requestData,
          );

          console.log('Upload modified feeds response: ', response.status);

          await queryClient.invalidateQueries({
            queryKey: keyFactory('feed-by-feedid', changes.modified[0].feedId),
          });
        } catch (err) {
          console.error(err);
          return;
        }
        break;
      case 'MUTATE':
        // [1,(2),3,(4),5] ---> [2,4]
        const newlyAddedFeedItems: FeedItem[] = changes.modified.filter(
          (el: FeedItem) => {
            return !el.isRemote;
          },
        );
        const blobs: Blob[] = await getBlobsFromLocalUris(
          newlyAddedFeedItems.map((el: FeedItem) => el.media.uri),
        );
        const uploadMediaDetailsList: UploadMediaDetails[] =
          await getPresignedUrls(
            newlyAddedFeedItems.map((el: FeedItem) => el.media.type),
          );
        if (blobs.length !== uploadMediaDetailsList.length) {
          return;
        }
        const presignedUrls = uploadMediaDetailsList.map(el => el.presignedUrl);
        const keys = uploadMediaDetailsList.map(el => el.key);

        const uploadMediaFilesResponse: AxiosResponse[] | null =
          await uploadMediaFiles(presignedUrls, blobs);
        uploadMediaFilesResponse?.forEach((el, index) =>
          console.log(`Upload item ${index} status ${el.status}`),
        );

        const modifiedFeedItems: FeedItem[] = changes.modified.map(
          (el: FeedItem) => {
            const isVideo = el.media.type.startsWith('video');
            if (el.isRemote) {
              return el;
            }
            const changedIndex = newlyAddedFeedItems.findIndex(
              item => item.id === el.id,
            );
            const key = keys[changedIndex];
            const keyWithoutExt = key.split('.')[0];
            const keyUuid = keyWithoutExt.split('/')[1];
            return {
              ...el,
              media: {
                ...el.media,
                id: keyUuid,
                uri: key,
              },
              thumbnail: {
                id: keyUuid,
                type: isVideo ? 'image/gif' : el.media.type,
                uri: isVideo ? `${keyWithoutExt}.gif` : key,
                width: MEDIA_THUMBNAIL_MAX_WIDTH,
                height:
                  (el.media.height / el.media.width) *
                  MEDIA_THUMBNAIL_MAX_WIDTH,
              },
            };
          },
        );

        // check if feed thumbnail (first feed item) has changed
        const feedThumbnailChanged: boolean =
          modifiedFeedItems[0].thumbnail.id !== data?.metadata.thumbnail.id;

        let modifiedFeedMetadata: FeedMetadata | null = null;
        if (feedThumbnailChanged) {
          modifiedFeedMetadata = {
            ...metadata,
            thumbnail: modifiedFeedItems[0].thumbnail,
          };
        }

        const requestData: UpdateFeedDto = {
          metadata: modifiedFeedMetadata,
          modified: modifiedFeedItems,
          deleted: changes.deleted,
        };

        try {
          const uploadMetadataResponse = await axiosPrivate.put(
            urlFactory('feed-edit'),
            requestData,
          );
          console.log(
            'Upload metadata response: ',
            uploadMetadataResponse.status,
          );
          await queryClient.invalidateQueries({
            queryKey: keyFactory('feed-by-feedid', feedId),
          });
        } catch (err) {
          console.error(err);
          return;
        }

        break;
      default:
        return;
    }
  }, [
    axiosPrivate,
    changes.deleted,
    changes.modified,
    changes.type,
    data?.metadata.thumbnail.id,
    feedId,
    metadata,
    user,
  ]);

  const onPressPost = useCallback(async () => {
    dispatch(writeFeed_setPosting(true));

    if (feedId) {
      await updateExistingFeed();
    } else {
      await createNewFeed();
    }

    // Dispatch resetWriteFeedSlice, invalidate query cache for feeds, feeds-md, then go back to previous screen
    dispatch(writeFeed_setPosting(false));
    dispatch(writeFeed_resetWriteFeedSlice());
    await queryClient.invalidateQueries({ queryKey: keyFactory('feeds') });
    await queryClient.invalidateQueries({
      queryKey: keyFactory('feeds-by-userid', user?.id),
    });
    await queryClient.invalidateQueries({
      queryKey: keyFactory('feeds-metadata-by-userid', user?.id),
    });
    navigation.goBack();
  }, [
    dispatch,
    feedId,
    user?.id,
    navigation,
    updateExistingFeed,
    createNewFeed,
  ]);

  const { mutate } = useMutation({
    mutationFn: onPressPost,
    // mutationKey: keyFactory('feed-by-feedid', feedId),
  });

  useEffect(() => {
    if (data) {
      dispatch(
        writeFeed_initFeed({ metadata: data.metadata, items: data.feedItems }),
      );
    }
    return () => {
      dispatch(writeFeed_resetWriteFeedSlice());
    };
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

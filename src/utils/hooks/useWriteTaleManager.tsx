import { useCallback, useContext, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import {
  Asset,
  ImageLibraryOptions,
  ImagePickerResponse,
} from 'react-native-image-picker';
import {
  writeTale_setCover,
  writeTale_setTitle,
  writeTale_setTaleItinerary,
  writeTale_addStoryItem,
  writeTale_deleteStoryItemByIndex,
  writeTale_setStoryItemText,
  writeTale_setPosting,
  writeTale_initTale,
  writeTale_resetWriteTaleSlice,
  writeTale_reorderStoryItems,
  writeTale_setSelectedStoryItemIndex,
  writeTale_updateModified,
  writeTale_updateMetadataType,
} from '@redux/reducers/writeTaleSlice';
import useMediaHandlers from '@hooks/useMediaHandlers';
import {
  StoryItemType,
  StoryMedia,
  StoryText,
  StoryTextStyle,
} from '@components/post/types/types';
import useKeyboardHandlers from '@hooks/useKeyboardHandlers';
import useBottomSheetHandlers from '@hooks/useBottomSheetHandlers';
import { Draft, nanoid } from '@reduxjs/toolkit';
import { Feed, Media, MediaMimeType } from '@components/feed/types/types';

import {
  TaleDto,
  TaleMetadata,
  UpdateTaleDto,
} from '@components/tale/types/types';
import {
  itineraryPlanner_createItinerary,
  itineraryPlanner_resetItineraryPlannerSlice,
  itineraryPlanner_setMode,
} from '@redux/reducers/itineraryPlannerSlice';
import { AuthContext } from '@contexts/AuthContext';
import { ulid } from 'ulid';
import {
  UploadMediaDetails,
  getBlobsFromLocalUris,
  getPresignedUrls,
  printPrettyJson,
  uploadMediaFiles,
} from '@helpers/functions';
import { axiosClient, queryClient } from '@helpers/singletons';
import { ModalNavigatorNavigationProp } from '@navigators/types/types';
import { useNavigation } from '@react-navigation/native';
import { AxiosResponse } from 'axios';
import { Route, RouteDto } from '@components/itinerary/types/types';
import useDataManager from '@hooks/useDataManager';
import { TaleView } from '@components/screens/tale/TaleViewScreen';
import useInfiniteDataManager from '@hooks/useInfiniteDataManager';
import { keyFactory, urlFactory } from '@helpers/factory';

const imageLibraryOptions: ImageLibraryOptions = {
  mediaType: 'mixed',
  presentationStyle: 'fullScreen',
  selectionLimit: 1,
};

const useWriteTaleManager = (taleId?: string) => {
  console.log('=== useWriteTaleManager ===');
  const navigation = useNavigation<ModalNavigatorNavigationProp>();
  const { user } = useContext(AuthContext);
  const { openGallery } = useMediaHandlers(imageLibraryOptions);
  const { keyboardIsVisible, closeKeyboard } = useKeyboardHandlers();
  const { bottomSheetRef, snapPoints, renderBackdrop } = useBottomSheetHandlers(
    {
      snapPointsArr: [1, '50%'],
    },
  );
  const dispatch = useAppDispatch();
  const {
    mode,
    metadata,
    itinerary,
    story,
    posting,
    selectedStoryItemIndex,
    changes,
  } = useAppSelector(state => state.writeTale);
  const { selectedRouteId, itinerary: itineraryInProgress } = useAppSelector(
    state => state.itineraryPlanner,
  );
  const { data, isLoading } = useDataManager<TaleView>(
    'tale-by-taleid',
    taleId,
  );
  const { data: feedsThumbnails, isLoading: feedsThumbnailsIsLoading } =
    useInfiniteDataManager<Feed[]>('feeds-by-userid', user?.id);
  const postButtonIsDisabled: boolean =
    posting ||
    metadata.title === '' ||
    (mode === 'EDIT' &&
      changes.metadata.type === 'NONE' &&
      changes.routes.type === 'NONE' &&
      changes.storyItems.type === 'NONE');

  const closeBottomSheet = useCallback(() => {
    bottomSheetRef.current?.close();
  }, [bottomSheetRef]);

  const onPressAddCover = useCallback(async () => {
    const coverResponse: ImagePickerResponse = await openGallery();
    if (coverResponse.didCancel) {
      return;
    }

    let pickedAsset: Asset;
    if (coverResponse.assets && coverResponse.assets.length > 0) {
      pickedAsset = coverResponse.assets[0];
      const cover: Media = {
        id: nanoid(),
        type: pickedAsset.type as MediaMimeType,
        uri: pickedAsset.uri as string,
        height: pickedAsset.height || -1,
        width: pickedAsset.width || -1,
      };
      dispatch(writeTale_setCover({ cover }));

      if (mode === 'EDIT') {
        if (changes.metadata.type !== 'MUTATE') {
          dispatch(writeTale_updateMetadataType({ type: 'MUTATE' }));
        }
        dispatch(writeTale_updateModified({ type: 'METADATA' }));
      }
    }
  }, [changes.metadata.type, dispatch, mode, openGallery]);

  const onPressClearCover = useCallback(() => {
    const deletedId = metadata.cover?.id;
    dispatch(writeTale_setCover({ cover: undefined }));

    if (mode === 'EDIT') {
      if (changes.metadata.type !== 'MUTATE') {
        dispatch(writeTale_updateMetadataType({ type: 'MUTATE' }));
      }
      dispatch(
        writeTale_updateModified({
          type: 'METADATA',
          id: deletedId,
          mutateAction: 'DELETE',
        }),
      );
    }
  }, [changes.metadata.type, dispatch, metadata.cover?.id, mode]);

  const onTitleChange = useCallback(
    (text: string) => {
      dispatch(writeTale_setTitle({ title: text }));
    },
    [dispatch],
  );

  const onTitleChangeEnded = useCallback(() => {
    if (mode === 'EDIT') {
      if (changes.metadata.type === 'NONE') {
        dispatch(writeTale_updateMetadataType({ type: 'ONLY_EDITED_TITLE' }));
      }
      dispatch(writeTale_updateModified({ type: 'METADATA' }));
    }
  }, [changes.metadata.type, dispatch, mode]);

  const onStoryItemTextChange = useCallback(
    (id: string, text: string) => {
      dispatch(writeTale_setStoryItemText({ id, text }));
    },
    [dispatch],
  );

  const onPressAddTitle = useCallback(() => {
    const newSelectedStoryItemIndex = selectedStoryItemIndex + 1;
    const newStoryItem: Draft<StoryText> = {
      id: nanoid(),
      type: StoryItemType.Text,
      data: {
        text: '',
        style: StoryTextStyle.TITLE,
      },
      order: newSelectedStoryItemIndex,
    };
    dispatch(
      writeTale_addStoryItem({
        newStoryItem,
        insertAtIndex: newSelectedStoryItemIndex,
      }),
    );
    dispatch(writeTale_reorderStoryItems());
    dispatch(writeTale_updateModified({ type: 'STORYITEMS' }));
    dispatch(
      writeTale_setSelectedStoryItemIndex({
        selectedStoryItemIndex: newSelectedStoryItemIndex,
      }),
    );
  }, [dispatch, selectedStoryItemIndex]);

  const onPressAddParagraph = useCallback(() => {
    const newSelectedStoryItemIndex = selectedStoryItemIndex + 1;
    const newStoryItem: Draft<StoryText> = {
      id: nanoid(),
      type: StoryItemType.Text,
      data: {
        text: '',
        style: StoryTextStyle.PARAGRAPH,
      },
      order: newSelectedStoryItemIndex,
    };
    dispatch(
      writeTale_addStoryItem({
        newStoryItem,
        insertAtIndex: newSelectedStoryItemIndex,
      }),
    );
    dispatch(writeTale_reorderStoryItems());
    dispatch(writeTale_updateModified({ type: 'STORYITEMS' }));
    dispatch(
      writeTale_setSelectedStoryItemIndex({
        selectedStoryItemIndex: newSelectedStoryItemIndex,
      }),
    );
  }, [dispatch, selectedStoryItemIndex]);

  const onPressAddLinkedFeed = useCallback(
    (index: number) => {
      if (!feedsThumbnails) {
        return;
      }
      const selectedLinkedFeed = feedsThumbnails.pages[0].items[index];
      const newSelectedStoryItemIndex = selectedStoryItemIndex + 1;
      dispatch(
        writeTale_addStoryItem({
          newStoryItem: {
            id: selectedLinkedFeed.metadata.id,
            type: StoryItemType.Media,
            data: {
              feedId: selectedLinkedFeed.metadata.id,
            },
            order: newSelectedStoryItemIndex,
          } as StoryMedia,
          insertAtIndex: newSelectedStoryItemIndex,
        }),
      );
      dispatch(writeTale_reorderStoryItems());
      dispatch(writeTale_updateModified({ type: 'STORYITEMS' }));
      dispatch(
        writeTale_setSelectedStoryItemIndex({
          selectedStoryItemIndex: newSelectedStoryItemIndex,
        }),
      );
      closeBottomSheet();
    },
    [closeBottomSheet, dispatch, feedsThumbnails, selectedStoryItemIndex],
  );

  const onPressDeleteStoryItemByIndex = useCallback(
    (index: number) => {
      dispatch(writeTale_deleteStoryItemByIndex({ deleteFromIndex: index }));
      dispatch(writeTale_reorderStoryItems());
      dispatch(writeTale_updateModified({ type: 'STORYITEMS' }));
    },
    [dispatch],
  );

  const onPressShowLinkedFeeds = useCallback(() => {
    if (keyboardIsVisible) {
      closeKeyboard();
    }

    bottomSheetRef.current?.expand();
  }, [bottomSheetRef, keyboardIsVisible, closeKeyboard]);

  const createNewTale = useCallback(async () => {
    if (!user) {
      return;
    }

    const newTaleId: string = ulid();
    const newTale: TaleDto = {
      metadata: {
        id: newTaleId,
        creator: user,
        cover: undefined,
        thumbnail: undefined,
        title: metadata.title,
      },
      itinerary: {
        metadata: itinerary.metadata,
        routes: itinerary.routes.map(
          (route: Route, _index: number): RouteDto => ({
            id: route.id,
            name: route.name,
            routeNodes: route.routeNodes,
            encodedPolyline: route.encodedPolyline,
            order: route.order, // index
          }),
        ),
      },
      story,
    };

    // Save cover if it exists
    let blobs: Blob[];
    let uploadCoverDetailsList: UploadMediaDetails[];
    if (metadata.cover) {
      blobs = await getBlobsFromLocalUris([metadata.cover.uri]);
      uploadCoverDetailsList = await getPresignedUrls([metadata.cover.type]);
      const { presignedUrl, key } = uploadCoverDetailsList[0];
      if (
        blobs.length === 0 ||
        uploadCoverDetailsList.length === 0 ||
        !blobs[0] ||
        !uploadCoverDetailsList[0]
      ) {
        // TODO: show an error notification
        return;
      }

      const uploadCoverResponse: AxiosResponse[] | null =
        await uploadMediaFiles([presignedUrl], blobs);

      if (uploadCoverResponse) {
        printPrettyJson(uploadCoverResponse[0]);
      }

      const isVideo: boolean = metadata.cover.type.startsWith('video');
      const keyWithoutExt = key.split('.')[0];
      const keyUuid = keyWithoutExt.split('/')[1];
      newTale.metadata.cover = {
        ...metadata.cover,
        id: keyUuid,
        uri: key,
      };
      newTale.metadata.thumbnail = {
        id: keyUuid,
        type: isVideo ? 'image/gif' : metadata.cover.type,
        uri: isVideo ? `${keyWithoutExt}.gif` : key,
        width: 200,
        height: (metadata.cover.height / metadata.cover.width) * 200,
      };
    }

    console.log('====== Create tale ======');
    printPrettyJson(newTale);
    try {
      const response = await axiosClient.post(urlFactory('tale-new'), newTale);
      printPrettyJson(response);
    } catch (err) {
      console.error(err);
    }
  }, [itinerary, metadata.cover, metadata.title, story, user]);

  const updateExistingTale = useCallback(async () => {
    if (!user || !taleId) {
      return;
    }

    let requestData: UpdateTaleDto = {
      taleId,
      metadata: {
        modified: [],
        deleted: [],
      },
      routes: {
        modified: [],
        deleted: [],
      },
      storyItems: {
        modified: [],
        deleted: [],
      },
    };
    switch (changes.metadata.type) {
      case 'NONE':
        break;
      case 'ONLY_EDITED_TITLE':
        console.log('FUckl me now title: ');
        printPrettyJson(changes.metadata);
        requestData.metadata.modified = changes.metadata.modified;
        break;
      case 'MUTATE':
        console.log('FUckl me now mutate: ');
        printPrettyJson(changes.metadata);
        requestData.metadata.modified = changes.metadata.modified;
        requestData.metadata.deleted = changes.metadata.deleted;

        if (requestData.metadata.modified[0].cover) {
          const modifiedMetadata: TaleMetadata =
            requestData.metadata.modified[0];
          // Save new cover if it exists
          let blobs: Blob[];
          let uploadCoverDetailsList: UploadMediaDetails[];
          if (modifiedMetadata.cover) {
            blobs = await getBlobsFromLocalUris([modifiedMetadata.cover.uri]);
            uploadCoverDetailsList = await getPresignedUrls([
              modifiedMetadata.cover.type,
            ]);

            if (
              blobs.length === 0 ||
              uploadCoverDetailsList.length === 0 ||
              !blobs[0] ||
              !uploadCoverDetailsList[0]
            ) {
              // TODO: show an error notification
              return;
            }

            const uploadCoverResponse: AxiosResponse[] | null =
              await uploadMediaFiles(
                [uploadCoverDetailsList[0].presignedUrl],
                blobs,
              );

            if (uploadCoverResponse) {
              printPrettyJson(uploadCoverResponse[0]);
            }

            const isVideo: boolean =
              modifiedMetadata.cover.type.startsWith('video');
            const key = uploadCoverDetailsList[0].key;
            const keyUuid = key.split('.')[0];
            modifiedMetadata.cover = {
              ...modifiedMetadata.cover,
              id: keyUuid,
              uri: key,
            };
            modifiedMetadata.thumbnail = {
              id: keyUuid,
              type: isVideo ? 'image/gif' : modifiedMetadata.cover.type,
              uri: isVideo ? `${keyUuid}.gif` : key,
              width: 200,
              height:
                (modifiedMetadata.cover.height / modifiedMetadata.cover.width) *
                200,
            };
          }
        }
        break;
      default:
        break;
    }

    switch (changes.routes.type) {
      case 'NONE':
        break;
      case 'ONLY_EDITED_ROUTES':
        requestData.routes.modified = changes.routes.modified;
        break;
      case 'MUTATE':
        requestData.routes.modified = changes.routes.modified;
        requestData.routes.deleted = changes.routes.deleted;
        break;
      default:
        return;
    }

    switch (changes.storyItems.type) {
      case 'NONE':
        break;
      case 'ONLY_EDITED_STORY_TEXT':
        requestData.storyItems.modified = changes.storyItems.modified;
        break;
      case 'MUTATE':
        requestData.storyItems.modified = changes.storyItems.modified;
        requestData.storyItems.deleted = changes.storyItems.deleted;
        break;
      default:
        return;
    }

    console.log('Request data in edit tale to url:', urlFactory('tale-edit'));
    printPrettyJson(requestData);
    try {
      const response = await axiosClient.put(
        urlFactory('tale-edit'),
        requestData,
      );
      console.log('Update tale response', response.data);
    } catch (err) {
      console.error(err);
    }

    await queryClient.invalidateQueries({
      queryKey: keyFactory('tale-by-taleid', taleId),
    });
  }, [
    changes.metadata,
    changes.routes.deleted,
    changes.routes.modified,
    changes.routes.type,
    changes.storyItems.deleted,
    changes.storyItems.modified,
    changes.storyItems.type,
    taleId,
    user,
  ]);

  /**
   * Check if we are creating a new tale or editing a tale.
   */
  const onSubmitPost = useCallback(async () => {
    dispatch(writeTale_setPosting(true));

    if (taleId) {
      await updateExistingTale();
    } else {
      await createNewTale();
    }

    dispatch(writeTale_setPosting(false));
    dispatch(writeTale_resetWriteTaleSlice());
    dispatch(itineraryPlanner_resetItineraryPlannerSlice());
    await queryClient.invalidateQueries({
      queryKey: keyFactory('tales-metadata'),
    });
    await queryClient.invalidateQueries({
      queryKey: keyFactory('tales-metadata-by-userid', user?.id),
    });
    await queryClient.invalidateQueries({
      queryKey: keyFactory('feeds-by-userid', user?.id),
    });
    await queryClient.invalidateQueries({
      queryKey: keyFactory('feeds'),
    });
    navigation.goBack();
  }, [
    dispatch,
    taleId,
    user?.id,
    navigation,
    updateExistingTale,
    createNewTale,
  ]);

  useEffect(() => {
    dispatch(itineraryPlanner_setMode({ mode: 'EDIT' }));
    if (!taleId) {
      // if no taleId passed into useWriteTaleManager => create new tale
      dispatch(itineraryPlanner_createItinerary({ creator: user }));
    } else {
      if (data) {
        // if taleId is passed into useWriteTaleManager => edit existing tale
        console.log('Initialising tale...');
        dispatch(writeTale_initTale({ tale: data.tale }));
      }
    }

    return () => {
      dispatch(itineraryPlanner_setMode({ mode: 'VIEW' }));
      dispatch(writeTale_resetWriteTaleSlice());
    };
  }, [taleId, user, data, dispatch]);

  /**
   * Set writeTaleSlice itinerary to that of the itineraryPlannerSlice whenever it changes.
   */
  useEffect(() => {
    console.log('UseEffect for setting tale itinerary called');
    dispatch(
      writeTale_setTaleItinerary({
        itinerary: {
          ...itineraryInProgress,
          routes: itineraryInProgress.routes.map(route => ({
            id: route.id,
            name: route.name,
            routeNodes: route.routeNodes,
            encodedPolyline: route.encodedPolyline,
            order: route.order,
          })),
        },
      }),
    );

    return () => {};
  }, [itineraryInProgress, dispatch]);

  useEffect(() => {
    if (itinerary) {
      // This update might use selectedRouteId (ONLY_EDITED_ROUTES) or might not (MUTATE)
      dispatch(
        writeTale_updateModified({ type: 'ROUTES', id: selectedRouteId }),
      );
    }
  }, [dispatch, selectedRouteId, itinerary]);

  return {
    bottomSheetRef,
    snapPoints,
    keyboardIsVisible,
    mode,
    metadata,
    // data,
    // itinerary,
    story,
    posting,
    postButtonIsDisabled,
    isLoading,
    feedsThumbnails: feedsThumbnails?.pages[0].items,
    feedsThumbnailsIsLoading,
    closeKeyboard,
    closeBottomSheet,
    renderBackdrop,
    onPressAddCover,
    onPressClearCover,
    onTitleChange,
    onTitleChangeEnded,
    onStoryItemTextChange,
    onPressAddTitle,
    onPressAddParagraph,
    onPressShowLinkedFeeds,
    onPressAddLinkedFeed,
    onPressDeleteStoryItemByIndex,
    onSubmitPost,
  };
};

export default useWriteTaleManager;

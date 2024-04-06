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
  writeTale_deleteStoryItem,
  writeTale_setStoryItemText,
  writeTale_setPosting,
  writeTale_initTale,
  writeTale_resetWriteTaleSlice,
  writeTale_reorderStoryItems,
  writeTale_setSelectedStoryItemIndex,
} from '@redux/reducers/writeTaleSlice';
import useMediaHandlers from '@hooks/useMediaHandlers';
import {
  StoryItemType,
  StoryMedia,
  StoryText,
  StoryTextStyle,
} from '@components/post/types/types';
// import { storyTitleStyle, storyBodyStyle } from '@constants/text';
import useKeyboardHandlers from '@hooks/useKeyboardHandlers';
import useBottomSheetHandlers from '@hooks/useBottomSheetHandlers';
import { Draft, nanoid } from '@reduxjs/toolkit';
import { Feed, Media, MediaMimeType } from '@components/feed/types/types';

import { TaleDto } from '@components/tale/types/types';
import {
  itineraryPlanner_createItinerary,
  itineraryPlanner_initItinerary,
  itineraryPlanner_resetItineraryPlannerSlice,
  itineraryPlanner_setMode,
} from '@redux/reducers/itineraryPlannerSlice';
import { AuthContext } from '@contexts/AuthContext';
import { ulid } from 'ulid';
import {
  UploadMediaDetails,
  decodePolyline,
  getBlobsFromLocalUris,
  getPresignedUrls,
  printPrettyJson,
  uploadMediaFiles,
} from '@helpers/functions';
import { axiosClient } from '@helpers/singletons';
import { ModalNavigatorNavigationProp } from '@navigators/types/types';
import { useNavigation } from '@react-navigation/native';
import { AxiosResponse } from 'axios';
import { Itinerary, Route, RouteDto } from '@components/itinerary/types/types';
import useDataManager from '@hooks/useDataManager';
import { NEW_TALE_URL } from '@constants/urls';
import { TaleView } from '@components/screens/tale/TaleViewScreen';

const imageLibraryOptions: ImageLibraryOptions = {
  mediaType: 'mixed',
  presentationStyle: 'fullScreen',
  selectionLimit: 1,
};

const useWriteTaleManager = (taleId?: string) => {
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
  const { metadata, itinerary, story, posting, selectedStoryItemIndex } =
    useAppSelector(state => state.writeTale);
  console.log('=== useWriteTaleManager ===');
  console.log('useWriteTaleManager metadata: ', metadata);
  console.log('useWriteTaleManager itinerary: ', itinerary);
  console.log('useWriteTaleManager story: ', story);

  const { itinerary: itineraryInProgress } = useAppSelector(
    state => state.itineraryPlanner,
  );

  // useQuery to fetch tale from api based on taleId from hook argument
  const { data, isLoading } = useDataManager<TaleView>(
    'tale-by-taleid',
    taleId,
  );
  const { data: feedsThumbnails, isLoading: feedsThumbnailsIsLoading } =
    useDataManager<Feed[]>('feeds-by-userid', user?.id);

  const onPressAddCover = useCallback(async () => {
    const coverResponse: ImagePickerResponse = await openGallery();
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
      dispatch(writeTale_setCover(cover));
    }
  }, [dispatch, openGallery]);

  const onPressClearCover = useCallback(() => {
    dispatch(writeTale_setCover(null));
  }, [dispatch]);

  const onTitleChange = useCallback(
    (text: string) => {
      dispatch(writeTale_setTitle(text));
    },
    [dispatch],
  );

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
    dispatch(
      writeTale_setSelectedStoryItemIndex({
        selectedStoryItemIndex: newSelectedStoryItemIndex,
      }),
    );
  }, [dispatch, selectedStoryItemIndex]);

  const onPressShowLinkedFeeds = useCallback(() => {
    // Close keyboard if open
    if (keyboardIsVisible) {
      closeKeyboard();
    }

    // Open bottomsheet displaying linkedFeed
    bottomSheetRef.current?.expand();
  }, [bottomSheetRef, keyboardIsVisible, closeKeyboard]);

  const onPressAddLinkedFeed = useCallback(
    (index: number) => {
      if (!feedsThumbnails) {
        return;
      }
      const selectedLinkedFeed = feedsThumbnails[index];
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
      dispatch(
        writeTale_setSelectedStoryItemIndex({
          selectedStoryItemIndex: newSelectedStoryItemIndex,
        }),
      );
      bottomSheetRef.current?.close();
    },
    [bottomSheetRef, dispatch, feedsThumbnails, selectedStoryItemIndex],
  );

  const onPressDeleteStoryItem = useCallback(
    (index: number) => {
      dispatch(writeTale_deleteStoryItem({ deleteFromIndex: index }));
    },
    [dispatch],
  );

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
          (route: Route, index: number): RouteDto => ({
            id: route.id,
            name: route.name,
            routeNodes: route.routeNodes,
            encodedPolyline: route.encodedPolyline,
            order: index, // route.order
          }),
        ),
      },
      story,
    };

    console.log('ITINERARY-------');
    printPrettyJson(itinerary);

    // Save cover if it exists
    let blobs: Blob[];
    let uploadCoverDetailsList: UploadMediaDetails[];
    if (metadata.cover) {
      blobs = await getBlobsFromLocalUris([metadata.cover.uri]);
      uploadCoverDetailsList = await getPresignedUrls([metadata.cover.type]);

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
        await uploadMediaFiles([uploadCoverDetailsList[0].presignedUrl], blobs);

      if (uploadCoverResponse) {
        printPrettyJson(uploadCoverResponse[0]);
      }

      const isVideo: boolean = metadata.cover.type.startsWith('video');
      const key = uploadCoverDetailsList[0].key;
      newTale.metadata.cover = {
        ...metadata.cover,
        uri: key,
      };
      newTale.metadata.thumbnail = {
        id: metadata.id,
        type: isVideo ? 'image/gif' : metadata.cover.type,
        uri: isVideo ? `${key.split('.')[0]}.gif` : key,
        width: 200,
        height: (metadata.cover.height / metadata.cover.width) * 200,
      };
    }

    // Post request for saving blog data
    console.log('====== New tale ======');
    printPrettyJson(newTale);
    try {
      const response = await axiosClient.post(NEW_TALE_URL, newTale);
      printPrettyJson(response);
    } catch (err) {
      console.error(err);
    }
  }, [itinerary, metadata.cover, metadata.id, metadata.title, story, user]);

  const updateExistingTale = useCallback(() => {
    if (!user) {
      return;
    }

    // Check what tale data has changed. If changed cover, ask backend to delete original cover, and store new one.
    // Can I get a list of primary keys (PK,SK) that changed, map it to an action and a resource
    // If there is a reorder of storyitems/routes, perform updates for all since the all their orders have changed

    // metadata

    // itinerary

    // story
  }, [user]);

  /**
   * Check if we are creating a new tale or editing a tale.
   */
  const onSubmitPost = useCallback(async () => {
    dispatch(writeTale_setPosting(true));

    if (taleId) {
      updateExistingTale();
    } else {
      createNewTale();
    }

    dispatch(writeTale_setPosting(false));
    dispatch(writeTale_resetWriteTaleSlice());
    dispatch(itineraryPlanner_resetItineraryPlannerSlice());
    navigation.goBack();
  }, [dispatch, taleId, navigation, updateExistingTale, createNewTale]);

  useEffect(() => {
    dispatch(itineraryPlanner_setMode({ mode: 'EDIT' }));
    if (!taleId) {
      // if no taleId passed into useWriteTaleManager => create new tale
      dispatch(itineraryPlanner_createItinerary({ creator: user }));
    } else {
      if (data) {
        // if taleId is passed into useWriteTaleManager => edit existing tale
        console.log('Initialising tale...');
        console.log('data:::', data);

        const itinerary: Itinerary = {
          metadata: data.tale.itinerary.metadata,
          routes: data.tale.itinerary.routes.map((route: Route) => {
            const decodedRoute = {
              ...route,
              polyline: decodePolyline(route.encodedPolyline),
            };
            return decodedRoute;
          }),
        };
        dispatch(writeTale_initTale({ tale: data.tale }));
        dispatch(itineraryPlanner_initItinerary({ itinerary }));
      }
    }

    return () => {
      dispatch(writeTale_resetWriteTaleSlice());
      dispatch(itineraryPlanner_resetItineraryPlannerSlice());
    };
  }, [taleId, user, data, dispatch]);

  /**
   * Set writeTaleSlice itinerary to that of the itineraryPlannerSlice whenever it changes.
   */
  useEffect(() => {
    dispatch(
      writeTale_setTaleItinerary({
        itinerary: {
          ...itineraryInProgress,
          routes: itineraryInProgress.routes.map(route => ({
            id: route.id,
            name: route.name,
            routeNodes: route.routeNodes,
            encodedPolyline: route.encodedPolyline,
          })),
        },
      }),
    );
    return () => {};
  }, [itineraryInProgress, dispatch]);

  return {
    bottomSheetRef,
    snapPoints,
    keyboardIsVisible,
    metadata,
    itinerary,
    story,
    posting,
    data,
    isLoading,
    feedsThumbnails,
    feedsThumbnailsIsLoading,
    closeKeyboard,
    renderBackdrop,
    onPressAddCover,
    onPressClearCover,
    onTitleChange,
    onStoryItemTextChange,
    onPressAddTitle,
    onPressAddParagraph,
    onPressShowLinkedFeeds,
    onPressAddLinkedFeed,
    onPressDeleteStoryItem,
    onSubmitPost,
  };
};

export default useWriteTaleManager;

// const queryFn = useCallback(
//   async ({ queryKey }: { queryKey: QueryKey }): Promise<Tale | null> => {
//     const [key, tid] = queryKey;
//     console.log('Refreshing queryKey: ', queryKey);
//     switch (mode) {
//       case 'production':
//         try {
//           const response = await axiosClient.get(`/${key}/${tid}`);
//           return response.data.tale;
//         } catch (err) {
//           console.error(err);
//           return null;
//         }
//       case 'development':
//       default:
//         return null;
//     }
//   },
//   [mode],
// );
// const options = useMemo(() => {
//   const queryKey = ['tales', taleId];
//   return queryOptions({
//     queryKey,
//     queryFn,
//     networkMode: 'online',
//     enabled: !!taleId,
//     gcTime: Infinity,
//     staleTime: Infinity,
//   });
// }, [taleId, queryFn]);
// const { data, isLoading } = useQuery(options);
// console.log('useWriteTaleManager: ', data);

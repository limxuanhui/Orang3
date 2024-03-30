import { useCallback, useContext, useEffect, useMemo } from 'react';
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
import { QueryKey, queryOptions, useQuery } from '@tanstack/react-query';

import { Tale, TaleDto } from '@components/tale/types/types';
import {
  itineraryPlanner_createItinerary,
  itineraryPlanner_resetItineraryPlannerSlice,
  itineraryPlanner_setItinerary,
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
import { axiosClient } from '@helpers/singletons';
import useGlobals from '@hooks/useGlobals';
import { ModalNavigatorNavigationProp } from '@navigators/types/types';
import { useNavigation } from '@react-navigation/native';
import { AxiosResponse } from 'axios';
import { Route, RouteDto } from 'components/itinerary/types/types';

const imageLibraryOptions: ImageLibraryOptions = {
  mediaType: 'mixed',
  presentationStyle: 'fullScreen',
  selectionLimit: 1,
};

const url = '/tales/new';

const useWriteTaleManager = (taleId?: string) => {
  const { mode } = useGlobals();
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
  const { itinerary: itineraryInProgress } = useAppSelector(
    state => state.itineraryPlanner,
  );

  // useQuery to fetch tale from api based on taleId from hook argument
  const queryFn = useCallback(
    async ({ queryKey }: { queryKey: QueryKey }): Promise<Tale | null> => {
      const [key, tid] = queryKey;
      console.log('Refreshing queryKey: ', queryKey);
      switch (mode) {
        case 'production':
          try {
            const response = await axiosClient.get(`/${key}/${tid}`);
            return response.data;
          } catch (err) {
            console.error(err);
            return null;
          }
        case 'development':
        default:
          return null;
      }
    },
    [mode],
  );
  const options = useMemo(() => {
    const queryKey = ['tales', taleId];
    return queryOptions({
      queryKey,
      queryFn,
      networkMode: 'online',
      enabled: !!taleId,
      gcTime: Infinity,
      staleTime: Infinity,
    });
  }, [taleId, queryFn]);
  const { data, isLoading } = useQuery(options);

  // useQuery to fetch tale from api based on taleId from hook argument
  const feedsThumbnailsQueryFn = useCallback(
    async ({ queryKey }: { queryKey: QueryKey }): Promise<Feed[] | null> => {
      const [key, key1, uid] = queryKey;
      console.log('Refreshing queryKey: ', queryKey);
      switch (mode) {
        case 'production':
          const response = await axiosClient.get(`/${key}/${key1}/${uid}`);
          return response.data.items;
        case 'development':
        default:
          return null;
      }
    },
    [mode],
  );
  const feedsThumbnailsOptions = useMemo(() => {
    if (user) {
      const queryKey = ['feeds', 'user', user.id];
      return queryOptions({
        queryKey,
        queryFn: feedsThumbnailsQueryFn,
        networkMode: 'online',
        enabled: !taleId,
        // gcTime: 1000 * 60 * 5,
        gcTime: 0,
        staleTime: 1000 * 60 * 5,
      });
    }
    return queryOptions({
      queryKey: [''] as QueryKey,
      queryFn: () => {
        return null;
      },
      enabled: false,
      initialData: [] as Feed[],
    });
  }, [user, feedsThumbnailsQueryFn, taleId]);
  const { data: feedsThumbnails, isLoading: feedsThumbnailsIsLoading } =
    useQuery(feedsThumbnailsOptions);

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
        // style: storyTitleStyle as Draft<StyleProp<TextStyle>>,
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
        // style: storyBodyStyle as Draft<StyleProp<TextStyle>>,
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

  /**
   * Check if we are creating a new tale or editing a tale.
   */
  const onSubmitPost = useCallback(async () => {
    dispatch(writeTale_setPosting(true));
    if (!user) {
      dispatch(writeTale_setPosting(false));
      return;
    }

    if (taleId) {
      // Check what tale data has changed. If changed cover, ask backend to delete original cover, and store new one.
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
          (route: Route): RouteDto => ({
            id: route.id,
            name: route.name,
            routeNodes: route.routeNodes,
            encodedPolyline: route.encodedPolyline,
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
      const response = await axiosClient.post(url, newTale);
      printPrettyJson(response);
    } catch (err) {
      console.error(err);
    }
    writeTale_setPosting(false);
    // dispatch(setMode({ mode: "view" }));
    dispatch(writeTale_resetWriteTaleSlice());
    dispatch(itineraryPlanner_resetItineraryPlannerSlice());
    navigation.goBack();
  }, [
    dispatch,
    user,
    taleId,
    metadata.title,
    metadata.cover,
    metadata.id,
    itinerary,
    story,
    navigation,
  ]);

  useEffect(() => {
    if (!taleId) {
      // if no taleId passed into useWriteTaleManager => create new tale
      dispatch(itineraryPlanner_createItinerary({ creator: user }));
    } else {
      if (data) {
        // if taleId is passed into useWriteTaleManager => edit existing tale
        dispatch(writeTale_initTale({ tale: data }));
        dispatch(itineraryPlanner_setItinerary({ itinerary: data.itinerary }));
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

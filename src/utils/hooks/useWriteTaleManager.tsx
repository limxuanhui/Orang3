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
  // writeTale_fetchFeeds,
  writeTale_setFetchedTale,
  writeTale_resetWriteTaleSlice,
} from '@redux/reducers/writeTaleSlice';
import useMediaHandlers from '@hooks/useMediaHandlers';
import { StoryItem, StoryItemType } from '@components/post/types/types';
import { storyTitleStyle, storyBodyStyle } from '@constants/text';
import useKeyboardHandlers from '@hooks/useKeyboardHandlers';
import useBottomSheetHandlers from '@hooks/useBottomSheetHandlers';
import { nanoid } from '@reduxjs/toolkit';
// import { Feed, Media, MediaMimeType } from '../../components/feed/types/types';
import { Feed, Media, MediaMimeType } from '@components/feed/types/types';
import {
  QueryKey,
  queryOptions,
  // useMutation,
  useQuery,
} from '@tanstack/react-query';
// import { DUMMY_DATABASE } from '@data/database';
import { Tale } from '@components/tale/types/types';
import {
  itineraryPlanner_createItinerary,
  itineraryPlanner_resetItineraryPlannerSlice,
  itineraryPlanner_setItinerary,
  itineraryPlanner_setMode,
} from '@redux/reducers/itineraryPlannerSlice';
// import type { DataKey } from '@data/types/types';
import { AuthContext } from '@contexts/AuthContext';
import { ulid } from 'ulid';
import {
  // UploadMediaDetails,
  // getPresignedUrls,
  printPrettyJson,
} from '@helpers/functions';
import { axiosClient } from '@helpers/singletons';
import useGlobals from '@hooks/useGlobals';

const imageLibraryOptions: ImageLibraryOptions = {
  mediaType: 'mixed',
  presentationStyle: 'fullScreen',
  selectionLimit: 1,
};

const url = '/tales/new';

const useWriteTaleManager = (taleId?: string) => {
  const { user } = useContext(AuthContext);
  const { mode } = useGlobals();
  const { openGallery } = useMediaHandlers(imageLibraryOptions);
  const { keyboardIsVisible, closeKeyboard } = useKeyboardHandlers();
  const { bottomSheetRef, snapPoints, renderBackdrop } = useBottomSheetHandlers(
    {
      snapPointsArr: [1, '50%'],
    },
  );
  const dispatch = useAppDispatch();
  const { metadata, itinerary, story, posting } = useAppSelector(
    state => state.writeTale,
  );
  const { itinerary: itineraryInProgress } = useAppSelector(
    state => state.itineraryPlanner,
  );

  // const mutationFn = useCallback(async () => {}, []);

  // const { mutate } = useMutation({
  //   // mutationKey: [],
  //   mutationFn,
  //   onSuccess: () => {},
  // });

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
          console.log('Fetching feedsThumbnails');
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

  useEffect(() => {
    dispatch(itineraryPlanner_setMode({ mode: 'edit' }));

    if (!taleId) {
      // if no taleId passed into useWriteTaleManager => create new tale
      dispatch(itineraryPlanner_createItinerary({ creatorId: user?.id }));
    } else {
      if (data) {
        // if taleId is passed into useWriteTaleManager => edit existing tale
        dispatch(writeTale_setFetchedTale({ tale: data }));
        dispatch(itineraryPlanner_setItinerary({ itinerary: data.itinerary }));
      }
    }

    return () => {
      dispatch(writeTale_resetWriteTaleSlice());
      dispatch(itineraryPlanner_resetItineraryPlannerSlice());
      dispatch(itineraryPlanner_setMode({ mode: 'view' }));
    };
  }, [taleId, user, data, dispatch]);

  const onPressAddCover = useCallback(async () => {
    const coverResponse: ImagePickerResponse = await openGallery();
    let pickedAsset: Asset;

    if (coverResponse.assets && coverResponse.assets.length > 0) {
      pickedAsset = coverResponse.assets[0];
      console.log('PICKEDASSET: ', pickedAsset);
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
    const newStoryItem: StoryItem = {
      id: nanoid(),
      type: StoryItemType.Text,
      text: '',
      style: storyTitleStyle,
    };
    dispatch(writeTale_addStoryItem({ newStoryItem }));
  }, [dispatch]);

  const onPressAddParagraph = useCallback(() => {
    const newStoryItem: StoryItem = {
      id: nanoid(),
      type: StoryItemType.Text,
      text: '',
      style: storyBodyStyle,
    };
    dispatch(writeTale_addStoryItem({ newStoryItem }));
  }, [dispatch]);

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
      dispatch(
        writeTale_addStoryItem({
          newStoryItem: {
            id: nanoid(), // or use the id of the item that is fetched from api
            type: StoryItemType.Media,
            data: selectedLinkedFeed,
          },
        }),
      );

      // Close bottomsheet
      bottomSheetRef.current?.close();
      // return selectedLinkedFeedId;
    },
    [bottomSheetRef, dispatch, feedsThumbnails],
  );

  const onPressDeleteStoryItem = useCallback(
    (index: number) => {
      dispatch(writeTale_deleteStoryItem({ itemId: index }));
    },
    [dispatch],
  );

  // const saveCoverToS3 = useCallback(async (tale: Tale) => {
  //   if (tale.metadata.cover) {
  //     const secureS3UrlResponse = await axios.get(
  //       AWS_API_GATEWAY_S3_PRESIGNED_URL,
  //       {
  //         headers: { mediaType: tale.metadata.cover.type },
  //       },
  //     );

  //     const blobResponse = await fetch(
  //       tale.metadata.cover.uri.replace('file:///', 'file:/') ||
  //         '/Users/limxuanhui/bluextech/gypsie/assets/images/logo-no-background.png',
  //     );
  //     // console.log("BLOB response: ", blobResponse);
  //     const blob = await blobResponse.blob();

  //     // If failed to get secure s3 url
  //     if (secureS3UrlResponse.status !== 200) {
  //       console.error('Failed to get secure S3 url for uploading media');
  //       writeTale_setPosting(false);
  //       return;
  //     }

  //     const response = await axios.put(secureS3UrlResponse.data, blob, {
  //       // Ensure blob data is not transformed (stringified) by axios in transformRequest
  //       // Refer to this link for more details: https://github.com/axios/axios/issues/2677
  //       transformRequest: data => data,
  //       headers: {
  //         'Content-Type': tale.metadata.cover.type,
  //       },
  //     });
  //     console.log('RESPONSE: ', response);
  //   }
  // }, []);

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

    // Save cover if it exists
    if (data?.metadata.cover) {
      // const uploadMediaDetailsList: UploadMediaDetails[] =
      // await getPresignedUrls([data.metadata.cover.type]);
      // const presignedUrl = uploadMediaDetailsList.map(el => el.presignedUrl)[0];
      // const key = uploadMediaDetailsList.map(el => el.key)[0];
      // saveCoverToS3(data.metadata.cover);
      // If response not ok, throw Error and stop saving tale data.
      // AWS S3 will never store partial objects, so response ok means the entire object is stored successfully.
    }

    // Post request for saving blog data
    console.log('Saving tale to: ', url);
    const newTale: Tale = {
      metadata: {
        id: ulid(),
        creator: user,
        cover: metadata.cover,
        title: metadata.title,
      },
      itinerary,
      story,
    };
    console.log('====== New tale ======');
    printPrettyJson(newTale);
    try {
      await axiosClient.post(url, newTale);
    } catch (err) {
      console.error(err);
    }
    writeTale_setPosting(false);
    // dispatch(setMode({ mode: "view" }));
    // dispatch(resetWriteTaleSlice());
    // dispatch(resetItineraryPlannerSlice());
    // navigation.goBack()
    // }, [cover, title, story, posting]);
  }, [
    dispatch,
    user,
    taleId,
    // data.metadata.cover,
    data,
    metadata.cover,
    metadata.title,
    itinerary,
    story,
  ]);

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

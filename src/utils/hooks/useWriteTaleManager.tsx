import { useCallback, useContext, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
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
  writeTale_fetchFeeds,
  writeTale_setFetchedTale,
  writeTale_resetWriteTaleSlice,
} from '../redux/reducers/writeTaleSlice';
import useMediaHandlers from './useMediaHandlers';
import { StoryItem, StoryItemType } from '../../components/post/types/types';
import axios from 'axios';
import { storyTitleStyle, storyBodyStyle } from '../constants/text';
import useKeyboardHandlers from './useKeyboardHandlers';
import useBottomSheetHandlers from './useBottomSheetHandlers';
import { nanoid } from '@reduxjs/toolkit';
import { AWS_API_GATEWAY_S3_PRESIGNED_URL, BACKEND_BASE_URL } from '@env';
// import { Feed, Media, MediaMimeType } from '../../components/feed/types/types';
import { Media, MediaMimeType } from '@components/feed/types/types';
import { QueryKey, queryOptions, useQuery } from '@tanstack/react-query';
import { DUMMY_DATABASE } from '../../data/database';
import { Tale } from '../../components/tale/types/types';
import {
  itineraryPlanner_createItinerary,
  itineraryPlanner_resetItineraryPlannerSlice,
  itineraryPlanner_setItinerary,
  itineraryPlanner_setMode,
} from '../redux/reducers/itineraryPlannerSlice';
import type { DataKey } from '../../data/types/types';
import { AuthContext } from '../contexts/AuthContext';
import { ulid } from 'ulid';
import { printPrettyJson } from '../helpers/functions';

const imageLibraryOptions: ImageLibraryOptions = {
  mediaType: 'mixed',
  presentationStyle: 'fullScreen',
  selectionLimit: 1,
};

const useWriteTaleManager = (taleId?: string) => {
  const { user } = useContext(AuthContext);
  const { openGallery } = useMediaHandlers(imageLibraryOptions);
  const { keyboardIsVisible, closeKeyboard } = useKeyboardHandlers();
  const { bottomSheetRef, snapPoints, renderBackdrop } = useBottomSheetHandlers(
    {
      snapPointsArr: [1, '50%'],
    },
  );
  const dispatch = useAppDispatch();
  const { metadata, itinerary, story, feedItemThumbnails, posting } =
    useAppSelector(state => state.writeTale);
  const { itinerary: itineraryInProgress } = useAppSelector(
    state => state.itineraryPlanner,
  );

  // useQuery to fetch tale from api based on taleId from hook argument
  const queryFn = useCallback(
    async ({ queryKey }: { queryKey: QueryKey }): Promise<Tale | null> => {
      try {
        // 1) get tale data from Ordika.
        // 2) this tale data will look like: {}
      } catch (err) {}

      const [key, taleId] = queryKey;
      console.log('QUERY FUNCTION CALLED with taleId: ', taleId);
      return new Promise((resolve, _reject) => {
        const tales: Tale[] = DUMMY_DATABASE[key as DataKey] as Tale[];
        const result =
          tales.find((el: Tale) => el.metadata.id === taleId) ?? null;
        setTimeout(() => {
          resolve(result);
        }, 2000);
      });
    },
    [],
  );
  const options = useMemo(() => {
    const queryKey = ['tales', taleId];
    return queryOptions({
      queryKey,
      queryFn,
      networkMode: 'online',
      enabled: !!taleId,
      gcTime: 1000 * 60 * 5,
      staleTime: Infinity,
    });
  }, [taleId, queryFn]);
  const { data, isLoading } = useQuery(options);

  useEffect(() => {
    // Fetch current user's fetchItemThumbnails
    console.log('status: ', feedItemThumbnails.status);
    if (feedItemThumbnails.status === 'idle') {
      console.log('in useEffect for loading linked feeds list');
      dispatch(writeTale_fetchFeeds(metadata.creator.id));
    }
  }, [metadata, feedItemThumbnails, dispatch]);

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

  const onPressAddLinkedFeed = useCallback(() => {
    const selectedLinkedFeedId = 0;
    const selectedLinkedFeed = feedItemThumbnails.data[selectedLinkedFeedId];
    console.log(selectedLinkedFeed);
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
    return selectedLinkedFeedId;
  }, [bottomSheetRef, feedItemThumbnails, dispatch]);

  const onPressDeleteLinkedFeed = useCallback(
    (index: number) => {
      dispatch(writeTale_deleteStoryItem({ itemId: index }));
    },
    [dispatch],
  );

  const saveCoverToS3 = useCallback(async (tale: Tale) => {
    if (tale.metadata.cover) {
      const secureS3UrlResponse = await axios.get(
        AWS_API_GATEWAY_S3_PRESIGNED_URL,
        {
          headers: { mediaType: tale.metadata.cover.type },
        },
      );

      const blobResponse = await fetch(
        tale.metadata.cover.uri.replace('file:///', 'file:/') ||
          '/Users/limxuanhui/bluextech/gypsie/assets/images/logo-no-background.png',
      );
      // console.log("BLOB response: ", blobResponse);
      const blob = await blobResponse.blob();

      // If failed to get secure s3 url
      if (secureS3UrlResponse.status !== 200) {
        console.error('Failed to get secure S3 url for uploading media');
        writeTale_setPosting(false);
        return;
      }

      const response = await axios.put(secureS3UrlResponse.data, blob, {
        // Ensure blob data is not transformed (stringified) by axios in transformRequest
        // Refer to this link for more details: https://github.com/axios/axios/issues/2677
        transformRequest: data => data,
        headers: {
          'Content-Type': tale.metadata.cover.type,
        },
      });
      console.log('RESPONSE: ', response);
    }
  }, []);

  /**
   * Check if we are creating a new tale or editing a tale.
   */
  const onSubmitPost = useCallback(async () => {
    writeTale_setPosting(true);
    if (taleId) {
      // Check what tale data has changed. If changed cover, ask backend to delete original cover, and store new one.
      return;
    }

    // Save cover if it exists
    if (data?.metadata.cover) {
      // If response not ok, throw Error and stop saving tale data.
      // AWS S3 will never store partial objects, so response ok means the entire object is stored successfully.
    }

    // Post request for saving blog data
    const url = BACKEND_BASE_URL + '/tales/new';
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
    taleId,
    data?.metadata.cover,
    user,
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
    feedItemThumbnails,
    data,
    isLoading,
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
    onPressDeleteLinkedFeed,
    onSubmitPost,
  };
};

export default useWriteTaleManager;

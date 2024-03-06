import { useCallback, useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  Asset,
  ImageLibraryOptions,
  ImagePickerResponse,
} from "react-native-image-picker";
import {
  writeTale_setCover,
  writeTale_setTitle,
  writeTale_createTaleItinerary,
  writeTale_setTaleItinerary,
  writeTale_addStoryItem,
  writeTale_deleteStoryItem,
  writeTale_setStoryItemText,
  writeTale_setPosting,
  writeTale_fetchFeeds,
  writeTale_setFetchedTale,
  writeTale_resetWriteTaleSlice,
} from "../redux/reducers/writeTaleSlice";
import useMediaHandlers from "./useMediaHandlers";
import {
  Story,
  StoryItem,
  StoryItemType,
} from "../../components/post/types/types";
import axios from "axios";
import { storyTitleStyle, storyBodyStyle } from "../constants/text";
import useKeyboardHandlers from "./useKeyboardHandlers";
import useBottomSheetHandlers from "./useBottomSheetHandlers";
import { nanoid } from "@reduxjs/toolkit";
import { AWS_API_GATEWAY_S3_PRESIGNED_URL, BACKEND_BASE_URL } from "@env";
import { Feed, Media, MediaMimeType } from "../../components/feed/types/types";
import { QueryKey, queryOptions, useQuery } from "@tanstack/react-query";
import { DUMMY_DATABASE } from "../../data/database";
import { Tale } from "../../components/tale/types/types";
import {
  itineraryPlanner_resetItineraryPlannerSlice,
  itineraryPlanner_setItinerary,
  itineraryPlanner_setMode,
} from "../redux/reducers/itineraryPlannerSlice";
import type { DataKey } from "../../data/types/types";

const imageLibraryOptions: ImageLibraryOptions = {
  mediaType: "mixed",
  presentationStyle: "fullScreen",
  selectionLimit: 1,
};

const useWriteTaleManager = (taleId?: string) => {
  const { openGallery } = useMediaHandlers(imageLibraryOptions);
  const { keyboardIsVisible, closeKeyboard } = useKeyboardHandlers();
  const { bottomSheetRef, snapPoints, renderBackdrop } = useBottomSheetHandlers(
    {
      snapPointsArr: [1, "50%"],
    },
  );
  const dispatch = useAppDispatch();
  const {
    id,
    cover,
    title,
    feeds,
    itinerary,
    story,
    feedItemThumbnails,
    posting,
  } = useAppSelector(state => state.writeTale);

  // useQuery to fetch tale from api based on taleId from hook argument
  const queryFn = useCallback(
    async ({ queryKey }: { queryKey: QueryKey }): Promise<Tale | null> => {
      try {
        // 1) get tale data from Ordika.
        // 2) this tale data will look like: {}
      } catch (err) {}

      const [key, taleId] = queryKey;
      console.log("QUERY FUNCTION CALLED with taleId: ", taleId);
      return new Promise((resolve, reject) => {
        const tales: Tale[] = DUMMY_DATABASE[key as DataKey] as Tale[];
        const result = tales.find((el: Tale) => el.id === taleId) ?? null;
        setTimeout(() => {
          resolve(result);
        }, 2000);
      });
    },
    [DUMMY_DATABASE],
  );

  const options = useMemo(() => {
    const queryKey = ["tales", taleId];
    return queryOptions({
      queryKey,
      queryFn,
      networkMode: "online",
      enabled: true,
      gcTime: 1000 * 60 * 5,
      staleTime: Infinity,
    });
  }, [taleId, queryOptions]);

  const { data, isFetching, isError, isLoading, isPending, isPlaceholderData } =
    useQuery(options);

  useEffect(() => {
    // Fetch current user's fetchItemThumbnails
    console.log("status: ", feedItemThumbnails.status);
    if (feedItemThumbnails.status === "idle") {
      console.log("in useEffect for loading linked feeds list");
      dispatch(writeTale_fetchFeeds("user-1"));
    }
  }, [feedItemThumbnails, writeTale_fetchFeeds, dispatch]);

  useEffect(() => {
    dispatch(itineraryPlanner_setMode({ mode: "edit" }));

    if (data) {
      dispatch(writeTale_setFetchedTale({ tale: data }));
      dispatch(itineraryPlanner_setItinerary({ itinerary: data.itinerary }));
    }

    return () => {
      dispatch(writeTale_resetWriteTaleSlice());
      dispatch(itineraryPlanner_resetItineraryPlannerSlice());
      dispatch(itineraryPlanner_setMode({ mode: "view" }));
    };
  }, [
    data,
    writeTale_setFetchedTale,
    writeTale_resetWriteTaleSlice,
    itineraryPlanner_setItinerary,
    itineraryPlanner_resetItineraryPlannerSlice,
    itineraryPlanner_setMode,
    dispatch,
  ]);

  const onPressAddCover = useCallback(async () => {
    const coverResponse: ImagePickerResponse = await openGallery();
    let pickedAsset: Asset;

    if (coverResponse.assets && coverResponse.assets.length > 0) {
      pickedAsset = coverResponse.assets[0];
      console.log("PICKEDASSET: ", pickedAsset);
      const cover: Media = {
        id: nanoid(),
        type: pickedAsset.type as MediaMimeType,
        uri: pickedAsset.uri as string,
      };
      dispatch(writeTale_setCover(cover));
    }
  }, [cover, dispatch, openGallery]);

  const onPressClearCover = useCallback(() => {
    dispatch(writeTale_setCover(null));
  }, [writeTale_setCover, dispatch]);

  const onTitleChange = useCallback(
    (text: string) => {
      dispatch(writeTale_setTitle(text));
    },
    [writeTale_setTitle, dispatch],
  );

  const onStoryItemTextChange = useCallback(
    (id: string, text: string) => {
      dispatch(writeTale_setStoryItemText({ id, text }));
    },
    [writeTale_setStoryItemText, dispatch],
  );

  const onPressAddTitle = useCallback(() => {
    const newStoryItem: StoryItem = {
      id: nanoid(),
      type: StoryItemType.Text,
      text: "",
      style: storyTitleStyle,
    };
    dispatch(writeTale_addStoryItem({ newStoryItem }));
  }, [writeTale_addStoryItem, dispatch, nanoid]);

  const onPressAddParagraph = useCallback(() => {
    const newStoryItem: StoryItem = {
      id: nanoid(),
      type: StoryItemType.Text,
      text: "",
      style: storyBodyStyle,
    };
    dispatch(writeTale_addStoryItem({ newStoryItem }));
  }, [writeTale_addStoryItem, dispatch, nanoid]);

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
  }, [writeTale_addStoryItem, bottomSheetRef, feedItemThumbnails, dispatch]);

  const onPressDeleteLinkedFeed = useCallback(
    (index: number) => {
      dispatch(writeTale_deleteStoryItem({ itemId: index }));
    },
    [writeTale_deleteStoryItem, dispatch],
  );

  const saveCoverToS3 = useCallback(async () => {
    /**
     * Get secure url from backend for uploading media to s3.
     * Set mediaType header
     */
    const secureS3UrlResponse = await axios.get(
      AWS_API_GATEWAY_S3_PRESIGNED_URL,
      {
        headers: { mediaType: data.cover?.type },
      },
    );

    const blobResponse = await fetch(
      data.cover?.uri?.replace("file:///", "file:/") ||
        "/Users/limxuanhui/bluextech/gypsie/assets/images/logo-no-background.png",
    );
    // console.log("BLOB response: ", blobResponse);
    const blob = await blobResponse.blob();

    // If failed to get secure s3 url
    if (secureS3UrlResponse.status !== 200) {
      console.error("Failed to get secure S3 url for uploading media");
      writeTale_setPosting(false);
      return;
    }

    // Upload media to s3 buckets
    // const response = await fetch(secureS3UrlResponse.data, {
    //   method: "PUT",
    //   body: blob,
    // });
    const response = await axios.put(secureS3UrlResponse.data, blob, {
      // Ensure blob data is not transformed (stringified) by axios in transformRequest
      // Refer to this link for more details: https://github.com/axios/axios/issues/2677
      transformRequest: data => data,
      headers: {
        "Content-Type": data.cover?.type,
      },
    });
    console.log("RESPONSE: ", response);
  }, [AWS_API_GATEWAY_S3_PRESIGNED_URL, data]);

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
    if (data?.cover) {
      const response = await saveCoverToS3();
      // If response not ok, throw Error and stop saving tale data.
      // AWS S3 will never store partial objects, so response ok means the entire object is stored successfully.
    }

    // Post request for saving blog data
    const url = BACKEND_BASE_URL + "/tales/new";
    const newTale = { cover: {}, title, feeds, itinerary, story };

    writeTale_setPosting(false);
    // dispatch(setMode({ mode: "view" }));
    // dispatch(resetWriteTaleSlice());
    // dispatch(resetItineraryPlannerSlice());
    // navigation.goBack()
  }, [cover, title, story, posting]);

  return {
    bottomSheetRef,
    snapPoints,
    keyboardIsVisible,
    id,
    cover,
    title,
    feeds,
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

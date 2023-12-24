import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  Asset,
  ImageLibraryOptions,
  ImagePickerResponse,
} from "react-native-image-picker";
import newItineraryPostSlice, {
  setCover,
  setTitle,
  createItinerary,
  setItinerary,
  addStoryItem,
  deleteStoryItem,
  setStoryItemText,
  setPosting,
  fetchFeeds,
} from "../redux/reducers/newTaleSlice";
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
import { Media, MediaMimeType } from "../../components/feed/types/types";

const imageLibraryOptions: ImageLibraryOptions = {
  mediaType: "mixed",
  presentationStyle: "fullScreen",
  selectionLimit: 1,
};

const useNewTaleManager = () => {
  const { openGallery } = useMediaHandlers(imageLibraryOptions);
  const { keyboardIsVisible, closeKeyboard } = useKeyboardHandlers();
  const { bottomSheetRef, snapPoints, renderBackdrop } = useBottomSheetHandlers(
    {
      snapPointsArr: [1, "50%"],
    },
  );
  const dispatch = useAppDispatch();
  const { id, cover, title, itinerary, story, feedItemThumbnails, posting } =
    useAppSelector(state => state.newTale);

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
      dispatch(setCover(cover));
    }
  }, [cover, dispatch, openGallery]);

  const onPressClearCover = useCallback(() => {
    dispatch(setCover(null));
  }, [setCover, dispatch]);

  const onPressClearPlan = useCallback(() => {
    dispatch(setItinerary({ routes: [] }));
  }, [dispatch, setItinerary]);

  const onTitleChange = useCallback(
    (text: string) => {
      dispatch(setTitle(text));
    },
    [setTitle, dispatch],
  );

  const onStoryItemTextChange = useCallback(
    (id: string, text: string) => {
      dispatch(setStoryItemText({ id, text }));
    },
    [setStoryItemText, dispatch],
  );

  const onPressAddTitle = useCallback(() => {
    const newStoryItem: StoryItem = {
      id: nanoid(),
      type: StoryItemType.Text,
      text: "",
      style: storyTitleStyle,
    };
    dispatch(addStoryItem({ newStoryItem }));
  }, [addStoryItem, dispatch, nanoid]);

  const onPressAddParagraph = useCallback(() => {
    const newStoryItem: StoryItem = {
      id: nanoid(),
      type: StoryItemType.Text,
      text: "",
      style: storyBodyStyle,
    };
    dispatch(addStoryItem({ newStoryItem }));
  }, [addStoryItem, dispatch, nanoid]);

  const onPressAddLinkedFeeds = useCallback(() => {
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
      addStoryItem({
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
  }, [addStoryItem, bottomSheetRef, feedItemThumbnails, dispatch]);

  const onPressDeleteLinkedFeed = useCallback(
    (index: number) => {
      dispatch(deleteStoryItem({ itemId: index }));
    },
    [deleteStoryItem, dispatch],
  );

  const onSubmitPost = useCallback(async () => {
    setPosting(true);
    const url = BACKEND_BASE_URL + "/itinerary/post";
    const data: {
      cover: Asset | null;
      title: string;
      story: Story;
    } = {
      cover,
      title,
      story,
    };

    // Get secure url from backend for uploading media to s3
    const secureS3UrlResponse = await axios.get(
      AWS_API_GATEWAY_S3_PRESIGNED_URL,
      {
        headers: { mediaType: data.cover?.type },
      },
    );
    console.log("TYPE: ", data.cover?.type);
    const blobResponse = await fetch(
      data.cover?.uri?.replace("file:///", "file:/") ||
        "/Users/limxuanhui/bluextech/gypsie/assets/images/logo-no-background.png",
    );
    // console.log("BLOB response: ", blobResponse);
    const blob = await blobResponse.blob();

    // If failed to get secure s3 url
    if (secureS3UrlResponse.status !== 200) {
      console.error("Failed to get secure S3 url for uploading media");
      setPosting(false);
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

    // Post request for saving blog data

    setPosting(false);
  }, [cover, title, story, posting]);

  useEffect(() => {
    // Fetch current user's fetchItemThumbnails
    console.log("status: ", feedItemThumbnails.status);
    if (feedItemThumbnails.status === "idle") {
      console.log("in useEffect for loading linked feeds list");
      dispatch(fetchFeeds("random user id "));
    }
  }, [feedItemThumbnails, fetchFeeds, dispatch]);

  useEffect(() => {
    console.log("Itinerary routes @@@@@@@@@@@@@@@@", JSON.stringify(itinerary));
  }, [itinerary]);

  return {
    bottomSheetRef,
    snapPoints,
    keyboardIsVisible,
    cover,
    title,
    itinerary,
    story,
    posting,
    feedItemThumbnails,
    closeKeyboard,
    renderBackdrop,
    onPressAddCover,
    onPressClearCover,
    onPressClearPlan,
    onTitleChange,
    onStoryItemTextChange,
    onPressAddTitle,
    onPressAddParagraph,
    onPressAddLinkedFeeds,
    onPressAddLinkedFeed,
    onPressDeleteLinkedFeed,
    onSubmitPost,
  };
};

export default useNewTaleManager;

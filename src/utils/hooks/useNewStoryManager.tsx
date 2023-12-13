import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Asset, ImageLibraryOptions } from "react-native-image-picker";
import {
  setCoverMedia,
  setTitle,
  setItineraryData,
  addStoryItem,
  deleteStoryItem,
  setStoryItemText,
  setPosting,
} from "../../utils/redux/reducers/newItineraryPostSlice";
import useMediaPicker from "./useMediaPicker";
import {
  Story,
  StoryItem,
  StoryItemType,
} from "../../components/post/types/types";
import axios from "axios";
import { storyTitleStyle, storyBodyStyle } from "../constants/text";
import useKeyboardManager from "./useKeyboardManager";
import useBottomSheetHandler from "./useBottomSheetHandler";
import { LinkedFeedsListItem } from "../../components/itinerary/types/types";
import { nanoid } from "@reduxjs/toolkit";

const userLinkedFeedList: LinkedFeedsListItem[][] = [
  [
    {
      feedId: "Nulla labore labore fugiat officia.",
      uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/japan-kyotoshrine.jpeg",
    },
    {
      feedId: "Nulla labore labore fugiat officia.",
      uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/singapore-satay.jpeg",
    },
    {
      feedId: "Nulla labore labore fugiat officia.",
      uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/taiwan-beach.jpeg",
    },
    {
      feedId: "Nulla labore labore fugiat officia.",
      uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/singapore-uss.jpg",
    },
  ],
  [
    {
      feedId: "Nulla labore labore fugiat officia.",
      uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/japan-kyotoshrine.jpeg",
    },
    {
      feedId: "Nulla labore labore fugiat officia.",
      uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/singapore-satay.jpeg",
    },
    {
      feedId: "Nulla labore labore fugiat officia.",
      uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/taiwan-beach.jpeg",
    },
    {
      feedId: "Nulla labore labore fugiat officia.",
      uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/singapore-uss.jpg",
    },
  ],
  [
    {
      feedId: "Nulla labore labore fugiat officia.",
      uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/japan-kyotoshrine.jpeg",
    },
    {
      feedId: "Nulla labore labore fugiat officia.",
      uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/singapore-satay.jpeg",
    },
    {
      feedId: "Nulla labore labore fugiat officia.",
      uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/taiwan-beach.jpeg",
    },
    {
      feedId: "Nulla labore labore fugiat officia.",
      uri: "/Users/limxuanhui/bluextech/gypsie/assets/images/singapore-uss.jpg",
    },
  ],
];

const imageLibraryOptions: ImageLibraryOptions = {
  mediaType: "mixed",
  presentationStyle: "fullScreen",
  selectionLimit: 1,
};

const useNewStoryManager = () => {
  const { openGallery } = useMediaPicker({ imageLibraryOptions });
  const { keyboardIsVisible, closeKeyboard } = useKeyboardManager();
  const { bottomSheetRef, snapPoints, renderBackdrop } = useBottomSheetHandler({
    snapPointsArr: [1, "50%"],
  });
  const dispatch = useAppDispatch();
  const { coverMedia, title, itineraryData, storyData, posting } =
    useAppSelector(state => state.newItineraryPost);

  const onPressAddCoverMedia = useCallback(async () => {
    const coverMediaResponse = await openGallery();
    let pickedCoverMedia;
    if (coverMediaResponse.assets && coverMediaResponse.assets.length > 0) {
      pickedCoverMedia = coverMediaResponse.assets[0];
      dispatch(setCoverMedia(pickedCoverMedia));
    }
  }, [coverMedia, dispatch, openGallery]);

  const onPressClearCoverMedia = useCallback(() => {
    dispatch(setCoverMedia(null));
  }, [setCoverMedia, dispatch]);

  const onPressClearPlan = useCallback(() => {
    dispatch(setItineraryData([]));
  }, [setItineraryData]);

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
    const selectedLinkedFeed = userLinkedFeedList[selectedLinkedFeedId];
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
  }, [addStoryItem, bottomSheetRef, userLinkedFeedList, dispatch]);

  const onPressDeleteLinkedFeed = useCallback(
    (index: number) => {
      dispatch(deleteStoryItem({ itemId: index }));
    },
    [deleteStoryItem, dispatch],
  );

  const onSubmitPost = useCallback(async () => {
    setPosting(true);
    // const url = "http://localhost:8080/itinerary/post";
    const data: {
      coverMedia: Asset | null;
      title: string;
      storyData: Story;
    } = {
      coverMedia,
      title,
      storyData,
    };

    // Get secure url from backend for uploading media to s3
    const apiGatewayUrl =
      "https://i0p8qk0h9a.execute-api.ap-southeast-1.amazonaws.com/default/getPresignedUrl";
    const secureS3UrlResponse = await axios.get(apiGatewayUrl, {
      headers: { mediaType: data.coverMedia?.type },
    });
    console.log("TYPE: ", data.coverMedia?.type);
    const blobResponse = await fetch(
      data.coverMedia?.uri?.replace("file:///", "file:/") ||
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
        "Content-Type": data.coverMedia?.type,
      },
    });

    console.log("RESPONSE: ", response);

    // Post request for saving blog data

    setPosting(false);
  }, [coverMedia, title, storyData, posting]);

  useEffect(() => {
    // Fetch current user's linked feeds list
  }, []);

  return {
    bottomSheetRef,
    snapPoints,
    keyboardIsVisible,
    coverMedia,
    title,
    itineraryData,
    storyData,
    posting,
    userLinkedFeedList,
    closeKeyboard,
    renderBackdrop,
    onPressAddCoverMedia,
    onPressClearCoverMedia,
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

export default useNewStoryManager;

import { useCallback, useContext, useEffect, useState } from "react";
import { Keyboard } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from "react-native-image-picker";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { FeedItem } from "../../components/feed/types/types";
import useModalHandlers from "./useModalHandlers";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  writeFeed_addItems,
  writeFeed_deleteItemById,
  writeFeed_editCaption,
  writeFeed_resetWriteFeedSlice,
  writeFeed_setPosting,
} from "../redux/reducers/writeFeedSlice";
import type { ModalNavigatorNavigationProp } from "../../components/navigators/types/types";
import { AWS_API_GATEWAY_S3_PRESIGNED_URLS_LIST, BACKEND_BASE_URL } from "@env";
import { AuthContext } from "../contexts/AuthContext";

const imageLibraryOptions: ImageLibraryOptions = {
  mediaType: "mixed",
  presentationStyle: "fullScreen",
  selectionLimit: 10,
};

const useWriteFeedManager = () => {
  const { user } = useContext(AuthContext);
  const { modalIsOpen, closeModal, openModal } = useModalHandlers();
  const navigation = useNavigation<ModalNavigatorNavigationProp>();
  const [captionWritten, setCaptionWritten] = useState<string>("");
  const {
    items,
    selectedItemId: currIndex,
    posting,
  } = useAppSelector(state => state.writeFeed);
  const dispatch = useAppDispatch();

  const onChangeCaption = useCallback(
    (text: string) => {
      setCaptionWritten(text);
    },
    [setCaptionWritten],
  );

  const openGallery = useCallback(async () => {
    await launchImageLibrary(imageLibraryOptions, res => {
      let newFeedItems = [];
      if (res.assets) {
        newFeedItems = res.assets.map(el => {
          return {
            id: uuidv4(),
            media: {
              id: uuidv4(),
              type: el.type,
              uri: el.uri,
              height: el.height,
              width: el.width,
            },
            caption: "",
          } as FeedItem;
        });
        dispatch(writeFeed_addItems({ id: currIndex, items: newFeedItems }));
        console.log(JSON.stringify(newFeedItems, null, 4));
      }
    });
  }, [
    writeFeed_addItems,
    currIndex,
    imageLibraryOptions,
    dispatch,
    launchImageLibrary,
  ]);

  const onPressAdd = useCallback(() => {
    openGallery();
  }, [openGallery]);

  const onPressDelete = useCallback(() => {
    dispatch(writeFeed_deleteItemById(currIndex));
  }, [currIndex, writeFeed_deleteItemById, dispatch]);

  const onDismissEditCaption = useCallback(() => {
    setCaptionWritten(items[currIndex]?.caption || "");
    closeModal();
  }, [items, currIndex, closeModal, setCaptionWritten]);

  const onPressEdit = useCallback(() => {
    openModal();
  }, [openModal]);

  const onPressPost = useCallback(async () => {
    dispatch(writeFeed_setPosting(true));
    if (!user) return;

    const url = `${BACKEND_BASE_URL}/api/feeds`;
    console.warn("Posting!");

    // For new feed
    // 0) Blobify each of the media files
    const blobifyStartTime = performance.now();
    let blobs: Blob[] = [];
    try {
      blobs = await Promise.all(
        items.map(async el => {
          const blobResponse = await fetch(
            el.media.uri.replace("file:///", "file:/"),
          );
          const blob = await blobResponse.blob();
          return blob;
        }),
      );
    } catch (err) {
      console.error("Error creating blob: ", err);
      return;
    }
    const blobifyExeTime = performance.now() - blobifyStartTime;

    // 1) Generate array of mimetypes from items
    const mediaTypesList = items.map(el => el.media.type);

    // 2) Get presigned url for each of the media files from AWS lambda
    const presignedUrlsStartTime = performance.now();
    const getPresignedUrlsResponse = await axios.post(
      AWS_API_GATEWAY_S3_PRESIGNED_URLS_LIST,
      mediaTypesList,
    );

    const presignedUrls = getPresignedUrlsResponse.data.map(
      (el: { data: any }) => {
        if (el.data) {
          return el.data.url;
        }
      },
    );

    const keys = getPresignedUrlsResponse.data.map((el: { data: any }) => {
      if (el.data) {
        return el.data.key;
      }
    });

    const presignedUrlsExeTime = performance.now() - presignedUrlsStartTime;

    // Verify blobs and presignedUrls are same length
    if (blobs.length !== presignedUrls.length) return;

    // axios.post(url,{},{onUploadProgress: (progressEvent)=> {console.log("Progress: ", progressEvent)}})

    // 3) Promise.all for uploading all the media files to s3
    const uploadFilesStartTime = performance.now();
    let uploadMediaFilesResponse;
    try {
      uploadMediaFilesResponse = await Promise.all(
        presignedUrls.map((url: string, index: number) =>
          axios.put(url, blobs[index], {
            // Ensure blob data is not transformed (stringified) by axios in transformRequest
            // Refer to this link for more details: https://github.com/axios/axios/issues/2677
            transformRequest: data => data,
          }),
        ),
      );
    } catch (err) {
      console.error("Error uploading media files: ", err);
      return;
    }
    const uploadFilesExeTime = performance.now() - uploadFilesStartTime;
    console.log("---------- Blobify took: ", blobifyExeTime);
    console.log("---------- Get presigned urls took: ", presignedUrlsExeTime);
    console.log("---------- Upload files took: ", uploadFilesExeTime);

    // 4) If success from Promise.all, proceed, else try to check for uploaded media files, and delete them.
    console.log(JSON.stringify(uploadMediaFilesResponse[0].status, null, 4));

    // 5) Success in uploading all media files, dispatch to save the new media file names
    const feedData = items.map((el: FeedItem, index: number) => {
      return { ...el, media: { ...el.media, uri: keys[index] } };
    });
    const requestData = { creatorId: user.id, feedItems: feedData };
    console.log(
      "Feed data to be saved in backend:",
      JSON.stringify(requestData, null, 4),
    );

    // 6) Upload feed to backend url at /api/feeds with axios.post (or axios.put/patch)
    const uploadMetadataResponse = await axios.post(url, requestData);
    console.log(
      "Metadata response: ",
      JSON.stringify(uploadMetadataResponse, null, 4),
    );

    // 7) If success in uploading feed, proceed, else try to try to check for uploaded media files, and delete them.

    // 8) Navigate back to home screen with navigation.goBack(), dispatch resetWriteFeedSlice, invalidate query cache for feeds, feeds-md

    setTimeout(() => {
      dispatch(writeFeed_setPosting(false));
      dispatch(writeFeed_resetWriteFeedSlice());
      navigation.goBack();
    }, 2000);

    // Navigate to home
  }, [
    items,
    navigation,
    writeFeed_resetWriteFeedSlice,
    writeFeed_setPosting,
    dispatch,
  ]);

  const onSaveEditCaption = useCallback(() => {
    Keyboard.dismiss();
    dispatch(writeFeed_editCaption({ id: currIndex, caption: captionWritten }));
    closeModal();
  }, [captionWritten, currIndex, writeFeed_editCaption, closeModal, dispatch]);

  useEffect(() => {
    setCaptionWritten(items[currIndex]?.caption || "");
  }, [currIndex, items, setCaptionWritten]);

  return {
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
    onPressPost,
    onSaveEditCaption,
  };
};

export default useWriteFeedManager;

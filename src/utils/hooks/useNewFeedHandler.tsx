import { useCallback, useEffect, useState } from "react";
import { Keyboard } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from "react-native-image-picker";
import { FeedItem } from "../../components/feed/types/types";
import useModalHandler from "./useModalHandler";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  addItems,
  deleteItemById,
  editCaption,
  reset,
  setPosting,
  setSaving,
} from "../redux/reducers/newFeedPostSlice";
import type { ModalNavigatorNavigationProp } from "../../components/navigators/types/types";

const imageLibraryOptions: ImageLibraryOptions = {
  mediaType: "mixed",
  presentationStyle: "fullScreen",
  selectionLimit: 10,
};

const useNewFeedHandler = () => {
  const { modalIsOpen, closeModal, openModal } = useModalHandler();
  const navigation = useNavigation<ModalNavigatorNavigationProp>();
  const [captionWritten, setCaptionWritten] = useState<string>("");
  const {
    items,
    selectedItemId: currIndex,
    posting,
    saving,
  } = useAppSelector(state => state.newFeedPost);
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
            id: Math.random().toString(),
            media: {
              type: el.type,
              uri: el.uri,
            },
            caption: "",
            mapLink: "",
          } as FeedItem;
        });
        dispatch(addItems({ id: currIndex, items: newFeedItems }));
      }
    });
  }, [addItems, currIndex, imageLibraryOptions, dispatch, launchImageLibrary]);

  const onPressAdd = useCallback(() => {
    openGallery();
  }, [openGallery]);

  const onPressDelete = useCallback(() => {
    dispatch(deleteItemById(currIndex));
  }, [currIndex, deleteItemById, dispatch]);

  const onDismissEditCaption = useCallback(() => {
    setCaptionWritten(items[currIndex]?.caption || "");
    closeModal();
  }, [items, currIndex, closeModal]);

  const onPressEdit = useCallback(() => {
    openModal();
  }, [openModal]);

  const onPressPost = useCallback(() => {
    dispatch(setPosting(true));
    console.warn("Posting!");
    console.log(JSON.stringify(items, null, 4));

    // Http request to post api endpoint

    setTimeout(() => {
      dispatch(setPosting(false));
      dispatch(reset());
      navigation.goBack();
    }, 2000);

    // Navigate to home
  }, [items, navigation, reset, setPosting, dispatch]);

  const onSaveEditCaption = useCallback(() => {
    console.log("Saving changes");
    console.log("CaptionWritten: ", captionWritten);
    Keyboard.dismiss();
    // dispatch(setSaving(true));
    dispatch(editCaption({ id: currIndex, caption: captionWritten }));
    // dispatch(setSaving(false));
    closeModal();
  }, [captionWritten, currIndex, editCaption, setSaving, closeModal, dispatch]);

  useEffect(() => {
    setCaptionWritten(items[currIndex]?.caption || "");
  }, [currIndex]);

  return {
    captionWritten,
    modalIsOpen,
    posting,
    saving,
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

export default useNewFeedHandler;

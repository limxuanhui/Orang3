import { useEffect } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useNewFeedManager from "../../../utils/hooks/useNewFeedManager";
import GypsieButton from "../../common/buttons/GypsieButton";
import AuxiliaryControls from "../../common/AuxiliaryControls";
import NewFeedCarousel from "../../post/NewFeedCarousel";
import NewFeedSideControls from "../../post/NewFeedSideControls";
import CheckIcon from "../../common/icons/CheckIcon";
import CloseIcon from "../../common/icons/CloseIcon";
import {
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
} from "../../../utils/constants/constants";
import { DIMENSION } from "../../../utils/constants/dimensions";
import { PALETTE } from "../../../utils/constants/palette";
import { useAppDispatch, useAppSelector } from "../../../utils/redux/hooks";
import { reset } from "../../../utils/redux/reducers/newFeedSlice";

const NewFeedScreen = () => {
  const insets = useSafeAreaInsets();
  // Use global object to get handle
  // const handle = "@Joseph";
  const {
    captionWritten,
    modalIsOpen,
    closeModal,
    onChangeCaption,
    onDismissEditCaption,
    onPressAdd,
    onPressDelete,
    onPressEdit,
    onPressPost,
    onSaveEditCaption,
  } = useNewFeedManager();
  const { saving } = useAppSelector(state => state.newFeed);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("NewFeedScreen focused");
    return () => {
      console.log("NewFeedScreen unfocused");
      dispatch(reset());
    };
  }, [reset, dispatch]);

  return (
    <View style={styles.container}>
      <NewFeedCarousel />
      <NewFeedSideControls
        onPressAdd={onPressAdd}
        onPressDelete={onPressDelete}
        onPressEdit={onPressEdit}
        onPressPost={onPressPost}
      />
      <Modal
        transparent
        visible={modalIsOpen}
        presentationStyle="overFullScreen"
        onRequestClose={closeModal}
        animationType="slide">
        <KeyboardAvoidingView
          style={[styles.keyboardAvoidingView, { paddingTop: insets.top + 20 }]}
          behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <AuxiliaryControls orientation="vertical" position="top-right">
            <GypsieButton
              customButtonStyles={[styles.auxControlButton]}
              customIconStyles={styles.auxControlIcon}
              Icon={CloseIcon}
              onPress={onDismissEditCaption}
            />
            <GypsieButton
              customButtonStyles={[styles.auxControlButton, styles.saveButton]}
              customIconStyles={styles.auxControlIcon}
              Icon={CheckIcon}
              loading={saving}
              onPress={onSaveEditCaption}
            />
          </AuxiliaryControls>
          <TextInput
            style={styles.textInput}
            placeholder="Write a caption..."
            placeholderTextColor={PALETTE.LIGHTGREY}
            onChangeText={onChangeCaption}
            value={captionWritten}
            multiline
            autoFocus
          />
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
    alignItems: "center",
    backgroundColor: PALETTE.BLACK,
  },
  openGalleryButton: {
    position: "absolute",
    flexDirection: "row",
    top: DEVICE_HEIGHT / 3,
    justifyContent: "center",
    alignItems: "center",
    width: "auto",
    padding: 8,
    borderWidth: 1,
    borderColor: PALETTE.BLACK,
    borderRadius: 8,
    backgroundColor: PALETTE.OFFWHITE,
    zIndex: 100,
  },
  openGalleryIcon: { marginRight: 8, fontSize: 18 },
  openGalleryText: { alignSelf: "flex-end" },
  buttonText: {
    fontFamily: "Futura",
    fontSize: 16,
    fontWeight: "bold",
  },
  keyboardAvoidingView: {
    height: DIMENSION.HUNDRED_PERCENT,
    width: DIMENSION.HUNDRED_PERCENT,
    backgroundColor: "#000000cc",
  },
  textInput: {
    height: DIMENSION.HUNDRED_PERCENT,
    width: DIMENSION.NINETY_PERCENT,
    padding: 16,
    borderRadius: 4,
    fontFamily: "Futura",
    fontSize: 24,
    color: PALETTE.OFFWHITE,
  },
  auxControlButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 40,
  },
  auxControlIcon: { fontSize: 24, color: PALETTE.OFFWHITE },
  saveButton: { backgroundColor: PALETTE.ORANGE },
});

export default NewFeedScreen;

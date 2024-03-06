import { StyleSheet } from "react-native";
import { useAppSelector } from "../../utils/redux/hooks";
import AuxiliaryControls from "../common/AuxiliaryControls";
import AddMoreIcon from "../common/icons/AddMoreIcon";
import DeleteOutlineIcon from "../common/icons/DeleteOutlineIcon";
import EditIcon from "../common/icons/EditIcon";
import GypsieButton from "../common/buttons/GypsieButton";
import type { WriteFeedSideControlsProps } from "./types/types";
import { PALETTE } from "../../utils/constants/palette";

const WriteFeedSideControls = ({
  onPressAdd,
  onPressDelete,
  onPressEdit,
  onPressPost,
}: WriteFeedSideControlsProps) => {
  const { items, posting } = useAppSelector(state => state.writeFeed);
  const isValidPost = items.length > 0;

  return (
    <AuxiliaryControls>
      <GypsieButton
        customButtonStyles={styles.button}
        customIconStyles={styles.icon}
        Icon={AddMoreIcon}
        disabled={posting}
        onPress={onPressAdd}
      />
      <GypsieButton
        customButtonStyles={styles.button}
        customIconStyles={[
          styles.icon,
          { color: isValidPost ? PALETTE.WHITE : PALETTE.GREY },
        ]}
        Icon={EditIcon}
        disabled={!isValidPost || posting}
        onPress={onPressEdit}
      />
      <GypsieButton
        customButtonStyles={styles.button}
        customIconStyles={[
          styles.icon,
          { color: isValidPost ? PALETTE.WHITE : PALETTE.GREY },
        ]}
        Icon={DeleteOutlineIcon}
        disabled={!isValidPost || posting}
        onPress={onPressDelete}
      />
      <GypsieButton
        customButtonStyles={[
          styles.postButton,
          { backgroundColor: isValidPost ? PALETTE.ORANGE : PALETTE.GREY },
        ]}
        customTextStyles={styles.postButtonText}
        text="Post"
        loading={posting}
        disabled={!isValidPost || posting}
        onPress={onPressPost}
      />
    </AuxiliaryControls>
  );
};

const styles = StyleSheet.create({
  button: { width: 40, height: 40 },
  icon: { fontSize: 24, color: PALETTE.WHITE },
  postButton: {
    width: 60,
    height: 36,
    marginRight: 20,
    paddingHorizontal: 8,
    zIndex: 101,
  },
  postButtonText: {
    fontFamily: "Futura",
    fontSize: 16,
    fontWeight: "bold",
    color: PALETTE.WHITE,
  },
});

export default WriteFeedSideControls;

import { StyleSheet } from 'react-native';
import { useAppSelector } from '@redux/hooks';
import AuxiliaryControls from '@components/common/AuxiliaryControls';
import AddMoreIcon from '@components/common/icons/AddMoreIcon';
import DeleteOutlineIcon from '@components/common/icons/DeleteOutlineIcon';
import EditIcon from '@components/common/icons/EditIcon';
import GypsieButton from '@components/common/buttons/GypsieButton';
import type { WriteFeedSideControlsProps } from './types/types';
import { PALETTE } from '@constants/palette';

const WriteFeedSideControls = ({
  onPressAdd,
  onPressDelete,
  onPressEdit,
  onPressPost,
}: WriteFeedSideControlsProps) => {
  const { mode, items, posting, changes } = useAppSelector(
    state => state.writeFeed,
  );

  const isValidPost = items.length > 0;
  const postButtonIsDisabled: boolean =
    posting || !isValidPost || (mode === 'EDIT' && changes.type === 'NONE');

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
          { color: !isValidPost ? PALETTE.GREY : PALETTE.WHITE },
        ]}
        Icon={EditIcon}
        disabled={!isValidPost || posting}
        onPress={onPressEdit}
      />
      <GypsieButton
        customButtonStyles={styles.button}
        customIconStyles={[
          styles.icon,
          { color: !isValidPost ? PALETTE.GREY : PALETTE.WHITE },
        ]}
        Icon={DeleteOutlineIcon}
        disabled={!isValidPost || posting}
        onPress={onPressDelete}
      />
      {
        <GypsieButton
          customButtonStyles={[
            styles.postButton,
            {
              backgroundColor: postButtonIsDisabled
                ? PALETTE.GREY
                : PALETTE.ORANGE,
            },
          ]}
          customTextStyles={styles.postButtonText}
          text={mode === 'NEW' ? 'Post' : 'Save'}
          loading={posting}
          disabled={postButtonIsDisabled}
          onPress={onPressPost}
        />
      }
    </AuxiliaryControls>
  );
};

const styles = StyleSheet.create({
  button: { width: 40, height: 40 },
  icon: { fontSize: 24, color: PALETTE.WHITE },
  postButton: {
    width: 60,
    // width: 80,
    height: 36,
    marginRight: 20,
    // paddingHorizontal: 8,
    zIndex: 101,
  },
  postButtonText: {
    fontFamily: 'Futura',
    fontSize: 16,
    fontWeight: 'bold',
    color: PALETTE.WHITE,
  },
  editButtonText: {
    fontFamily: 'Futura',
    fontSize: 12,
    fontWeight: 'bold',
    color: PALETTE.WHITE,
  },
});

export default WriteFeedSideControls;

import { useCallback, useContext } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { useQueryClient } from '@tanstack/react-query';
import GypsieButton from '@components/common/buttons/GypsieButton';
import DeleteAccountModal from '@components/profile/DeleteAccountModal';
import { PALETTE } from '@constants/palette';
import { AuthContext } from '@contexts/AuthContext';
import useModalHandlers from '@hooks/useModalHandlers';
import { DEVICE_WIDTH } from '@constants/constants';
import GypsieBulletText from '@components/common/GypsieBulletText';

const DeleteScreen = () => {
  const { user, logoutHandler, deleteUserHandler } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const { modalIsOpen, closeModal, openModal } = useModalHandlers();

  const onConfirmDelete = useCallback(
    async (userId: string) => {
      console.warn(userId);
      // Delete account with userid
      deleteUserHandler(userId);

      // Clear cache
      queryClient.clear();

      // Clear tokens
      logoutHandler();
      closeModal();
    },
    [closeModal, deleteUserHandler, logoutHandler, queryClient],
  );

  const onPressDelete = useCallback(() => {
    openModal();
  }, [openModal]);

  return (
    <View style={styles.container}>
      <Modal
        transparent
        visible={modalIsOpen}
        presentationStyle="overFullScreen"
        onRequestClose={closeModal}
        animationType="none">
        <DeleteAccountModal onConfirm={onConfirmDelete} onCancel={closeModal} />
      </Modal>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {user?.handle}, do you want to delete this account?
        </Text>

        <Text style={styles.sectionItemSubtitle}>
          If you delete your account:
        </Text>
        <GypsieBulletText
          customBulletStyles={styles.sectionItemSubtitle}
          customTextStyles={styles.sectionItemSubtitle}
          text="You account will first be deactivated for 30 days. No one will see
          your account and content."
        />
        <GypsieBulletText
          customBulletStyles={styles.sectionItemSubtitle}
          customTextStyles={styles.sectionItemSubtitle}
          text="Information that isn't stored in your account, such as direct
          messages, may still be visible to others."
        />
        <GypsieBulletText
          customBulletStyles={styles.sectionItemSubtitle}
          customTextStyles={styles.sectionItemSubtitle}
          text="Orang3 will continue to keep your data for 30 days."
        />
        <GypsieBulletText
          customBulletStyles={styles.sectionItemSubtitle}
          customTextStyles={styles.sectionItemSubtitle}
          text="You may cancel the deletion request by logging in within 30 days,
            using the same login details."
        />
        <GypsieBulletText
          customBulletStyles={styles.sectionItemSubtitle}
          customTextStyles={styles.sectionItemSubtitle}
          text="After 30 days, all your content will be permanently deleted."
        />
      </View>
      <GypsieButton
        customButtonStyles={styles.deleteButton}
        customTextStyles={styles.deleteText}
        text="I want to delete my Orang3 account"
        onPress={onPressDelete}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: PALETTE.OFFWHITE,
  },
  section: {
    paddingHorizontal: 32,
  },
  sectionTitle: {
    marginBottom: 8,
    fontFamily: 'Futura',
    fontSize: 20,
    fontWeight: 'bold',
  },
  sectionItemSubtitle: {
    marginVertical: 8,
    fontFamily: 'Futura',
    fontWeight: 'normal',
    fontSize: 14,
    color: PALETTE.DARKGREY,
  },
  deleteButton: {
    bottom: 50,
    height: 40,
    width: DEVICE_WIDTH - 64,
    borderRadius: 8,
    backgroundColor: PALETTE.REDPINK,
  },
  deleteText: {
    fontFamily: 'Futura',
    fontSize: 14,
    fontWeight: 'bold',
    color: PALETTE.WHITE,
  },
});

export default DeleteScreen;

import { useCallback, useContext, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { DIMENSION } from '@constants/dimensions';
import { PALETTE } from '@constants/palette';
import { AuthContext } from '@contexts/AuthContext';
import GypsieButton from '@components/common/buttons/GypsieButton';

type DeleteAccountModalProps = {
  onConfirm: (text: string) => void;
  onCancel: () => void;
};

const DeleteAccountModal = ({
  onConfirm,
  onCancel,
}: DeleteAccountModalProps) => {
  const { user, loading } = useContext(AuthContext);
  const [enteredUserId, setEnteredUserId] = useState<string>('');
  const confirmButtonIsDisabled = enteredUserId !== user?.id || loading;

  const onPressConfirm = useCallback(() => {
    onConfirm(enteredUserId);
  }, [enteredUserId, onConfirm]);

  return (
    <KeyboardAvoidingView
      style={[styles.keyboardAvoidingView]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}>
      <View style={styles.container}>
        <View style={styles.modalCard}>
          <Text style={styles.modalTitle}>
            Are you sure you want to delete your account?
          </Text>
          <Text style={styles.modalSubtitle}>
            This action will be irreversible after 30 days!{'\n'}Your user id is
            shown below:
          </Text>
          <Text style={styles.modalSubtitle2}>{user?.id}</Text>
          <TextInput
            style={styles.modalTextInput}
            placeholder={'Enter your user id to confirm'}
            value={enteredUserId}
            autoFocus
            selectionColor={PALETTE.ORANGE}
            onChangeText={text => setEnteredUserId(text)}
          />
          <View style={styles.modalControls}>
            <GypsieButton
              customButtonStyles={({ pressed }) => [
                styles.modalControl,
                styles.cancelButton,
                {
                  opacity: pressed ? 0.5 : 1,
                },
              ]}
              customTextStyles={styles.cancelButtonText}
              text="Cancel"
              onPress={onCancel}
            />
            <GypsieButton
              customButtonStyles={({ pressed }) => [
                styles.modalControl,
                styles.confirmButton,
                {
                  opacity: pressed ? 0.9 : 1,
                  backgroundColor: confirmButtonIsDisabled
                    ? PALETTE.GREY
                    : PALETTE.REDPINK,
                },
              ]}
              customTextStyles={styles.confirmButtonText}
              text="Delete my account"
              loading={loading}
              disabled={confirmButtonIsDisabled}
              onPress={onPressConfirm}
            />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    height: DIMENSION.HUNDRED_PERCENT,
    width: DIMENSION.HUNDRED_PERCENT,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: DIMENSION.HUNDRED_PERCENT,
    width: DIMENSION.HUNDRED_PERCENT,
    backgroundColor: '#000000cc',
  },
  modalCard: {
    justifyContent: 'space-between',
    alignSelf: 'center',
    height: 250,
    width: 360,
    borderRadius: 16,
    backgroundColor: PALETTE.WHITE,
    elevation: 8,
    shadowColor: PALETTE.BLACK,
    shadowOpacity: 0.1,
    shadowOffset: { height: 2, width: 0 },
  },
  modalTitle: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    fontFamily: 'Futura',
    fontSize: 20,
    fontWeight: 'bold',
    color: PALETTE.REDPINK,
  },
  modalSubtitle: {
    marginHorizontal: 16,
    fontFamily: 'Futura',
    fontSize: 14,
    color: PALETTE.DARKGREY,
  },
  modalSubtitle2: {
    marginHorizontal: 16,
    marginVertical: 8,
    fontFamily: 'Futura',
    fontSize: 14,
    color: PALETTE.GREYISHBLUE,
    letterSpacing: 2,
  },
  modalTextInput: {
    padding: 16,
    backgroundColor: PALETTE.OFFWHITE,
    fontFamily: 'Futura',
    fontSize: 14,
    color: PALETTE.RED,
    letterSpacing: 2,
    flexWrap: 'wrap',
  },
  modalControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: DIMENSION.HUNDRED_PERCENT,
  },
  modalControl: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: DIMENSION.FIFTY_PERCENT,
    padding: 6,
  },
  cancelButton: {
    borderRadius: 0,
    borderBottomLeftRadius: 16,
    backgroundColor: PALETTE.WHITE,
  },
  cancelButtonText: {
    fontSize: 16,
    fontFamily: 'Futura',
    color: PALETTE.REDPINK,
  },
  confirmButton: {
    borderRadius: 0,
    borderBottomRightRadius: 16,
    backgroundColor: PALETTE.ORANGE,
  },
  confirmButtonText: {
    fontSize: 16,
    fontFamily: 'Futura',
    color: PALETTE.WHITE,
  },
});

export default DeleteAccountModal;

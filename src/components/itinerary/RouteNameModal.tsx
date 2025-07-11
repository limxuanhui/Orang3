import { useCallback, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import type { RouteNameModalProps } from './types/types';
import { DEVICE_HEIGHT } from '@constants/constants';
import { DIMENSION } from '@constants/dimensions';
import { PALETTE } from '@constants/palette';
import {
  itineraryPlanner_addRoute,
  itineraryPlanner_closeModal,
  itineraryPlanner_reorderRoutes,
  itineraryPlanner_updateRouteName,
} from '@redux/reducers/itineraryPlannerSlice';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { writeTale_updateRoutesType } from '@redux/reducers/writeTaleSlice';

const RouteNameModal = ({ initialValue }: RouteNameModalProps) => {
  const [name, setName] = useState<string>(initialValue);
  const dispatch = useAppDispatch();
  const { mode, changes } = useAppSelector(state => state.writeTale);

  const onConfirm = useCallback(() => {
    if (initialValue === '') {
      dispatch(itineraryPlanner_addRoute({ name }));
      dispatch(itineraryPlanner_reorderRoutes());

      if (mode === 'EDIT') {
        if (changes.routes.type !== 'MUTATE') {
          dispatch(writeTale_updateRoutesType({ type: 'MUTATE' }));
        }
      }
    } else {
      dispatch(itineraryPlanner_updateRouteName({ name }));

      if (mode === 'EDIT') {
        if (changes.routes.type === 'NONE') {
          dispatch(writeTale_updateRoutesType({ type: 'ONLY_EDITED_ROUTES' }));
        }
      }
    }
  }, [initialValue, dispatch, name, mode, changes.routes.type]);

  const onCancel = useCallback(() => {
    dispatch(itineraryPlanner_closeModal());
  }, [dispatch]);

  const confirmButtonIsDisabled = name === '';

  return (
    <View style={styles.container}>
      <View style={styles.modalCard}>
        <Text style={styles.modalTitle}>New route name</Text>
        <TextInput
          style={styles.modalTextInput}
          placeholder="Enter route name"
          value={name}
          autoFocus
          onChangeText={text => setName(text)}
        />
        <View style={styles.modalControls}>
          <Pressable
            style={({ pressed }) => [
              styles.modalControl,
              styles.cancelButton,
              { opacity: pressed ? 0.7 : 1 },
            ]}
            onPress={onCancel}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.modalControl,
              styles.confirmButton,
              {
                opacity: pressed ? 0.7 : 1,
                backgroundColor: confirmButtonIsDisabled
                  ? PALETTE.LIGHTGREY
                  : PALETTE.ORANGE,
              },
            ]}
            onPress={onConfirm}
            disabled={confirmButtonIsDisabled}>
            <Text style={styles.confirmButtonText}>Confirm</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000aa',
  },
  modalCard: {
    alignSelf: 'center',
    justifyContent: 'space-between',
    top: DEVICE_HEIGHT / 2 - 100,
    height: 180,
    width: 300,
    borderRadius: 16,
    backgroundColor: PALETTE.WHITE,
    elevation: 8,
    shadowColor: PALETTE.BLACK,
    shadowOpacity: 0.1,
    shadowOffset: { height: 2, width: 0 },
  },
  modalTitle: {
    margin: 16,
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Futura',
  },
  modalTextInput: {
    flex: 1,
    padding: 16,
    backgroundColor: PALETTE.OFFWHITE,
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
    borderBottomLeftRadius: 16,
    backgroundColor: PALETTE.WHITE,
  },
  cancelButtonText: {
    fontSize: 16,
    fontFamily: 'Futura',
    color: PALETTE.RED,
  },
  confirmButton: {
    borderBottomRightRadius: 16,
    backgroundColor: PALETTE.ORANGE,
  },
  confirmButtonText: {
    fontSize: 16,
    fontFamily: 'Futura',
    color: PALETTE.WHITE,
  },
});

export default RouteNameModal;

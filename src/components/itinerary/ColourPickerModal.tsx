import { useState, useCallback } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import ColorPicker, {
  Swatches,
  returnedResults,
} from 'reanimated-color-picker';
import { DIMENSION } from '@constants/dimensions';
import { PALETTE } from '@constants/palette';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import {
  itineraryPlanner_closeModal,
  itineraryPlanner_confirmRouteNodeColour,
} from '@redux/reducers/itineraryPlannerSlice';
import LocationPinIcon from '@icons/LocationPinIcon';
import { writeTale_updateRoutesType } from '@redux/reducers/writeTaleSlice';

type ColourPickerModalProps = {
  initialColour: string;
};

// #f44336ff
// #e91e63ff
// #9c27b0ff
// #673ab7ff
// #3f51b5ff
// #2196f3ff
// #03a9f4ff
// #00bcd4ff
// #009688ff
// #4caf50ff
// #8bc34aff
// #cddc39ff
// #ffeb3bff
// #ffc107ff
// #ff9800ff
// #ff5722ff
// #795548ff
// #9e9e9eff
// #607d8bff

const ColourPickerModal = ({ initialColour }: ColourPickerModalProps) => {
  const [colour, setColour] = useState<string>(initialColour || '#f44336ff');
  const dispatch = useAppDispatch();
  const { mode, changes } = useAppSelector(state => state.writeTale);
  const { selectedRouteNodeId } = useAppSelector(
    state => state.itineraryPlanner,
  );

  //   Note: 👇 This can be a `worklet` function.
  const onSelectColor = useCallback(
    (colors: returnedResults) => {
      'worklet';
      setColour(colors.hex);
    },
    [setColour],
  );

  const onConfirm = useCallback(() => {
    dispatch(
      itineraryPlanner_confirmRouteNodeColour({
        routeNodeId: selectedRouteNodeId,
        colour,
      }),
    );

    if (mode === 'EDIT') {
      if (changes.routes.type === 'NONE') {
        dispatch(writeTale_updateRoutesType({ type: 'ONLY_EDITED_ROUTES' }));
      }
    }
    dispatch(itineraryPlanner_closeModal());
  }, [dispatch, selectedRouteNodeId, colour, mode, changes.routes.type]);

  const onCancel = useCallback(() => {
    dispatch(itineraryPlanner_closeModal());
  }, [dispatch]);

  const confirmButtonIsDisabled = colour === '';

  return (
    <View style={styles.container}>
      <View style={styles.modalCard}>
        <View style={styles.modalCardInner}>
          <LocationPinIcon style={{ color: colour, fontSize: 80 }} />
          <ColorPicker
            style={{ width: '80%' }}
            value={colour}
            onChange={onSelectColor}>
            <Swatches />
          </ColorPicker>
        </View>
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
    // top: DEVICE_HEIGHT / 2 - 100,
    top: '25%',
    height: '50%',
    width: '100%',
    borderRadius: 16,
    backgroundColor: PALETTE.WHITE,
    elevation: 8,
    shadowColor: PALETTE.BLACK,
    shadowOpacity: 0.1,
    shadowOffset: { height: 2, width: 0 },
  },
  modalCardInner: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: PALETTE.GREYISHBLUE,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
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

export default ColourPickerModal;

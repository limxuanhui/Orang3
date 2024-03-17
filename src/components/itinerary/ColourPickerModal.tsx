import { useState, useCallback } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { DIMENSION } from '../../utils/constants/dimensions';
import { PALETTE } from '../../utils/constants/palette';
import { useAppDispatch, useAppSelector } from '../../utils/redux/hooks';
import {
  itineraryPlanner_closeModal,
  itineraryPlanner_confirmRouteNodeColour,
} from '../../utils/redux/reducers/itineraryPlannerSlice';
import LocationPinIcon from '../common/icons/LocationPinIcon';
import ColorPicker, {
  Swatches,
  returnedResults,
} from 'reanimated-color-picker';
import { useWorkletCallback } from 'react-native-reanimated';

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

const ColourPickerModal = ({
  // routeNodeId
  initialColour,
}: ColourPickerModalProps) => {
  const [colour, setColour] = useState<string>(initialColour || '#f44336ff');
  const dispatch = useAppDispatch();
  const { selectedRouteNodeId } = useAppSelector(
    state => state.itineraryPlanner,
  );

  //   Note: 👇 This can be a `worklet` function.
  const onSelectColor = useWorkletCallback(
    (colors: returnedResults) => {
      setColour(colors.hex);
      console.log(colors.hex);
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
    dispatch(itineraryPlanner_closeModal());
  }, [dispatch, selectedRouteNodeId, colour]);

  const onCancel = useCallback(() => {
    dispatch(itineraryPlanner_closeModal());
  }, [dispatch]);

  const confirmButtonIsDisabled = colour === '';

  return (
    <View style={styles.container}>
      <View style={styles.modalCard}>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-evenly',
            alignItems: 'center',
            backgroundColor: PALETTE.GREYISHBLUE,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          }}>
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

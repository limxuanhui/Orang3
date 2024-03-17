import { useCallback } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Portal } from '@gorhom/portal';
import SunnyIcon from '@icons/SunnyIcon';
import type { ModalNavigatorNavigationProp } from '@navigators/types/types';
import { DIMENSION } from '@constants/dimensions';
import { PALETTE } from '@constants/palette';
import useBottomSheetHandlers from '@hooks/useBottomSheetHandlers';

const NewPostOptions = () => {
  const navigation = useNavigation<ModalNavigatorNavigationProp>();
  const {
    bottomSheetRef,
    snapPoints,
    closeBottomSheet,
    openBottomSheet,
    renderBackdrop,
  } = useBottomSheetHandlers({ snapPointsArr: [1, '20%'] });

  // Callback function that gets called when the bottom sheet changes
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  // Expands the bottom sheet when our button is pressed
  const onPressAddButton = useCallback(() => {
    openBottomSheet();
  }, [openBottomSheet]);

  const onPressNewFeed = useCallback(() => {
    closeBottomSheet();
    navigation.navigate('Modal', { screen: 'WriteFeed' });
  }, [closeBottomSheet, navigation]);

  const onPressNewTale = useCallback(() => {
    closeBottomSheet();
    navigation.navigate('Modal', { screen: 'WriteTale', params: {} });
  }, [closeBottomSheet, navigation]);

  return (
    <View style={styles.container}>
      <Pressable onPress={onPressAddButton}>
        <SunnyIcon style={{ fontSize: 40, color: PALETTE.ORANGE }} />
      </Pressable>
      <Portal>
        <BottomSheet
          backgroundStyle={styles.bottomSheet}
          handleStyle={styles.bottomSheetHandle}
          handleIndicatorStyle={styles.bottomSheetHandleIndicator}
          ref={bottomSheetRef}
          index={-1} // Hide the bottom sheet when we first load our component
          snapPoints={snapPoints}
          backdropComponent={renderBackdrop}
          onChange={handleSheetChanges}>
          <BottomSheetView style={styles.bottomSheetContent}>
            <Pressable
              style={({ pressed }) => [
                styles.button,
                {
                  transform: [{ scale: pressed ? 0.99 : 1 }],
                },
              ]}
              onPress={onPressNewFeed}>
              <Text style={styles.buttonText}>New feed</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                styles.button,
                {
                  backgroundColor: PALETTE.OFFWHITE,
                  transform: [{ scale: pressed ? 0.99 : 1 }],
                },
              ]}
              onPress={onPressNewTale}>
              <Text style={[styles.buttonText]}>New tale</Text>
            </Pressable>
          </BottomSheetView>
        </BottomSheet>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PALETTE.TRANSPARENT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSheet: {
    backgroundColor: PALETTE.GREYISHBLUE,
  },
  bottomSheetHandle: { backgroundColor: PALETTE.TRANSPARENT },
  bottomSheetHandleIndicator: {
    backgroundColor: PALETTE.DARKGREY,
  },
  bottomSheetContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: DIMENSION.HUNDRED_PERCENT,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: DIMENSION.FORTY_PERCENT,
    padding: 8,
    marginHorizontal: 8,
    borderRadius: 16,
    backgroundColor: PALETTE.ORANGE,
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.2,
    shadowColor: PALETTE.GREY,
    shadowRadius: 2,
  },
  buttonText: {
    fontFamily: 'Futura',
    fontSize: 16,
    fontWeight: 'bold',
    color: PALETTE.GREYISHBLUE,
  },
});

export default NewPostOptions;

import { useRef } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { KeyboardStickyView } from 'react-native-keyboard-controller';
import GypsieCTAButton from '@components/common/GypsieCTAButton';
import GypsieTextInput from '@components/common/GypsieTextInput';
import useEditProfileManager from '@hooks/useEditProfileManager';
import { Assets } from '@resources/assets';
import CameraIcon from '@icons/CameraIcon';
import type { EditProfileScreenProps } from './types/types';
import { PALETTE } from '@constants/palette';
import { DIMENSION } from '@constants/dimensions';

const EditProfileScreen = ({ route }: EditProfileScreenProps) => {
  const scrollViewRef = useRef<KeyboardAwareScrollView>(null);
  const {
    avatar,
    name,
    handle,
    bio,
    saveButtonIsDisabled,
    saving,
    originalAvatarUri,
    avatarChanged,
    canEditName,
    cannotEditNameError,
    canEditHandle,
    cannotEditHandleError,
    bioExceededLinesError,
    onPressChangeAvatar,
    onNameChange,
    onHandleChange,
    onBioChange,
    onSaveChanges,
  } = useEditProfileManager(route.params.user);

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        ref={scrollViewRef}
        style={styles.scrollViewContainer}
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="interactive"
        scrollEventThrottle={60}
        extraScrollHeight={150}>
        <View style={styles.bannerImageContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.avatarContainer,
              { transform: [{ scale: pressed ? 0.98 : 1 }] },
            ]}
            onPress={onPressChangeAvatar}>
            <Image
              style={styles.avatar}
              source={{
                uri: avatarChanged ? avatar?.uri : originalAvatarUri,
              }}
              defaultSource={Assets.AppLogo}
            />
            <View style={styles.avatarChangeIconContainer}>
              <CameraIcon style={styles.avatarChangeIcon} />
            </View>
          </Pressable>
        </View>
        <GypsieTextInput
          textInputValue={name}
          placeholder="Display name"
          maxLength={30}
          showCounter
          prefix={{ type: 'text', value: 'Name' }}
          disabledInput={!canEditName}
          errorMessage={cannotEditNameError}
          onChangeText={onNameChange}
        />
        <GypsieTextInput
          textInputValue={handle}
          placeholder="Unique handle"
          maxLength={24}
          showCounter
          prefix={{ type: 'text', value: '@' }}
          disabledInput={!canEditHandle}
          errorMessage={cannotEditHandleError}
          onChangeText={onHandleChange}
        />
        <GypsieTextInput
          textInputValue={bio || ''} // Temp fix for user objects that don't yet have bio defined
          placeholder="Add a bio..."
          maxLength={80}
          showCounter
          multiline
          prefix={{ type: 'text', value: 'Bio' }}
          errorMessage={bioExceededLinesError}
          onChangeText={onBioChange}
        />
      </KeyboardAwareScrollView>
      <KeyboardStickyView offset={{ closed: 0, opened: 30 }}>
        <GypsieCTAButton
          type="primary"
          text="Save changes"
          disabled={saveButtonIsDisabled}
          loading={saving}
          onPress={onSaveChanges}
        />
      </KeyboardStickyView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: DIMENSION.HUNDRED_PERCENT,
    width: DIMENSION.HUNDRED_PERCENT,
    backgroundColor: PALETTE.OFFWHITE,
  },
  bannerImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    height: 120,
    width: 120,
    borderRadius: 60,
    backgroundColor: PALETTE.OFFWHITE,
    shadowOffset: { height: 2, width: 0 },
    shadowColor: PALETTE.BLACK,
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    zIndex: 1,
  },
  avatar: {
    height: DIMENSION.HUNDRED_PERCENT,
    width: DIMENSION.HUNDRED_PERCENT,
    borderRadius: 60,
  },
  avatarChangeIconContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#00000055',
  },
  avatarChangeIcon: { fontSize: 48, color: PALETTE.OFFWHITE },
  scrollViewContainer: {
    height: DIMENSION.HUNDRED_PERCENT,
    width: DIMENSION.HUNDRED_PERCENT,
  },
  scrollView: {
    flexGrow: 1,
    backgroundColor: PALETTE.OFFWHITE,
  },
});

export default EditProfileScreen;

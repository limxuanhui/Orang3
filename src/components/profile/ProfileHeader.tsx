import { useCallback, useEffect } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PALETTE } from '@constants/palette';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { GypsieUser } from '@navigators/types/types';
import { DEVICE_WIDTH } from '@constants/constants';

type ProfileHeaderProps = {
  user: GypsieUser;
  scrolled: boolean;
};

export const PROFILE_HEADER_HEIGHT: number = 50;

const ProfileHeader = ({ user, scrolled }: ProfileHeaderProps) => {
  const insets = useSafeAreaInsets();

  const avatarOpacity = useSharedValue(0);
  const textOpacity = useSharedValue(1);
  const reanimatedTextStyle = useAnimatedStyle(() => {
    return {
      opacity: textOpacity.value,
    };
  }, []);
  const reanimatedAvatarStyle = useAnimatedStyle(() => {
    return {
      opacity: avatarOpacity.value,
    };
  }, []);

  const onPressHandle = useCallback(() => {}, []);

  useEffect(() => {
    if (scrolled) {
      avatarOpacity.value = withTiming(1, { duration: 300 });
      textOpacity.value = withTiming(0, { duration: 300 });
    } else {
      avatarOpacity.value = withTiming(0, { duration: 300 });
      textOpacity.value = withTiming(1, { duration: 300 });
    }
  }, [avatarOpacity, scrolled, textOpacity]);

  return (
    <View
      style={[
        styles.container,
        {
          height: PROFILE_HEADER_HEIGHT + insets.top,
        },
      ]}>
      {scrolled ? (
        <Animated.Image
          style={[styles.avatar, reanimatedAvatarStyle]}
          source={{
            uri: user.avatar?.uri,
          }}
        />
      ) : (
        <Pressable
          style={({ pressed }) => ({
            opacity: pressed ? 0.7 : 1,
          })}
          onPress={onPressHandle}>
          <Animated.Text style={reanimatedTextStyle}>
            @{user.handle}
          </Animated.Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: DEVICE_WIDTH,
    padding: 16,
    backgroundColor: PALETTE.WHITE,
    zIndex: 1,
  },
  avatar: {
    height: 32,
    width: 32,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: PALETTE.ORANGE,
  },
});

export default ProfileHeader;

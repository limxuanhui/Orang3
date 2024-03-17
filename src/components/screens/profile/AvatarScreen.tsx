import { Image, StyleSheet, View } from 'react-native';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '@constants/constants';
import { PALETTE } from '@constants/palette';
import { DIMENSION } from '@constants/dimensions';
import { AvatarScreenProps } from './types/types';

const AvatarScreen = ({ route }: AvatarScreenProps) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: route.params.avatarUri }}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
    backgroundColor: PALETTE.BLACK,
  },
  image: {
    height: DIMENSION.HUNDRED_PERCENT,
    width: DIMENSION.HUNDRED_PERCENT,
  },
});

export default AvatarScreen;

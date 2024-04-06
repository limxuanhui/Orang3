import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { PALETTE } from '@constants/palette';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '@constants/constants';

const FullScreenLoading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={48} color={PALETTE.ORANGE} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PALETTE.GREYISHBLUE,
  },
});

export default FullScreenLoading;

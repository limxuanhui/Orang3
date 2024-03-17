import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DEVICE_WIDTH } from '../../utils/constants/constants';

type PageIndicatorProps = {
  index: number;
  maxIndex: number;
};

const PageIndicator = ({ index, maxIndex }: PageIndicatorProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.pageIndicator, { bottom: insets.bottom + 60 }]}>
      <Text style={styles.pageIndicatorText}>{index + '/' + maxIndex}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  pageIndicator: {
    position: 'absolute',
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: 20,
    minWidth: 40,
    marginRight: Math.max(0.02 * DEVICE_WIDTH, 8),
    borderRadius: 10,
    backgroundColor: '#ffffff77',
  },
  pageIndicatorText: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default PageIndicator;

import { StyleSheet, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import ItineraryPlanner from '@components/itinerary/ItineraryPlanner';
import { type ItineraryScreenProps } from './types/types';
import { useAppSelector } from '@redux/hooks';
import ItineraryViewer from '@components/itinerary/ItineraryViewer';

const ItineraryScreen = ({}: ItineraryScreenProps) => {
  const { mode } = useAppSelector(state => state.itineraryPlanner);
  return (
    <View style={styles.container}>
      {mode === 'EDIT' ? <ItineraryPlanner /> : <ItineraryViewer />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  backButton: {
    position: 'absolute',
    top: getStatusBarHeight(),
    left: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 32,
    width: 32,
    zIndex: 2,
  },
});

export default ItineraryScreen;

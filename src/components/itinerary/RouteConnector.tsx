import { StyleSheet, View } from 'react-native';
import type { RouteConnectorProps } from './types/types';
import { PALETTE } from '@constants/palette';

const RouteConnector = ({ horizontal }: RouteConnectorProps) => {
  return (
    <View
      style={
        horizontal ? styles.connectorHorizontal : styles.connectorVertical
      }>
      <View style={styles.dot} />
      <View style={styles.dot} />
      <View style={styles.dot} />
    </View>
  );
};

const styles = StyleSheet.create({
  connectorHorizontal: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  connectorVertical: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginHorizontal: 30,
    marginVertical: 5,
  },
  dot: {
    height: 4,
    width: 4,
    borderRadius: 2,
    backgroundColor: PALETTE.LIGHTGREY,
    marginBottom: 4,
  },
});

export default RouteConnector;

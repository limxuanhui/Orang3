import { ScrollView, StyleSheet } from 'react-native';
// import RouteConnector from './RouteConnector';
import RouteNode from './RouteNode';
import type {
  RouteNode as RouteNodeInfo,
  RouteStepperProps,
} from './types/types';
import { DIMENSION } from '@constants/dimensions';
import { PALETTE } from '@constants/palette';

const RouteStepper = ({ route }: RouteStepperProps) => {
  return (
    <ScrollView
      style={styles.routeStepper}
      contentContainerStyle={styles.contentContainerStyle}
      showsVerticalScrollIndicator={false}>
      {route?.routeNodes.map((routeNode: RouteNodeInfo, _index: number) => (
        <RouteNode key={routeNode.id} routeNode={routeNode} />
        // <>
        //   {index !== route.routeNodes.length - 1 ? (
        //     <RouteConnector horizontal={false} />
        //   ) : null}
        // </>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  routeStepper: {
    maxHeight: '100%',
    width: '100%',
  },
  contentContainerStyle: {
    // flex: 1,
    // justifyContent: 'flex-end',
  },
  searchNavButton: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: 40,
    width: DIMENSION.HUNDRED_PERCENT,
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: PALETTE.LIGHTGREY,
  },
});

export default RouteStepper;

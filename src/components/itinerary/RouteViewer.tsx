import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { Route, RouteNode as RouteNodeInfo } from './types/types';
import { DEVICE_WIDTH } from '@constants/constants';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import RouteNode from './RouteNode';
import GypsieButton from '@components/common/buttons/GypsieButton';
import { PALETTE } from '@constants/palette';
import LinearGradient from 'react-native-linear-gradient';
import ChevronDownIcon from '@icons/ChevronDown';
import ChevronUpIcon from '@icons/ChevronUp';

type RouteViewerProps = {
  route: Route;
};

const colors = ['#ffffffaa', '#ffffffaa'];

const RouteViewer = ({ route }: RouteViewerProps) => {
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const animatedHeight = useSharedValue(0);

  const onToggleCollapsible = useCallback(() => {
    setCollapsed(prev => !prev);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    animatedHeight.value = collapsed ? withTiming(0) : withTiming(200);
    return { height: animatedHeight.value };
  });

  return (
    <LinearGradient style={styles.container} colors={colors}>
      <Text style={styles.routeName}>{route.name}</Text>
      <Animated.View style={[animatedStyle, styles.collapsible]}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}>
          {route.routeNodes.map((routeNode: RouteNodeInfo) => {
            return <RouteNode key={routeNode.id} routeNode={routeNode} />;
          })}
        </ScrollView>
      </Animated.View>
      <GypsieButton
        customButtonStyles={styles.collapseButton}
        customIconStyles={styles.collapseIcon}
        Icon={collapsed ? ChevronUpIcon : ChevronDownIcon}
        onPress={onToggleCollapsible}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: DEVICE_WIDTH * 0.05,
    width: DEVICE_WIDTH * 0.9,
    padding: 8,
    minHeight: 80,
    borderRadius: 12,
  },
  scrollView: { width: '100%' },
  scrollViewContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  routeName: {
    fontFamily: 'Futura',
    fontSize: 24,
    fontWeight: 'bold',
    color: PALETTE.GREYISHBLUE,
    marginBottom: 8,
  },
  collapsible: {
    bottom: 0,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  collapseButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  collapseIcon: { color: PALETTE.OFFWHITE, fontSize: 16 },
});

export default RouteViewer;

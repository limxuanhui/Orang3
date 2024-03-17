import { Children, PropsWithChildren, useMemo } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../../utils/constants/constants';

export type AuxiliaryControlsProps = {
  customStyle?: StyleProp<ViewStyle>;
  orientation?: 'horizontal' | 'vertical';
  position?:
    | 'top-left'
    | 'top-centre'
    | 'top-right'
    | 'centre-left'
    | 'centre'
    | 'centre-right'
    | 'bottom-left'
    | 'bottom-centre'
    | 'bottom-right';
};

const VERTICAL_MARGIN = Math.max(0.02 * DEVICE_HEIGHT, 8);
const HORIZONTAL_MARGIN = Math.max(0.02 * DEVICE_WIDTH, 8);
const SMALL_COLUMN_HEIGHT = 0.3 * DEVICE_HEIGHT;
const MEDIUM_COLUMN_HEIGHT = 0.5 * DEVICE_HEIGHT;
const LARGE_COLUMN_HEIGHT = 0.7 * DEVICE_HEIGHT;
const COLUMN_WIDTH = 40;
const ROW_HEIGHT = 40;
const ROW_WIDTH = Math.max(0.8 * DEVICE_WIDTH, 200);

/*
  Need to resolve issue of too many children and overflowing height by hiding a certain number,
  and including a button to expand list.
*/
const AuxiliaryControls = ({
  customStyle,
  orientation = 'vertical',
  position = 'centre-right',
  children,
}: PropsWithChildren<AuxiliaryControlsProps>) => {
  const numOfItems = useMemo(() => Children.count(children), [children]);
  const HEIGHT =
    orientation === 'vertical'
      ? numOfItems <= 3
        ? SMALL_COLUMN_HEIGHT
        : numOfItems <= 6
        ? MEDIUM_COLUMN_HEIGHT
        : numOfItems <= 9
        ? LARGE_COLUMN_HEIGHT
        : DEVICE_HEIGHT
      : ROW_HEIGHT;
  const WIDTH = orientation === 'vertical' ? COLUMN_WIDTH : ROW_WIDTH;

  const orientationStyle: StyleProp<ViewStyle> = useMemo(() => {
    return orientation === 'vertical'
      ? {
          flexDirection: 'column',
          height: HEIGHT,
          width: WIDTH,
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }
      : {
          flexDirection: 'row',
          height: HEIGHT,
          width: WIDTH,
          justifyContent: 'space-evenly',
          alignItems: 'center',
        };
  }, [HEIGHT, WIDTH, orientation]);

  const positionStyle: StyleProp<ViewStyle> = useMemo(() => {
    switch (position) {
      case 'top-left':
        return {
          top: 0,
          left: 0,
          marginTop: VERTICAL_MARGIN,
          marginLeft: HORIZONTAL_MARGIN,
        };
      case 'top-centre':
        return {
          top: 0,
          left: DEVICE_WIDTH / 2 - WIDTH / 2,
          marginTop: VERTICAL_MARGIN,
        };
      case 'top-right':
        return {
          top: 0,
          right: 0,
          marginTop: VERTICAL_MARGIN,
          marginRight: HORIZONTAL_MARGIN,
        };
      case 'centre-left':
        return {
          top: DEVICE_HEIGHT / 2 - HEIGHT / 2,
          left: 0,
          marginLeft: HORIZONTAL_MARGIN,
        };
      case 'centre':
        return {
          top: DEVICE_HEIGHT / 2 - HEIGHT / 2,
          left: DEVICE_WIDTH / 2 - WIDTH / 2,
        };
      case 'centre-right':
        return {
          top: DEVICE_HEIGHT / 2 - HEIGHT / 2,
          right: 0,
          marginRight: HORIZONTAL_MARGIN,
        };
      case 'bottom-left':
        return {
          bottom: 0,
          left: 0,
          marginBottom: VERTICAL_MARGIN,
          marginLeft: HORIZONTAL_MARGIN,
        };
      case 'bottom-centre':
        return {
          bottom: 0,
          left: DEVICE_WIDTH / 2 - WIDTH / 2,
          marginBottom: VERTICAL_MARGIN,
        };
      case 'bottom-right':
        return {
          bottom: 0,
          right: 0,
          marginBottom: VERTICAL_MARGIN,
          marginRight: HORIZONTAL_MARGIN,
        };
      default:
        return {};
    }
  }, [HEIGHT, WIDTH, position]);

  return (
    <View
      style={[styles.container, orientationStyle, positionStyle, customStyle]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    // backgroundColor: "#ffffff55",
    borderRadius: 8,
    zIndex: 100,
  },
});

export default AuxiliaryControls;

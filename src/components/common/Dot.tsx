import { View, Animated, StyleSheet } from 'react-native';

const Dot = ({
  i,
  scrollAnimatedValue,
  numberOfCards,
  scrollWidth,
  activeColor,
  inActiveColor,
}: any) => {
  const range: any = {};
  if (i === 0) {
    range.inputRange = [0, scrollWidth];
    range.outputRange = [1, 0];
  } else if (i + 1 === numberOfCards) {
    range.inputRange = [(i - 1) * scrollWidth, i * scrollWidth];
    range.outputRange = [0, 1];
  } else {
    range.inputRange = [
      (i - 1) * scrollWidth,
      i * scrollWidth,
      (i + 1) * scrollWidth,
    ];
    range.outputRange = [0, 1, 0];
  }
  return (
    <View style={[styles.dotContainer, { backgroundColor: inActiveColor }]}>
      <Animated.View
        style={[
          styles.activeDot,
          { backgroundColor: activeColor },
          {
            opacity: scrollAnimatedValue.interpolate({
              extrapolate: 'clamp',
              inputRange: range.inputRange,
              outputRange: range.outputRange,
            }),
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  animatedDotContainer: {
    width: 8,
    height: 8,
    marginRight: 12,
    borderRadius: 4,
    backgroundColor: '#EBEEF2',
  },
  animatedDotsContainer: {
    width: 88,
    height: 8,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  dotContainer: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EBEEF2',
  },
  activeDot: {
    flex: 1,
    borderRadius: 4,
    backgroundColor: '#8F9499',
  },
  animatedDotsView: {
    height: 8,
    flexDirection: 'row',
  },
});

export default Dot;

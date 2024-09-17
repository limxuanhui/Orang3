import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { FeedDescriptionProps } from './types/types';
import { DIMENSION } from '@constants/dimensions';
import { PALETTE } from '@constants/palette';
import LinearGradient from 'react-native-linear-gradient';
import { useCallback, useState } from 'react';
import Collapsible from 'react-native-collapsible';
import GypsieButton from '@components/common/buttons/GypsieButton';
import { ellipsizeText } from '@helpers/functions';

const FeedDescription = ({ handle, caption }: FeedDescriptionProps) => {
  const insets = useSafeAreaInsets();
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const onToggleCollapsible = useCallback(() => {
    setCollapsed(prev => !prev);
  }, []);

  const shouldBeCollapsible = caption && caption?.length > 100;
  const collapsedText = shouldBeCollapsible && ellipsizeText(caption, 100);

  return (
    <LinearGradient
      style={[styles.descriptionBox, { bottom: insets.bottom + 60 }]}
      colors={
        collapsed ? ['transparent'] : ['#00000010', '#00000055', '#000000aa']
      }>
      <View style={styles.handleBox}>
        <Text style={styles.handle}>{handle}</Text>
      </View>
      {shouldBeCollapsible ? (
        <>
          <Collapsible collapsed={collapsed} collapsedHeight={60}>
            <View style={styles.captionBox}>
              <Text style={styles.caption}>
                {collapsed ? collapsedText : caption}
              </Text>
            </View>
          </Collapsible>
          <GypsieButton
            customButtonStyles={styles.toggleButton}
            customTextStyles={styles.toggleText}
            text={collapsed ? 'more' : 'less'}
            onPress={onToggleCollapsible}
          />
        </>
      ) : (
        <View style={styles.captionBox}>
          <Text style={styles.caption}>{caption}</Text>
        </View>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  descriptionBox: {
    justifyContent: 'space-evenly',
    position: 'absolute',
    // minHeight: DIMENSION.TWENTY_PERCENT,
    width: DIMENSION.HUNDRED_PERCENT,
    paddingHorizontal: 16,
    // borderWidth: 1,
    // borderColor: 'skyblue',
    zIndex: 1,
  },
  handleBox: { marginBottom: 8 },
  handle: {
    fontFamily: 'Lilita One',
    fontSize: 16,
    fontWeight: '600',
    color: PALETTE.WHITE,
  },
  captionBox: {
    width: DIMENSION.SEVENTY_PERCENT,
  },
  caption: {
    fontFamily: 'Avenir',
    fontSize: 14,
    color: PALETTE.OFFWHITE,
  },
  toggleButton: {
    position: 'absolute',
    width: 'auto',
    right: 60,
    bottom: 0,
    // borderWidth: 1,
    // borderColor: 'red',
  },
  toggleText: {
    color: PALETTE.GREY,
    fontSize: 14,
    fontFamily: 'Futura',
    fontWeight: 'bold',
  },
});

export default FeedDescription;

import { useCallback, useMemo } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { ItineraryMapOverviewProps } from './types/types';
import type { ModalNavigatorNavigationProp } from '@navigators/types/types';
import { DIMENSION } from '@constants/dimensions';
import { PALETTE } from '@constants/palette';
import { Assets } from '@resources/assets';

const ItineraryMapOverview = ({ canEdit }: ItineraryMapOverviewProps) => {
  const navigation = useNavigation<ModalNavigatorNavigationProp>();

  const onPressOverview = useCallback(() => {
    navigation.push('Modal', {
      screen: 'Itinerary',
      params: {},
    });
  }, [navigation]);

  const footerText = useMemo(() => {
    return canEdit ? 'Start adding plans' : 'View plans';
  }, [canEdit]);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        { transform: [{ scale: pressed ? 0.99 : 1 }] },
      ]}
      onPress={onPressOverview}>
      <Image
        style={styles.mapOverviewBackground}
        source={Assets.ItineraryMapOverview}
        resizeMode="cover"
      />
      <View style={styles.footer}>
        <Text style={styles.footerText}>{footerText}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 180,
    width: '95%',
    alignSelf: 'center',
    marginVertical: 8,
    borderRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: PALETTE.BLACK,
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  mapOverviewBackground: {
    height: DIMENSION.HUNDRED_PERCENT,
    width: DIMENSION.HUNDRED_PERCENT,
    borderRadius: 8,
    opacity: 0.7,
  },
  footerText: {
    fontWeight: 'bold',
    color: PALETTE.WHITE,
  },
  footer: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 0,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 40,
    width: DIMENSION.HUNDRED_PERCENT,
    backgroundColor: '#00000088',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
});

export default ItineraryMapOverview;

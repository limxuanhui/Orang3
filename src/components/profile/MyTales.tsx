import { memo, useContext, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomTabBarHeightContext } from '@react-navigation/bottom-tabs';
import { ActivityIndicator } from 'react-native-paper';
import MasonryList from '@react-native-seoul/masonry-list';
import TaleThumbnail from '@components/tale/TaleThumbnail';
import type { TaleThumbnailInfo } from '@components/tale/types/types';
import type { MyTalesProps } from './types/types';
import { DEVICE_HEIGHT } from '@constants/constants';
import { PALETTE } from '@constants/palette';

const MyTales = memo(({ data }: MyTalesProps) => {
  const insets = useSafeAreaInsets();
  const bh = useContext(BottomTabBarHeightContext) || insets.bottom;
  const height = useMemo(() => (1 - 0.25 - 0.05) * DEVICE_HEIGHT - bh, [bh]);

  return (
    <View style={[styles.container, { height: height }]}>
      {!data ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size={48} color={PALETTE.ORANGE} />
        </View>
      ) : data.length === 0 ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text
            style={{
              color: PALETTE.GREY,
              fontFamily: 'Futura',
              fontSize: 24,
              fontWeight: 'bold',
            }}>
            You have no tales...
          </Text>
        </View>
      ) : (
        <MasonryList
          contentContainerStyle={{ paddingHorizontal: 2 }}
          data={data}
          renderItem={el => (
            <TaleThumbnail data={el.item as TaleThumbnailInfo} />
          )}
          numColumns={2}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {},
});

export default MyTales;

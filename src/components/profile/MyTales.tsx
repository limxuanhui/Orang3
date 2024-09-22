import { memo, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ActivityIndicator } from 'react-native-paper';
import MasonryList from '@react-native-seoul/masonry-list';
import TaleThumbnail from '@components/tale/TaleThumbnail';
import type { TaleMetadata } from '@components/tale/types/types';
import type { MyTalesProps } from './types/types';
import { DEVICE_HEIGHT } from '@constants/constants';
import { PALETTE } from '@constants/palette';
import MessageDisplay from '@components/common/MessageDisplay';

const MyTales = memo(({ data, onRefresh }: MyTalesProps) => {
  const insets = useSafeAreaInsets();
  const height = useMemo(() => DEVICE_HEIGHT - 300, []);

  return (
    <View style={[styles.container, { height: height }]}>
      {!data ? (
        <View style={styles.flexCenter}>
          <ActivityIndicator size={48} color={PALETTE.ORANGE} />
        </View>
      ) : data.length === 0 ? (
        <MessageDisplay
          message="No stories to show..."
          handler={onRefresh}
          handlerText="Refresh"
          buttonStyle={{ backgroundColor: PALETTE.LIGHTERGREY }}
          buttonTextStyle={{ color: PALETTE.GREYISHBLUE }}
        />
      ) : (
        <MasonryList
          containerStyle={styles.masonryListContainer}
          contentContainerStyle={[
            styles.masonryListContentContainer,
            { paddingBottom: 50 + insets.bottom },
          ]}
          style={styles.masonryList}
          data={data}
          renderItem={el => <TaleThumbnail data={el.item as TaleMetadata} />}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          onRefresh={onRefresh}
        />
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {},
  flexCenter: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  message: {
    color: PALETTE.GREY,
    fontFamily: 'Futura',
    fontSize: 24,
    fontWeight: 'bold',
  },
  masonryListContainer: { backgroundColor: PALETTE.OFFWHITE },
  masonryListContentContainer: {},
  masonryList: { backgroundColor: PALETTE.OFFWHITE, padding: 2 },
});

export default MyTales;

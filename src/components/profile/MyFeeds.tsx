import { memo, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ActivityIndicator } from 'react-native-paper';
import MasonryList from '@react-native-seoul/masonry-list';
import FeedThumbnail from '@components/feed/FeedThumbnail';
import type { FeedMetadata } from '@components/feed/types/types';
import type { MyFeedsProps } from './types/types';
import { DEVICE_HEIGHT } from '@constants/constants';
import { PALETTE } from '@constants/palette';
import MessageDisplay from '@components/common/MessageDisplay';

const MyFeeds = memo(({ data, onRefresh }: MyFeedsProps) => {
  const insets = useSafeAreaInsets();
  const height = useMemo(() => DEVICE_HEIGHT - 300, []);

  return (
    <View style={[styles.container, { height }]}>
      {!data ? (
        <View style={styles.flexCenter}>
          <ActivityIndicator size={48} color={PALETTE.ORANGE} />
        </View>
      ) : data.length === 0 ? (
        <MessageDisplay
          message="No feeds to show..."
          handler={onRefresh}
          handlerText="Refresh"
          buttonStyle={styles.messageDisplayButton}
          buttonTextStyle={styles.messageDisplayButtonText}
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
          renderItem={el => <FeedThumbnail data={el.item as FeedMetadata} />}
          numColumns={3}
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
  messageDisplayButton: { backgroundColor: PALETTE.LIGHTERGREY },
  messageDisplayButtonText: { color: PALETTE.GREYISHBLUE },
});

export default MyFeeds;

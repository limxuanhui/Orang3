import { memo, useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ActivityIndicator } from 'react-native-paper';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import MasonryList from '@react-native-seoul/masonry-list';
import type { TaleMetadata } from '@components/tale/types/types';
import TaleThumbnail from '@components/tale/TaleThumbnail';
import GypsieSkeleton from '@components/common/GypsieSkeleton';
import useInfiniteDataManager from '@hooks/useInfiniteDataManager';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '@constants/constants';
import { PALETTE } from '@constants/palette';
import { DIMENSION } from '@constants/dimensions';
import FullScreenLoading from '@components/common/FullScreenLoading';
import MessageDisplay from '@components/common/MessageDisplay';

const SkeletonThumbnail = memo(() => {
  return (
    <View
      style={{
        height: 300,
        width: DEVICE_WIDTH / 2 - 8,
        borderRadius: 12,
        margin: 3,
      }}>
      <View
        style={{
          flex: 5,
          width: '100%',
          marginVertical: 4,
          borderRadius: 12,
          overflow: 'hidden',
        }}>
        <GypsieSkeleton />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          width: '100%',
          // borderWidth: 1,
          // borderColor:'green'
        }}>
        <View
          style={{
            height: 40,
            width: 40,
            borderRadius: 20,
            overflow: 'hidden',
          }}>
          <GypsieSkeleton />
        </View>
        <View
          style={{
            flex: 1,
            height: 40,
            marginLeft: 8,
            borderRadius: 12,
            overflow: 'hidden',
          }}>
          <GypsieSkeleton />
        </View>
      </View>
    </View>
  );
});

const SkeletonThumbnailList = memo(() => {
  return (
    <FlatList
      // style={{flex:1,height:DEVICE_HEIGHT}}
      // contentContainerStyle={{ paddingHorizontal: 2 }}
      data={new Array(20)}
      numColumns={2}
      renderItem={() => <SkeletonThumbnail />}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
    />
  );
});

const TalesOverviewScreen = () => {
  const insets = useSafeAreaInsets();
  const bottomTabBarHeight = useBottomTabBarHeight();
  const height = DEVICE_HEIGHT - bottomTabBarHeight - getStatusBarHeight();

  const {
    data,
    hasNextPage,
    isError,
    isFetching,
    isLoading,
    isRefetching,
    onEndReached,
    onRefresh,
  } = useInfiniteDataManager<TaleMetadata[]>('tales-metadata');

  const dataIsFetched = data && !!data.pages;
  const dataFetchedIsEmpty = dataIsFetched && data?.pages[0].items.length === 0;
  const dataFetchedIsNotEmpty =
    dataIsFetched && data.pages.length > 0 && data?.pages[0].items.length > 0;

  console.log('===========================');
  console.log('taleoverviewscreen data fetched: ', data?.pages[0]);
  console.log('isFetching: ', isFetching);
  console.log('isRefetching: ', isRefetching);
  console.log('isLoading: ', isLoading);
  console.log('isError: ', isError);
  console.log('hasNextPage: ', hasNextPage);
  console.log('===========================\n');

  useEffect(() => {
    console.log('TalesOverviewScreen Mounted');
    return () => {
      console.log('TalesOverviewScreen Unmounted');
    };
  }, []);

  if (isLoading) {
    return <FullScreenLoading />;
  }

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.masonryListContainer,
          { height, paddingTop: 8, paddingBottom: insets.bottom + 16 },
        ]}>
        {dataFetchedIsEmpty ? (
          <MessageDisplay message="No tales at the moment..." />
        ) : dataFetchedIsNotEmpty ? (
          <MasonryList
            containerStyle={styles.masonryList}
            data={data.pages.flatMap(el => el.items)}
            numColumns={2}
            renderItem={({ item }) => (
              <TaleThumbnail data={item as TaleMetadata} />
            )}
            ListEmptyComponent={<SkeletonThumbnailList />}
            ListFooterComponent={
              isLoading || isFetching ? (
                <ActivityIndicator
                  style={{ marginVertical: 8 }}
                  size={24}
                  color={PALETTE.ORANGE}
                />
              ) : (
                <MessageDisplay
                  containerStyle={styles.footerContainer}
                  textStyle={styles.footerText}
                  message="You've caught up with the latest tales :p"
                />
              )
            }
            showsVerticalScrollIndicator={false}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.8}
            onRefresh={onRefresh}
            refreshing={isRefetching}
            refreshControlProps={{
              title: 'Refreshing tales...',
              titleColor: PALETTE.GREYISHBLUE,
              tintColor: PALETTE.ORANGE,
            }}
          />
        ) : (
          <MessageDisplay message="Unable to get tales for you at the moment..." />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
    backgroundColor: PALETTE.OFFWHITE,
  },
  masonryListContainer: {
    width: DIMENSION.HUNDRED_PERCENT,
  },
  masonryList: {
    paddingHorizontal: 2,
  },
  refreshControl: { backgroundColor: PALETTE.OFFWHITE },
  footerContainer: {
    height: 60,
    width: DIMENSION.HUNDRED_PERCENT,
  },
  footerText: {
    fontFamily: 'Futura',
    fontSize: 16,
    color: PALETTE.GREY,
  },
});

export default TalesOverviewScreen;

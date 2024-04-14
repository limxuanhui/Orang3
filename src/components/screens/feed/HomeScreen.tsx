import { useCallback, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import useInfiniteDataManager from '@hooks/useInfiniteDataManager';
import FeedDisplay from '@components/feed/FeedDisplay';
import type { HomeScreenProps } from './types/types';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '@constants/constants';
import { PALETTE } from '@constants/palette';
import { VIEWABILITY_CONFIG } from '@constants/feed';
import FullScreenLoading from '@components/common/FullScreenLoading';
import MessageDisplay from '@components/common/MessageDisplay';
import { Feed } from '@components/feed/types/types';

const HomeScreen = ({}: HomeScreenProps) => {
  const [homeScreenIsFocused, setHomeScreenIsFocused] = useState<boolean>(true);
  const [activePostIndex, setActivePostIndex] = useState<number>(0);
  const { data, isLoading, isRefetching, onEndReached, onRefresh } =
    useInfiniteDataManager<Feed[]>('feeds');

  const onViewableItemsChanged = useCallback(
    // Change type to more suitable one
    ({ viewableItems, _changed }: any) => {
      if (viewableItems && viewableItems?.length > 0) {
        console.log(viewableItems[0]);
        setActivePostIndex(viewableItems[0].index);
      }
    },
    [setActivePostIndex],
  );

  useFocusEffect(
    useCallback(() => {
      setHomeScreenIsFocused(true);
      return () => setHomeScreenIsFocused(false);
    }, [setHomeScreenIsFocused]),
  );

  const dataIsFetched = data && !!data.pages;
  // const dataFetchedIsEmpty = dataIsFetched && data?.pages[0].items.length === 0;
  const dataFetchedIsEmpty = dataIsFetched && data?.pages[0].items.length === 0;
  const dataFetchedIsNotEmpty =
    dataIsFetched && data.pages.length > 0 && data?.pages[0].items.length > 0;

  // console.log('Home screen data fetched: ', data);
  // console.log('Data fetched is empty: ', dataFetchedIsEmpty);
  // console.log('Data fetched is not empty: ', dataFetchedIsNotEmpty);
  // console.log('Data pages: ', data?.pages);
  // console.log('Number of pages: ', data?.pages.length);
  // console.log(data?.pages.flat(1));

  if (isLoading) {
    return <FullScreenLoading />;
  }

  return (
    <View style={styles.container}>
      {dataFetchedIsEmpty ? (
        <MessageDisplay message="No feeds at the moment..." />
      ) : dataFetchedIsNotEmpty ? (
        <FlatList
          // initialNumToRender={2}
          data={data.pages.flatMap(el => el.items)}
          // data={data.pages[0].items}
          renderItem={({ item, index }) => (
            <FeedDisplay
              data={item}
              inView={homeScreenIsFocused && index === activePostIndex}
            />
          )}
          showsVerticalScrollIndicator={false}
          snapToInterval={DEVICE_HEIGHT}
          snapToAlignment={'start'}
          decelerationRate={'fast'}
          viewabilityConfig={VIEWABILITY_CONFIG}
          onViewableItemsChanged={onViewableItemsChanged}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.2}
          refreshControl={
            <RefreshControl
              style={styles.refreshControl}
              tintColor={PALETTE.ORANGE}
              title="Refreshing feed"
              titleColor={PALETTE.WHITE}
              colors={[PALETTE.ORANGE]}
              refreshing={isRefetching}
              onRefresh={onRefresh}
            />
          }
        />
      ) : (
        <MessageDisplay message="Unable to get feeds for you at the moment..." />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PALETTE.GREYISHBLUE,
  },
  flexCenter: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  description: {
    width: '70%',
    fontFamily: 'Futura',
    fontSize: 24,
    fontWeight: 'bold',
    color: PALETTE.GREY,
  },
  refreshControl: { backgroundColor: PALETTE.BLACK },
});

export default HomeScreen;

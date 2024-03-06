import { StyleSheet, View } from "react-native";
import FeedDisplay from "../../feed/FeedDisplay";
import type { FeedScreenProps } from "./types/types";
import { DUMMY_FEEDS } from "../../../data/feeds";
import { QueryKey, queryOptions, useQuery } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { DUMMY_DATABASE } from "../../../data/database";
import { Tale } from "../../tale/types/types";
import { Feed } from "../../feed/types/types";
import { PALETTE } from "../../../utils/constants/palette";
import { ActivityIndicator } from "react-native-paper";
import {
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
} from "../../../utils/constants/constants";
import type { DataKey } from "../../../data/types/types";

const FeedScreen = ({ navigation, route }: FeedScreenProps) => {
  const { feedId } = route.params;

  const queryFn = useCallback(
    async ({ queryKey }: { queryKey: QueryKey }): Promise<Feed | undefined> => {
      const [key, feedId] = queryKey;
      console.log("QUERY FUNCTION CALLED");
      return new Promise((resolve, reject) => {
        const feeds: Feed[] = DUMMY_DATABASE[key as DataKey] as Feed[];
        setTimeout(() => {
          resolve(feeds.find((el: Feed) => el.id === feedId));
        }, 2000);
      });
    },
    [DUMMY_DATABASE],
  );

  const options = useMemo(() => {
    const queryKey = ["feeds", feedId];
    return queryOptions({
      queryKey,
      queryFn,
      networkMode: "online",
      enabled: true,
      gcTime: 1000 * 60 * 5,
      // staleTime: 1000,
    });
  }, [feedId, queryOptions]);

  const { data, isFetching, isError, isLoading, isPending, isPlaceholderData } =
    useQuery(options);

  return !data && isLoading ? (
    <View style={styles.container}>
      <ActivityIndicator size={48} color={PALETTE.ORANGE} />
    </View>
  ) : (
    <FeedDisplay data={data as Feed} inView />
  );
};

const styles = StyleSheet.create({
  container: {
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: PALETTE.GREYISHBLUE,
  },
});

export default FeedScreen;

import { StyleSheet } from "react-native";
import Feed from "../../feed/Feed";
import type { FeedScreenProps } from "./types/types";
import { DUMMY_FEEDS } from "../../../data/feeds";

const FeedScreen = ({ navigation, route }: FeedScreenProps) => {
  const feed = DUMMY_FEEDS.filter(item => item.id === route.params.feedId)[0];

  return <Feed feed={feed} inView />;
};

const styles = StyleSheet.create({});

export default FeedScreen;

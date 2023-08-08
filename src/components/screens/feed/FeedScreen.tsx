import { StyleSheet } from "react-native";
import FeedDisplay from "../../feed/FeedDisplay";
import type { FeedScreenProps } from "./types/types";
import { DUMMY_FEEDS } from "../../../data/feeds";

const FeedScreen = ({ navigation, route }: FeedScreenProps) => {
  const data = DUMMY_FEEDS.filter(item => item.id === route.params.feedId)[0];

  return <FeedDisplay data={data} inView />;
};

const styles = StyleSheet.create({});

export default FeedScreen;

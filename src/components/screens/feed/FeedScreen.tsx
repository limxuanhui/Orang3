import { StyleSheet, Text, View } from "react-native";
import Feed from "../../feed/Feed";
import { DUMMY_POSTS } from "../../../data/dummy-posts";

const FeedScreen = ({ navigation, route }: any) => {
  const feed = DUMMY_POSTS[0];

  return <Feed feed={feed} inView />;
};

const styles = StyleSheet.create({});

export default FeedScreen;

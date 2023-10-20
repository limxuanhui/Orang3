import { createStackNavigator } from "@react-navigation/stack";
import ItineraryFeedScreen from "../screens/itinerary/ItineraryFeedScreen";
import type { ItineraryStackNavigatorParamList } from "../screens/itinerary/types/types";
import { PALETTE } from "../../utils/constants/palette";
import { StyleSheet, Text, View } from "react-native";
import { DEVICE_WIDTH } from "../../utils/constants/constants";

const ItineraryStack = createStackNavigator<ItineraryStackNavigatorParamList>();

const Title = () => {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.titleText}>Explore </Text>
      <Text
        style={[
          styles.titleText,
          {
            color: PALETTE.ORANGE,
          },
        ]}>
        Sunday
      </Text>
    </View>
  );
};

const ItineraryStackNavigator = () => {
  return (
    <ItineraryStack.Navigator
      initialRouteName="ItineraryFeed"
      screenOptions={({ navigation, route }) => {
        return { headerShown: false };
      }}>
      <ItineraryStack.Screen
        name="ItineraryFeed"
        component={ItineraryFeedScreen}
        options={{
          headerShown: true,
          headerLeft: Title,
          headerLeftContainerStyle: { paddingLeft: 20 },
          headerTitle: "",
          headerStyle: { backgroundColor: PALETTE.WHITE },
          headerShadowVisible: false,
        }}
      />
    </ItineraryStack.Navigator>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
  },
  titleText: { color: "black", fontFamily: "Lilita One", fontSize: 24 },
});

export default ItineraryStackNavigator;

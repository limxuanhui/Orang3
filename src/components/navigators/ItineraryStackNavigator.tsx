import { createStackNavigator } from "@react-navigation/stack";
import ItineraryFeedScreen from "../screens/itinerary/ItineraryFeedScreen";
import type { ItineraryStackNavigatorParamList } from "../screens/itinerary/types/types";
import { PALETTE } from "../../utils/constants/palette";

const ItineraryStack = createStackNavigator<ItineraryStackNavigatorParamList>();

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
          title: "Explore",
          headerStyle: { backgroundColor: PALETTE.BLACK },
          headerTitleStyle: { color: PALETTE.WHITE, fontWeight: "bold" },
          headerShadowVisible: false,
        }}
      />
    </ItineraryStack.Navigator>
  );
};

export default ItineraryStackNavigator;

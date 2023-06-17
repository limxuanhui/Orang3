import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ItineraryFeedScreen from "../screens/itinerary/ItineraryFeedScreen";

import type { MapStackNavigatorParamList } from "../../utils/types/map";
import { PALETTE } from "../../utils/constants/palette";
import FeedScreen from "../screens/feed/FeedScreen";
import ItineraryViewScreen from "../screens/itinerary/ItineraryViewScreen";
import PlaceSearchScreen from "../screens/itinerary/PlaceSearchScreen";
import { createStackNavigator } from "@react-navigation/stack";

const MapStack = createStackNavigator<MapStackNavigatorParamList>();

const MapStackNavigator = () => {

  return (
    <MapStack.Navigator
      initialRouteName="itinerary-feed"
      screenOptions={({navigation, route}) => {
        console.log(route.name);
        return { headerShown: false };
      }}>
      <MapStack.Screen
        name="itinerary-feed"
        component={ItineraryFeedScreen}
        options={{
          headerShown: true,
          title: "Explore",
          headerStyle: { backgroundColor: PALETTE.BLACK },
          headerTitleStyle: { color: PALETTE.WHITE, fontWeight: "bold" },
        }}
      />
    </MapStack.Navigator>
  );
};

export default MapStackNavigator;

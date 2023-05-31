import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ItineraryPlanningScreen from "../screens/ItineraryPlanningScreen";

import { MapStackNavigatorParamList } from "../../utils/types/map";
import PlaceSearchScreen from "../screens/PlaceSearchScreen";
import ItineraryFeedScreen from "../screens/itinerary/ItineraryFeedScreen";
import ItineraryViewScreen from "../screens/ItineraryViewScreen";
import { PALETTE } from "../../utils/constants/palette";
// import MapDashboardScreen from "../screens/map-stack/MapDashboardScreen";
// import MapScreen from "../screens/map-stack/MapScreen";

const MapStack = createNativeStackNavigator<MapStackNavigatorParamList>();

const MapStackNavigator = () => {
  return (
    <MapStack.Navigator
      initialRouteName="itinerary-feed"
      screenOptions={{ headerShown: false }}>
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
      {/* <MapStack.Screen
        name="itinerary-view"
        component={ItineraryViewScreen}
        options={{
          headerShown:false,
          headerStyle: { backgroundColor: PALETTE.BLACK },
          headerTitleStyle: { color: PALETTE.WHITE, fontWeight: "bold" },
        }}
      /> */}
      {/* <MapStack.Screen
        name="itinerary-planning"
        component={ItineraryPlanningScreen}
      />
      <MapStack.Screen name="place-search" component={PlaceSearchScreen} /> */}
    </MapStack.Navigator>
  );
};

export default MapStackNavigator;

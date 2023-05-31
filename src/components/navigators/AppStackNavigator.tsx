import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { AppStackNavigatorParamList } from "../../utils/types/navigation";

import BottomTabNavigator from "./BottomTabNavigator";
import ItineraryPlanningScreen from "../screens/itinerary/ItineraryPlanningScreen";
import ItineraryViewScreen from "../screens/itinerary/ItineraryViewScreen";
import PlaceSearchScreen from "../screens/itinerary/PlaceSearchScreen";

const AppStack = createNativeStackNavigator<AppStackNavigatorParamList>();

const AppStackNavigator = () => {
  return (
    <AppStack.Navigator
      initialRouteName="bottom-tab"
      screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="bottom-tab" component={BottomTabNavigator} />
      {/* <AppStack.Screen
          name="comments"
          component={CommentScreen}
          options={{
            presentation: "fullScreenModal",
            animation: "slide_from_bottom",
          }}
        /> */}
      <AppStack.Screen
        name="itinerary-planning"
        component={ItineraryPlanningScreen}
        // options={{
        //   presentation: 'fullScreenModal',
        //   animation: 'slide_from_bottom'
        // }}
      />
      <AppStack.Screen
        name="itinerary-view"
        component={ItineraryViewScreen}
        // options={{
        //   presentation: 'fullScreenModal',
        //   animation: 'slide_from_bottom'
        // }}
      />
      <AppStack.Screen
        name="place-search"
        component={PlaceSearchScreen}
        // options={{
        //   presentation: 'fullScreenModal',
        //   animation: 'slide_from_bottom'
        // }}
      />
    </AppStack.Navigator>
  );
};

export default AppStackNavigator;
